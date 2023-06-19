package com.shinhan.OneTimeTripCard.travelWith;

import java.util.ArrayList;
import java.util.List;

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
public class TravelWithTest {

	@Autowired
	TravelWithService travelWithService;
	
	@Autowired
	UserService userService;
	
	@Autowired
	UserCardService userCardService;
	
	@Test
	void registerTravelWith() {
		// 단체카드 매니저 아이디
		Long managerId = 2L;
		List<String> invitedEmails = new ArrayList<>();
		invitedEmails.add("3333@naver.com");
		invitedEmails.add("4444@naver.com");
		invitedEmails.add("555@naver.com");
		// 초대할 유저의 이메일들을 기반으로 유저 가져옴
		List<User> users = new ArrayList<>();
		for (String invitedEmail : invitedEmails) {
			User user = userService.findByEmail(invitedEmail);
			users.add(user);
		}
		
		String nickName = "test travelWith Card";
		Boolean isDefault = false;
		// 매니저카드 저장
		UserCard managerCard = travelWithService.register(managerId, nickName, invitedEmails, isDefault);
		
		// 각 유저들이 보유한 카드들 중 그룹 카드 ID가 동일한 카드가있는지 확인
		for (User user : users) {
			List<UserCard> userCards = userCardService.findByUser_Id(user.getId());
			int result = 0;
			for (UserCard userCard : userCards) {
				if (userCard.getTravelWithId() != null &&
						userCard.getTravelWithId() == managerCard.getTravelWithId()) {
					++result;
				}
			}
			Assertions.assertThat(result).isEqualTo(1);
		}
	}
}
