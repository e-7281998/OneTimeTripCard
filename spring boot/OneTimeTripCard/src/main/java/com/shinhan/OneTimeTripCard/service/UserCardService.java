package com.shinhan.OneTimeTripCard.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.shinhan.OneTimeTripCard.repository.UserCardRepository;
import com.shinhan.OneTimeTripCard.vo.UserCard;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserCardService {

	private final UserCardRepository userCardRepository;
	
	public UserCard save(UserCard userCard) {
		return userCardRepository.save(userCard);
	}
	
	public List<UserCard> findByUser_Id(Long userId) {
		return userCardRepository.findByUser_Id(userId);
	}
}
