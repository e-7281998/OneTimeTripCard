package com.shinhan.OneTimeTripCard.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.shinhan.OneTimeTripCard.service.MailService;
import com.shinhan.OneTimeTripCard.service.UserService;
import com.shinhan.OneTimeTripCard.vo.ExchangeRateName;
import com.shinhan.OneTimeTripCard.vo.User;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/login")
@RequiredArgsConstructor
public class LoginController {

	private final UserService userService;
	
	//email인증
	@Resource(name = "mailService")
	private MailService mailService;
		
	//login
	@PostMapping()
	public User login(@RequestBody User user) {
		System.out.println(user.getEmail());
		System.out.println(user.getPassword());
		
		User loginuser = userService.login(user);
		System.out.println(loginuser);
		
		return loginuser;
	}
	
	//sign up
	@PostMapping("/sign-up")
	public User signUp(@RequestBody User user) {
		System.out.println(user.getEmail());
		System.out.println(user.getPassword());
		System.out.println(user.getFirstName());
		System.out.println(user.getLastName());
		System.out.println(user.getPhone());
		System.out.println(user.getPreferredCurrency());
		
		userService.signUp(user);	
		
		return user;
	}
	
	//아이디 중복체크
	@GetMapping("/sign-up")
	public int emailDupCheck(@RequestParam String email) {
		System.out.println(email);
		
		return userService.dupCheck(email);
	}
	
	//id(email)찾기
	@PostMapping("/find-email")
	public List<String> findEmail(@RequestBody User user) {
		System.out.println(user.getFirstName());
		System.out.println(user.getLastName());
		System.out.println(user.getPhone());
		
		List<String> emails = userService.findEmail(user);
		return emails;
	}
	
	//password찾기
	@PostMapping("/find-password")
	public int findPwd(@RequestBody User user) {
		System.out.println(user.getEmail());
		System.out.println(user.getPhone());
		
		//임시비밀번호 보내기
		System.out.println("메일 보내기 탔나?");
		
		int emailcheck = mailService.updatePwd(user);
		System.out.println("ddd"+emailcheck);
		
		if(emailcheck == 1 || emailcheck == 0) {
			return emailcheck;
		} else
		
		mailService.sendSimpleEmail(user);
		 
		return 3;
	}

}
