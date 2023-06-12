package com.shinhan.OneTimeTripCard.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.shinhan.OneTimeTripCard.vo.User;

public interface UserRepository extends CrudRepository<User, Long>{
	
	//로그인
	public User findByEmailAndPassword(String email, String password);
	
}
