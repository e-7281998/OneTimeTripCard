package com.shinhan.OneTimeTripCard.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shinhan.OneTimeTripCard.service.TravelWithService;
import com.shinhan.OneTimeTripCard.vo.UserCard;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/travel-with")
public class TravelWithController {

	private final TravelWithService travelWithService;
	
	@PostMapping("/register")
	public UserCard register(@RequestBody Map<String, Object> map) {
		Long managerId = (Long) map.get("userId");
		String nickName = (String) map.get("nickName");
		List<String> invitedEmails = (List<String>) map.get("emails");
		Boolean isDefault = (Boolean) map.get("isDefault");
		return travelWithService.register(managerId, nickName, invitedEmails, isDefault);
	}
}
