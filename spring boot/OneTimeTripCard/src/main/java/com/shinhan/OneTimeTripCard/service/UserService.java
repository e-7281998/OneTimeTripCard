package com.shinhan.OneTimeTripCard.service;

import org.springframework.stereotype.Service;

import com.shinhan.OneTimeTripCard.repository.UserRepository;
import com.shinhan.OneTimeTripCard.vo.User;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserService {
	
	private final UserRepository userRepository;
	
	public User save(User user) {
		return userRepository.save(user);
	}
}
