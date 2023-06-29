package com.shinhan.OneTimeTripCard.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shinhan.OneTimeTripCard.service.TravelWithService;
import com.shinhan.OneTimeTripCard.vo.User;
import com.shinhan.OneTimeTripCard.vo.UserCard;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/travel-with")
public class TravelWithController {

	private final TravelWithService travelWithService;
	
	@PostMapping("/register")
	public UserCard register(@RequestBody Map<String, Object> map) {
		Long managerId = Long.parseLong((String) map.get("userId"));
		String nickName = (String) map.get("nickName");
		List<String> invitedEmails = (List<String>) map.get("emails");
		Boolean isDefault = (Boolean) map.get("isDefault");
		return travelWithService.register(managerId, nickName, invitedEmails, isDefault);
	}
	
	@GetMapping("/getAll/{userId}")
	public List<UserCard> getAllTravelWithCards(@PathVariable Long userId) {
		return travelWithService.getAllTravelWithCards(userId);
	}
	
	@GetMapping("/users/{travelWithId}")
	public List<User> getAllUsersInTravelWithGroup(@PathVariable Long travelWithId) {
		return travelWithService.getAllUsersInTravelWithGroup(travelWithId);
	}
	
	@DeleteMapping("/delete")
	public UserCard deactivateTravelWithCard(@RequestBody UserCard travelWithCard) {
		return travelWithService.deactivateTravelWithCard(travelWithCard);
	}
	
	@DeleteMapping("/expel")
	public UserCard expelMember(@RequestBody Map<String, Object> map) {
		String email = String.valueOf(map.get("email"));
		Long travelWithId = Long.parseLong((String) map.get("travelWithId"));
		return travelWithService.expelMember(email, travelWithId);
	}
	
	@PostMapping("/register-card")
	public String registerCard(@RequestBody Map<String, Object> map) {
		Long travelWithId = Long.parseLong((String) map.get("travelWithId"));
		Long memberId = Long.parseLong((String) map.get("memberId"));
		Long managerId = Long.parseLong((String) map.get("managerId"));
		String cardNo = (String) map.get("cardNo");
		return travelWithService.registerCard(travelWithId, memberId, managerId, cardNo);
	}
	
	@PostMapping("/split/{travelWithId}")
	public UserCard splitBalance(@PathVariable Long travelWithId) {
		return travelWithService.splitBalance(travelWithId);
	}
}
