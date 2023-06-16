package com.shinhan.OneTimeTripCard.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.shinhan.OneTimeTripCard.service.UserCardService;
import com.shinhan.OneTimeTripCard.vo.UserCard;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user-card")
public class UserCardController {
	
	private final UserCardService userCardService;
	
	@PostMapping("/purchase")
	public UserCard purchase(@RequestBody UserCard userCard) {
		return userCardService.save(userCard);
	}
	
	@GetMapping("/history/{userId}")
	public List<UserCard> getPurchasedHistory(@PathVariable Long userId) {
		return userCardService.findByUser_Id(userId);
	}
	
	@PostMapping("/register")
	public String register(@RequestBody Map<String, Object> map) {
		ObjectMapper mapper = new ObjectMapper();
		mapper.registerModule(new JavaTimeModule());
		UserCard userCard = mapper.convertValue(map.get("userCard"), UserCard.class);
		String cardNo = (String) map.get("cardNo");
		String nickName = (String) map.get("nickName");
		Boolean isDefault = (Boolean) map.get("isDefault");
		return userCardService.register(userCard, cardNo, nickName, isDefault);	
	}
}
