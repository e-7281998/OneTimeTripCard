package com.shinhan.OneTimeTripCard.userCard;

import java.util.ArrayList;
import java.util.List;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.shinhan.OneTimeTripCard.service.BenefitService;
import com.shinhan.OneTimeTripCard.service.GradeService;
import com.shinhan.OneTimeTripCard.service.UserCardService;
import com.shinhan.OneTimeTripCard.service.UserService;
import com.shinhan.OneTimeTripCard.vo.Benefit;
import com.shinhan.OneTimeTripCard.vo.Grade;
import com.shinhan.OneTimeTripCard.vo.User;
import com.shinhan.OneTimeTripCard.vo.UserCard;

@SpringBootTest
public class UserCardTest {

	@Autowired
	UserCardService userCardService;
	
	@Autowired
	UserService userService;
	
	@Autowired
	BenefitService benefitService;
	
	@Autowired
	GradeService gradeService;
	
//	@Test
	void saveTest() {
		// 1. User 정보
		User user = userService.findById(1L);
		
		// 2. 등급 정보
		Grade grade = gradeService.findById(28L); // 28L : Basic 혜택 수 2개
		
		// 3. 혜택 선택(등급에 따른 혜택 수 선택)
		List<Benefit> benefits = benefitService.findAll();
		List<Benefit> userBenefits = new ArrayList<>();
		for (int i = 0; i < benefits.size(); ++i) {
			if (i == grade.getBenefitCount()) {
				break;
			}
			userBenefits.add(benefits.get(i));
		}
		
		// 4. 1, 2, 3의 정보를 UserCard에 저장
		UserCard userCard = UserCard.builder()
				.user(user)
				.grade(grade)
				.benefits(userBenefits)
				.nickName("personal Card")
				.isGroup(false)
				.build();
		
		// 5. database 저장
		UserCard savedUserCard = userCardService.save(userCard);
		
		// 6. 저장된 userCard가 일치하는지 확인
		Assertions.assertThat(userCard).isSameAs(savedUserCard);
	}
}
