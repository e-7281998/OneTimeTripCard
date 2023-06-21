package com.shinhan.OneTimeTripCard.travelWith;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.shinhan.OneTimeTripCard.service.TravelWithService;

@SpringBootTest
public class TravelWithCardRegisterTest {

	@Autowired
	TravelWithService travelWithService;
	
	Long travelWithId = 3L;
	Long managerId = 2L;
	Long memberId = 3L;
	
	/**
	 * 매니저가 아닌 멤버가 카드를 등록하는 테스트
	 * 매니저가 아니면 실패해야 됨
	 */
	@Test
	void notManagerRegisterCardTest() {
		String cardNo = "1234";
		String result = travelWithService.registerCard(travelWithId, memberId, managerId, cardNo);
		Assertions.assertThat(result).isEqualTo("NotAllowed");
	}
	
	@Test
	void notGroupCardTest() {
		String cardNo = "0221 3829 8383 8380";
		String result = travelWithService.registerCard(travelWithId, managerId, managerId, cardNo);
		Assertions.assertThat(result).isEqualTo("NotTravelWithCard");
	}
	
	@Test
	void invalidCardNoTest() {
		String cardNo = "0221 3829 1111 1111";
		String result = travelWithService.registerCard(travelWithId, managerId, managerId, cardNo);
		Assertions.assertThat(result).isEqualTo("InvalidCardNo");
	}
	
	@Test
	void alreadyRegistered() {
		String cardNo = "0221 9374 2626 1211";
		String result = travelWithService.registerCard(travelWithId, managerId, managerId, cardNo);
		Assertions.assertThat(result).isEqualTo("AlreadyRegistered");
	}
	
//	@Test
//	void registerSucceeded() {
//		String cardNo = "0221 3466 3847 1121";
//		String result = travelWithService.registerCard(travelWithId, managerId, managerId, cardNo);
//		Assertions.assertThat(result).isEqualTo("possible");
//	}
}
