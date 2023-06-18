package com.shinhan.OneTimeTripCard.charge;

import com.shinhan.OneTimeTripCard.service.ChargeService;
import com.shinhan.OneTimeTripCard.service.GradeService;
import com.shinhan.OneTimeTripCard.service.UserCardService;
import com.shinhan.OneTimeTripCard.vo.Charge;
import com.shinhan.OneTimeTripCard.vo.Grade;
import com.shinhan.OneTimeTripCard.vo.UserCard;
import java.time.LocalDateTime;
import java.util.List;
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

    @Autowired
    GradeService gradeService;

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

    @Test
    void getHistoryByUserCardAndMonth() {
        Long userCardId = 76L;
        List<Charge> charges = chargeService.getChargeHistoryByMonth(userCardId, 2023, 6);
        Assertions.assertThat(charges.size()).isEqualTo(3);
    }

    @Test
    void upgradeTest() {
        Long userCardId = 78L;
        int chargeMoney = 500000;
        Charge charge = new Charge();
        charge.setCurrency("dollar");
        charge.setAmountWon(chargeMoney);
        charge.setRate(1267.29);
        charge.setAmount((double) charge.getAmountWon() / charge.getRate());

        UserCard userCard = userCardService.findById(userCardId);
        Grade grade = userCard.getGrade();
        charge.setUserCard(userCard);

        chargeService.charge(charge);
        Grade updatedGrade = userCard.getGrade();
        Assertions.assertThat(gradeService.getNextGrade(grade.getGradeName()).getGradeName()).isEqualTo(updatedGrade.getGradeName());
    }

    @Test
    void notUpgradeTest() {
        Long userCardId = 76L;
        UserCard userCard = userCardService.findById(userCardId);

        int chargeMoney = 10000;
        Charge charge = new Charge();
        charge.setCurrency("dollar");
        charge.setAmountWon(chargeMoney);
        charge.setRate(1267.29);
        charge.setAmount((double) charge.getAmountWon() / charge.getRate());

        String beforeGradeName = userCard.getGrade().getGradeName();
        charge.setUserCard(userCard);

        chargeService.charge(charge);
        Grade updatedGrade = userCard.getGrade();
        Assertions.assertThat(beforeGradeName).isEqualTo(updatedGrade.getGradeName());
    }
}
