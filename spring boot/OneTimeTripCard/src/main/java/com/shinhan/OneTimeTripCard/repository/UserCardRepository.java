package com.shinhan.OneTimeTripCard.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.shinhan.OneTimeTripCard.vo.Card;
import com.shinhan.OneTimeTripCard.vo.User;
import com.shinhan.OneTimeTripCard.vo.UserCard;

public interface UserCardRepository extends CrudRepository<UserCard, Long>{
	
	public List<UserCard> findByUser_Id(Long userId);
	public UserCard findByCard(Card card);
	@Query(value = "SELECT group_sequence.NEXTVAL FROM DUAL", nativeQuery = true)
    Long getNextGroupSequence();
	
	public List<UserCard> findByUser_IdAndIsGroup(Long userId, Boolean isGroup);
	
	@Query ("select uc.user from UserCard uc where uc.travelWithId = :travelWithId and uc.status = :status")
	public List<User> getUsersByTravelWithId(@Param(value = "travelWithId") Long travelWithId, @Param(value = "status") Boolean status);
	
	public List<UserCard> findAllByTravelWithId(Long travelWithId);
	
	public UserCard findByUser_IdAndTravelWithId(Long userId, Long travelWithId);
	
	public Boolean existsByCard_CardNo(String cardNo);
	
	public List<UserCard> findAllByUserInAndIsDefault(List<User> users, Boolean isDefault);

	public UserCard findByUser_IdAndIsDefault(Long userId, Boolean isDefault);
}
