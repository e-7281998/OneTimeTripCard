package com.shinhan.OneTimeTripCard.split;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.shinhan.OneTimeTripCard.service.TravelWithService;
import com.shinhan.OneTimeTripCard.service.UserCardService;
import com.shinhan.OneTimeTripCard.service.UserService;
import com.shinhan.OneTimeTripCard.vo.User;
import com.shinhan.OneTimeTripCard.vo.UserCard;

@SpringBootTest
public class SplitTest {
	
	@Autowired
	TravelWithService travelWithService;
	
	@Autowired
	UserCardService userCardService;
	
	@Autowired
	UserService userService;

	@Test
	void NSplit() {
		Long travelWithId = 3L; // 2, 3, 4, 21이 각 유저의 아이디
		Long [] userIds = { 2L, 3L, 4L, 21L };
		List<User> users = new ArrayList<>();
		for (Long userId : userIds) {
			users.add(userService.findById(userId));
		}
		List<UserCard> defaultCards = userCardService.findDefaultCards(users);
		int splitAmount = defaultCards.get(0).getBalance() / defaultCards.size();
		System.out.println("splitAmount: " + splitAmount);
		Map<Long, Integer> balances = new HashMap<>();
		for (UserCard defaultCard : defaultCards) {
			balances.put(defaultCard.getUser().getId(), defaultCard.getBalance());
		}
		
//		travelWithService.splitBalance(travelWithId);
		
		defaultCards = userCardService.findDefaultCards(users);
		for (UserCard defaultCard : defaultCards) {
			
			Assertions.assertThat(defaultCard.getBalance()).isEqualTo(balances.get(defaultCard.getUser().getId()) + splitAmount);
		}
	}
}
