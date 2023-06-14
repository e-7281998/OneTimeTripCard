package com.shinhan.OneTimeTripCard.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.shinhan.OneTimeTripCard.service.UserCardService;
import com.shinhan.OneTimeTripCard.vo.User;
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
}
