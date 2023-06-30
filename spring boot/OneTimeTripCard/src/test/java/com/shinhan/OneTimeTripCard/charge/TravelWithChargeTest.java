package com.shinhan.OneTimeTripCard.charge;

import java.util.List;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.shinhan.OneTimeTripCard.service.ChargeService;
import com.shinhan.OneTimeTripCard.service.TravelWithService;
import com.shinhan.OneTimeTripCard.service.UserCardService;
import com.shinhan.OneTimeTripCard.vo.Charge;
import com.shinhan.OneTimeTripCard.vo.UserCard;

@SpringBootTest
public class TravelWithChargeTest {

	@Autowired
	ChargeService chargeService;
	
	@Autowired
	UserCardService userCardService;
	
	@Autowired
	TravelWithService travelWithService;
	
	@Test
	void travelWithCharge() {
        int chargeMoney = 10000;
        Charge charge = new Charge();
        charge.setCurrency("euro");
        charge.setAmountWon(chargeMoney);
        charge.setRate(1414.35);
        charge.setAmount((double) charge.getAmountWon() / charge.getRate());

        // TravelWithCard의 UserCardId
        Long userCardId = 188L;
        UserCard userCard = userCardService.findById(userCardId);
        charge.setUserCard(userCard);
        
        Long travelWithId = userCard.getTravelWithId();
        int beforeBalance = userCard.getBalance();

        List<Charge> savedCharge = chargeService.chargeTravelWithCard(charge, travelWithId);
        
        
        List<UserCard> travelWithCards = travelWithService.findAllMemberCards(travelWithId);
        for (UserCard travelWithCard : travelWithCards) {
        	Assertions.assertThat(travelWithCard.getBalance()).isEqualTo(beforeBalance + chargeMoney);
        }
        
	}
}
