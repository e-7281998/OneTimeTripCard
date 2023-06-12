package com.shinhan.OneTimeTripCard.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shinhan.OneTimeTripCard.repository.UserRepository;
import com.shinhan.OneTimeTripCard.service.UserService;
import com.shinhan.OneTimeTripCard.vo.User;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/login")
@RequiredArgsConstructor
public class LoginController {

	private final UserService userService;
	
	//login
	@PostMapping("/login")
	public User login(@RequestBody User user) {
		System.out.println(user.getEmail());
		System.out.println(user.getPassword());
		User loginuser = userService.login(user.getEmail(), user.getPassword());
		System.out.println(loginuser);
		 
		return loginuser;
	}
	
	//id 찾기
	@GetMapping("/searchUser")
	public String searchUserbyId(@RequestBody User user) {
		System.out.println(user.getFirstName());
	    System.out.println(user.getLastName());
	    System.out.println(user.getPhone());
	   
	    List<String> emails = userService.findEmail(user);
	   
	    return emails.toString();
	}
	
	//password찾기
	@GetMapping("/searchPwd")
	public String searchPwdbyId(@RequestBody User user) {
		String pwd = userService.findPwd(user.getEmail());
	    System.out.println(pwd);
	    
	    return pwd;
	}

}
