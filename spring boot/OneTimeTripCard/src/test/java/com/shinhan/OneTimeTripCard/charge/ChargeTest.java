package com.shinhan.OneTimeTripCard.charge;

import com.shinhan.OneTimeTripCard.service.ChargeService;
import com.shinhan.OneTimeTripCard.service.UserCardService;
import com.shinhan.OneTimeTripCard.vo.Charge;
import com.shinhan.OneTimeTripCard.vo.UserCard;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class ChargeTest {

    @Autowired
    ChargeService chargeService;

    @Autowired
    UserCardService userCardService;

    @Test
    void chargeTest() {
        int money = 100000;
        int chargeMoney = 10000;
        Charge charge = new Charge();
        charge.setCurrency("dollar");
        charge.setAmountWon(chargeMoney);
        charge.setRate(1267.29);
        charge.setAmount((double) charge.getAmountWon() / charge.getRate());

        Long userCardId = 76L;
        UserCard userCard = userCardService.findById(userCardId);
        userCard.setBalance(money);
        charge.setUserCard(userCard);

        Charge savedCharge = chargeService.charge(charge);

        Assertions.assertThat(savedCharge.getUserCard().getBalance()).isEqualTo(money + chargeMoney);
    }
}
