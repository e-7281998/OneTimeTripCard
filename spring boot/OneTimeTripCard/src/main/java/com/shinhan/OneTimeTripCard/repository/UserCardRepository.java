package com.shinhan.OneTimeTripCard.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.shinhan.OneTimeTripCard.vo.Card;
import com.shinhan.OneTimeTripCard.vo.UserCard;

public interface UserCardRepository extends CrudRepository<UserCard, Long>{
	
	public List<UserCard> findByUser_Id(Long userId);
	public UserCard findByCard(Card card);
	@Query(value = "SELECT group_sequence.NEXTVAL FROM DUAL", nativeQuery = true)
    Long getNextGroupSequence();
	
	public List<UserCard> findByUser_IdAndIsGroup(Long userId, Boolean isGroup);
}
