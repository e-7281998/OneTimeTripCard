package com.shinhan.OneTimeTripCard.service;

import com.shinhan.OneTimeTripCard.repository.ChargeRepository;
import com.shinhan.OneTimeTripCard.vo.Charge;
import com.shinhan.OneTimeTripCard.vo.UserCard;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

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
    public Charge charge(@RequestBody Charge charge) {
        Charge afterCharge = chargeRepository.save(charge);
        UserCard userCard = afterCharge.getUserCard();
        userCard.setBalance(userCard.getBalance() + charge.getAmountWon());
        afterCharge.setUserCard(userCardService.save(userCard));
        return afterCharge;
    }
}
