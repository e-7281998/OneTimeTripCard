package com.shinhan.OneTimeTripCard.user;

import java.util.ArrayList;
import java.util.List;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.shinhan.OneTimeTripCard.service.UserService;
import com.shinhan.OneTimeTripCard.vo.User;

@SpringBootTest
public class UserTest {
	
	@Autowired
	UserService userService;

//	@Test
	public void save() {
		int accountNo = 11111;
		String[] banks = {"Busan Bank", "Hana Bank", "Shinhan Bank", "NH"};
		int order = 1;
		int password = 1111;
		String[] preferredCurrency = { "dollar", "dollar", "euro", "yuan" };
		boolean status = true;
		List<User> users = new ArrayList<>();
		List<User> savedUsers = new ArrayList<>();
		
		for (int i = 1; i <= 4; ++i) {
			User user = User.builder()
					.accountNo(String.valueOf(accountNo * i))
					.bankName(banks[i - 1])
					.firstName("first" + (i * order))
					.lastName("last" + (i * order))
					.email(String.valueOf(password * i) + "@naver.com")
					.password(String.valueOf(password * i))
					.phone("010-" + String.valueOf(password * i) + "-" + String.valueOf(password * i))
					.preferredCurrency(preferredCurrency[i - 1])
					.status(status)
					.build();
			status = !status;
			users.add(user);
		}
		for (User user : users) {
			//savedUsers.add(userService.save(user));
		}
		Assertions.assertThat(savedUsers.size()).isEqualTo(banks.length);
		for (int i = 0; i < users.size(); ++i ) {
			System.out.println(savedUsers.get(i).getId());
			Assertions.assertThat(users.get(i)).isSameAs(savedUsers.get(i));
		}
	}
}
