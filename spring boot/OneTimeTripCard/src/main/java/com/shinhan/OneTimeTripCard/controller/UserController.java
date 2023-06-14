package com.shinhan.OneTimeTripCard.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shinhan.OneTimeTripCard.service.UserService;
import com.shinhan.OneTimeTripCard.vo.User;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
	
	private final UserService userService;
	
	//회원가입.3
	@PostMapping("/signUp")
	public User signUp(@RequestBody User user) {
		return userService.signUp(user);
	}
	
	//정보수정
	@GetMapping("/userInfoUpdate")
	public User userInfoUpdate() {
		System.out.println(userService.findById(21L).getEmail()); 
		return userService.findById(21L);
		
	}
}
