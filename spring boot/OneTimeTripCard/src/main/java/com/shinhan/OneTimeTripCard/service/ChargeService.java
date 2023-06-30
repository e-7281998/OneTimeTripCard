package com.shinhan.OneTimeTripCard.service;

import com.shinhan.OneTimeTripCard.repository.ChargeRepository;
import com.shinhan.OneTimeTripCard.vo.Charge;
import com.shinhan.OneTimeTripCard.vo.Grade;
import com.shinhan.OneTimeTripCard.vo.UserCard;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ChargeService {

    private final UserCardService userCardService;
    private final GradeService gradeService;
    private final TravelWithService travelWithService;
    private final ChargeRepository chargeRepository;

    /**
     * 금액 충전
     * 1. 충전 기록
     * 2. 카드 잔액 증가
     * 3. 충전 금액에 따른 등급 업그레이드
     * @param charge
     * @return
     */
    @Transactional
    public Charge charge(Charge charge) {
        Charge afterCharge = chargeRepository.save(charge);
        UserCard userCard = afterCharge.getUserCard();
        userCard.setBalance(userCard.getBalance() + charge.getAmountWon());
        upgrade(userCard);
        afterCharge.setUserCard(userCardService.save(userCard));
        return afterCharge;
    }

    public List<Charge> getChargeHistoryByMonth(Long userCardId, int year, int month) {
        YearMonth standard = YearMonth.of(year, month);
        LocalDateTime from = LocalDateTime.of(year, month, 1, 0, 0);
        LocalDateTime to = LocalDateTime.of(standard.atEndOfMonth(), LocalTime.of(23, 59, 59));
        return chargeRepository.findByUserCard_IdAndCreatedAtBetween(userCardId, from, to);
    }

    /**
     * 1. 만료 날짜 이후의 충전 -> 등급 업그레이드와 상관 X
     * 2. 다음 등급이 존재 하는지 -> 최고 등급이면 업그레이드 불필요
     * 3. 충전 금액이 업그레이드 조건에 충족하는지 확인
     * @param userCard
     */
    private void upgrade(UserCard userCard) {
        // 1. 혜택 만료 날짜 이전/이후
        if (userCard.getExpiredAt().isBefore(LocalDateTime.now())) {
            return;
        }

        // 2. 다음 등급 존재 여부
        Grade nextGrade = gradeService.getNextGrade(userCard.getGrade().getGradeName());
        if (nextGrade == null) {
            return;
        }

        // 3. 충전금액 비교
        int amountOfCharges = chargeRepository.getSumOfChargesByUserCardId(userCard.getId());
        if (nextGrade.getPrice() - userCard.getGrade().getPrice() > amountOfCharges) {
            return;
        }
        userCard.setGrade(nextGrade);
    }

    /**
     * 여행카드 충전
     * 1. 같은 멤버들의 카드들 조회
     * 2. 모든 카드 잔액 추가
     * 3. 충전 내역 저장
     * @param charge
     * @return
     */
    @Transactional
	public List<Charge> chargeTravelWithCard(Charge charge, Long travelWithId) {
		List<UserCard> travelWithCards = travelWithService.findAllMemberCards(travelWithId);
        List<Charge> charges = new ArrayList<>();
		int chargeAmount = charge.getAmountWon();
		for (UserCard travelWithCard : travelWithCards) {
            charges.add(changeUserCard(charge, travelWithCard));
			travelWithCard.setBalance(travelWithCard.getBalance() + chargeAmount);
		}
		return (List<Charge>) chargeRepository.saveAll(charges);
	}

    private Charge changeUserCard(Charge charge, UserCard travelWithCard) {
        return charge.builder()
                .amount(charge.getAmount())
                .amountWon(charge.getAmountWon())
                .userCard(travelWithCard)
                .currency(charge.getCurrency())
                .rate(charge.getRate())
                .build();
    }
}
