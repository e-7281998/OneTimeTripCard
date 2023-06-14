package com.shinhan.OneTimeTripCard.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.shinhan.OneTimeTripCard.vo.UserCard;

public interface UserCardRepository extends CrudRepository<UserCard, Long>{
	
	public List<UserCard> findByUser_Id(Long userId);
}
