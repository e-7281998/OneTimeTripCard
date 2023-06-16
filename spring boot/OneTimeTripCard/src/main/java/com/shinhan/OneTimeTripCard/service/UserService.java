package com.shinhan.OneTimeTripCard.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.shinhan.OneTimeTripCard.repository.UserRepository;
import com.shinhan.OneTimeTripCard.vo.User;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserService {
	
	private final UserRepository userRepository;
	
	//회원가입
	public User signUp(User user) {
		userRepository.save(user);
		return user;
	}
	
	
	//[이솔]: 마이페이지_유저정보_Read
	public User findById(Long id) {
		return userRepository.findById(id).orElse(null);
	}
	
	//[이솔]: 마이페이지_유저정보_Update
	public User updateUserInfo(User user) {
		return userRepository.save(user);
	}
	
	//로그인
	public User login(User user) {
		System.out.println("aaa");
		User emailcheck = userRepository.findByEmail(user.getEmail());
		System.out.println(user.getPassword());
		
		if(emailcheck==null) {
			emailcheck =User.builder().email("0").build();
		} else if(!user.getPassword().equals(emailcheck.getPassword())) {
			
			emailcheck.setEmail("1");
		}
		return emailcheck;
	}
	
	//email(id)찾기
	public List<String> findEmail(User user) {
		System.out.println("aaaaa");
		List<String> emails = new ArrayList<>();
		List<User> userInfos = userRepository.findByFirstNameAndLastNameAndPhone(user.getFirstName(), user.getLastName(), user.getPhone()); 
		for (User userInfo : userInfos) {
			emails.add(userInfo.getEmail());
		}
		
		return emails;
	}
	
	
	
}
