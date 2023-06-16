package com.shinhan.OneTimeTripCard.userCard;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.assertj.core.api.Assertions;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
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
		Grade grade = gradeService.getGradeById(28L); // 28L : Basic 혜택 수 2개
		
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
	
	@Test
	void register() throws JsonMappingException, JsonProcessingException {
		String [] failInputs = {
			"{\"userCard\":{\"id\":118,\"user\":{\"id\":1,\"email\":\"sollee@gmail.com\",\"firstName\":\"Sol\",\"lastName\":\"Lee\",\"password\":\"1234\",\"phone\":\"010-5555-4568\",\"preferredCurrency\":\"dollar\",\"status\":true,\"accountNo\":\"2021-5548-5564-5441\",\"bankName\":\"Busan Bank\"},\"card\":null,\"manager\":null,\"nickName\":\"testCard\",\"grade\":{\"id\":27,\"gradeName\":\"일반\",\"price\":0,\"period\":0,\"refundRate\":0,\"benefitCount\":0,\"imgSrc\":\"null\",\"maxRechargeCount\":0,\"deliveryCount\":0},\"benefits\":[],\"deliveries\":[],\"purchases\":[],\"charges\":[],\"balance\":null,\"discountAmount\":null,\"rechargeCount\":null,\"status\":null,\"createdAt\":\"2023-06-15T14:13:35.567511\",\"expiredAt\":null,\"isGroup\":false,\"isDefault\":null}, \"cardNo\": \"1234\", \"nickName\": \"3333\"}",
			"{\"userCard\":{\"id\":118,\"user\":{\"id\":1,\"email\":\"sollee@gmail.com\",\"firstName\":\"Sol\",\"lastName\":\"Lee\",\"password\":\"1234\",\"phone\":\"010-5555-4568\",\"preferredCurrency\":\"dollar\",\"status\":true,\"accountNo\":\"2021-5548-5564-5441\",\"bankName\":\"Busan Bank\"},\"card\":null,\"manager\":null,\"nickName\":\"testCard\",\"grade\":{\"id\":27,\"gradeName\":\"일반\",\"price\":0,\"period\":0,\"refundRate\":0,\"benefitCount\":0,\"imgSrc\":\"null\",\"maxRechargeCount\":0,\"deliveryCount\":0},\"benefits\":[],\"deliveries\":[],\"purchases\":[],\"charges\":[],\"balance\":null,\"discountAmount\":null,\"rechargeCount\":null,\"status\":null,\"createdAt\":\"2023-06-15T14:13:35.567511\",\"expiredAt\":null,\"isGroup\":false,\"isDefault\":null}, \"cardNo\": \"0221 3823 2938 2980\", \"nickName\": \"3333\"}",
			"{\"userCard\":{\"id\":118,\"user\":{\"id\":1,\"email\":\"sollee@gmail.com\",\"firstName\":\"Sol\",\"lastName\":\"Lee\",\"password\":\"1234\",\"phone\":\"010-5555-4568\",\"preferredCurrency\":\"dollar\",\"status\":true,\"accountNo\":\"2021-5548-5564-5441\",\"bankName\":\"Busan Bank\"},\"card\":null,\"manager\":null,\"nickName\":\"testCard\",\"grade\":{\"id\":27,\"gradeName\":\"일반\",\"price\":0,\"period\":0,\"refundRate\":0,\"benefitCount\":0,\"imgSrc\":\"null\",\"maxRechargeCount\":0,\"deliveryCount\":0},\"benefits\":[],\"deliveries\":[],\"purchases\":[],\"charges\":[],\"balance\":null,\"discountAmount\":null,\"rechargeCount\":null,\"status\":null,\"createdAt\":\"2023-06-15T14:13:35.567511\",\"expiredAt\":null,\"isGroup\":false,\"isDefault\":null}, \"cardNo\": \"0221 3923 3388 2220\", \"nickName\": \"3333\"}"
		};
		String [] successInputs = {
				"{\"userCard\":{\"id\":118,\"user\":{\"id\":1,\"email\":\"sollee@gmail.com\",\"firstName\":\"Sol\",\"lastName\":\"Lee\",\"password\":\"1234\",\"phone\":\"010-5555-4568\",\"preferredCurrency\":\"dollar\",\"status\":true,\"accountNo\":\"2021-5548-5564-5441\",\"bankName\":\"Busan Bank\"},\"card\":null,\"manager\":null,\"nickName\":\"testCard\",\"grade\":{\"id\":27,\"gradeName\":\"일반\",\"price\":0,\"period\":0,\"refundRate\":0,\"benefitCount\":0,\"imgSrc\":\"null\",\"maxRechargeCount\":0,\"deliveryCount\":0},\"benefits\":[],\"deliveries\":[],\"purchases\":[],\"charges\":[],\"balance\":null,\"discountAmount\":null,\"rechargeCount\":null,\"status\":null,\"createdAt\":\"2023-06-15T14:13:35.567511\",\"expiredAt\":null,\"isGroup\":false,\"isDefault\":null}, \"cardNo\": \"0221 3386 1112 3380\", \"nickName\": \"3333\"}",
				"{\"userCard\":{\"id\":118,\"user\":{\"id\":1,\"email\":\"sollee@gmail.com\",\"firstName\":\"Sol\",\"lastName\":\"Lee\",\"password\":\"1234\",\"phone\":\"010-5555-4568\",\"preferredCurrency\":\"dollar\",\"status\":true,\"accountNo\":\"2021-5548-5564-5441\",\"bankName\":\"Busan Bank\"},\"card\":null,\"manager\":null,\"nickName\":\"testCard\",\"grade\":{\"id\":27,\"gradeName\":\"일반\",\"price\":0,\"period\":0,\"refundRate\":0,\"benefitCount\":0,\"imgSrc\":\"null\",\"maxRechargeCount\":0,\"deliveryCount\":0},\"benefits\":[],\"deliveries\":[],\"purchases\":[],\"charges\":[],\"balance\":null,\"discountAmount\":null,\"rechargeCount\":null,\"status\":null,\"createdAt\":\"2023-06-15T14:13:35.567511\",\"expiredAt\":null,\"isGroup\":false,\"isDefault\":null}, \"cardNo\": \"0221 9374 2626 1211\", \"nickName\": \"3333\"}"	
		};
		String [] failResults = {
			"notExist", "alreadyRegistered", "alreadyRegistered", "succeed", "succeed"
		};
		String [] successResults = new String[successInputs.length];
//		String input = "{\"userCard\":{\"id\":118,\"user\":{\"id\":1,\"email\":\"sollee@gmail.com\",\"firstName\":\"Sol\",\"lastName\":\"Lee\",\"password\":\"1234\",\"phone\":\"010-5555-4568\",\"preferredCurrency\":\"dollar\",\"status\":true,\"accountNo\":\"2021-5548-5564-5441\",\"bankName\":\"Busan Bank\"},\"card\":null,\"manager\":null,\"nickName\":\"testCard\",\"grade\":{\"id\":27,\"gradeName\":\"일반\",\"price\":0,\"period\":0,\"refundRate\":0,\"benefitCount\":0,\"imgSrc\":\"null\",\"maxRechargeCount\":0,\"deliveryCount\":0},\"benefits\":[],\"deliveries\":[],\"purchases\":[],\"charges\":[],\"balance\":null,\"discountAmount\":null,\"rechargeCount\":null,\"status\":null,\"createdAt\":\"2023-06-15T14:13:35.567511\",\"expiredAt\":null,\"isGroup\":false,\"isDefault\":null}, \"cardNo\": \"1234\", \"nickName\": \"3333\"}";
		ObjectMapper mapper = new ObjectMapper();
		mapper.registerModule(new JavaTimeModule());
		for (int i = 0; i < failInputs.length; ++i) {
			Map<String, Object> map = mapper.readValue(failInputs[i], Map.class);
			UserCard userCard = mapper.convertValue(map.get("userCard"), UserCard.class);
			String cardNo = (String) map.get("cardNo");
			String nickName = (String) map.get("nickName");
			Boolean isDefault = (Boolean) map.get("isDefault");
			Assertions.assertThat(registerTest(userCard, cardNo, nickName, isDefault)).isEqualTo(failResults[i]);
		}
		
		for (int i = 0; i < successInputs.length; ++i) {
			Map<String, Object> map = mapper.readValue(successInputs[i], Map.class);
			UserCard userCard = mapper.convertValue(map.get("userCard"), UserCard.class);
			String cardNo = (String) map.get("cardNo");
			String nickName = (String) map.get("nickName");
			Boolean isDefault = (Boolean) map.get("isDefault");
			
			String result = registerTest(userCard, cardNo, nickName, isDefault);
			boolean isJsonType = false;
			try {
				JSONObject jsonObject = new JSONObject(result);
				isJsonType = true;
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			Assertions.assertThat(isJsonType).isTrue();
		}
		
//		UserCard userCard = (UserCard)map.get("userCard");
		
	}
	
	private String registerTest(UserCard userCard, String cardNo, String nickName, Boolean isDefault) {
		return userCardService.register(userCard, cardNo, nickName, isDefault);
	}
}
