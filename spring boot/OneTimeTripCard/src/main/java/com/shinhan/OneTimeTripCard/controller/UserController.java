package com.shinhan.OneTimeTripCard.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
	
	//[이솔]: 마이페이지_유저정보_Read
	@GetMapping("/userInfoGet/1")
	public User userInfoGet() {
		return userService.findById(1L);
	}
	
	//[이솔]: 마이페이지_유저정보_Update
	@PutMapping(value="/userInfoUpdate")
	public User userInUpdate(@RequestBody User user) {
		return userService.updateUserInfo(user);
	}
}
