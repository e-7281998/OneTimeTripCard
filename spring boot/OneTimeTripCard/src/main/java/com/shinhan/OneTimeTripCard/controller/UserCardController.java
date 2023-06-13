package com.shinhan.OneTimeTripCard.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
