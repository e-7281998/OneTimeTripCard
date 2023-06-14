package com.shinhan.OneTimeTripCard.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.shinhan.OneTimeTripCard.vo.User;

public interface UserRepository extends CrudRepository<User, Long>{
	
	
	//public User findByEmailAndPassword(String email, String password);
	//로그인
	public User findByEmail(String email);
	
	//email(id)찾기(한사람이 email(id)를 여러개를 가지고 있을수 있기때문에 List)
	public List<User> findByFirstNameAndLastNameAndPhone(String firstName, String lastName, String phone);
	
	//비밀번호찾기(인증번호 구현해야함)
	
}
