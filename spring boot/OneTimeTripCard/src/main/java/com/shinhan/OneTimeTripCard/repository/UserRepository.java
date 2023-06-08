package com.shinhan.OneTimeTripCard.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.shinhan.OneTimeTripCard.vo.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long>{

}
