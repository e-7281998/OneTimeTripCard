package com.shinhan.OneTimeTripCard.service;

import com.shinhan.OneTimeTripCard.repository.ChargeRepository;
import com.shinhan.OneTimeTripCard.vo.Charge;
import com.shinhan.OneTimeTripCard.vo.UserCard;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.YearMonth;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ChargeService {

    private final UserCardService userCardService;
    private final ChargeRepository chargeRepository;

    /**
     * 금액 충전
     * 1. 충전 기록
     * 2. 카드 잔액 증가
     * @param charge
     * @return
     */
    @Transactional
    public Charge charge(Charge charge) {
        Charge afterCharge = chargeRepository.save(charge);
        UserCard userCard = afterCharge.getUserCard();
        userCard.setBalance(userCard.getBalance() + charge.getAmountWon());
        afterCharge.setUserCard(userCardService.save(userCard));
        return afterCharge;
    }

    public List<Charge> getChargeHistoryByMonth(Long userCardId, int year, int month) {
        YearMonth standard = YearMonth.of(year, month);
        LocalDateTime from = LocalDateTime.of(year, month, 1, 0, 0);
        LocalDateTime to = LocalDateTime.of(standard.atEndOfMonth(), LocalTime.of(23, 59, 59));
        return chargeRepository.findByUserCard_IdAndCreatedAtBetween(userCardId, from, to);
    }
}
