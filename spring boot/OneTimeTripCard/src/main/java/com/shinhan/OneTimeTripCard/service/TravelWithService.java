package com.shinhan.OneTimeTripCard.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.shinhan.OneTimeTripCard.repository.UserCardRepository;
import com.shinhan.OneTimeTripCard.vo.Card;
import com.shinhan.OneTimeTripCard.vo.Grade;
import com.shinhan.OneTimeTripCard.vo.NSplit;
import com.shinhan.OneTimeTripCard.vo.User;
import com.shinhan.OneTimeTripCard.vo.UserCard;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TravelWithService {

	private final UserService userService;
	private final CardService cardService;
	private final UserCardService userCardService;
	private final GradeService gradeService;
	private final NSplitService nSplitService;
	private final UserCardRepository userCardRepository;
	
	/**
	 * 카드를 만드는 사람이 발급
	 * 초대한 이메일 목록을 기반으로 각각 userCard를 만듬(조회용)
	 * 등급은 일반 등급
	 * 매니저는 매니저 아이디를 기반으로 카드 등록
	 * @param managerId
	 * @param nickName
	 * @param invitedEmails
	 * @param isDefault
	 * @return
	 */
	public UserCard register(Long managerId, String nickName, List<String> invitedEmails, Boolean isDefault) {
		List<UserCard> userCards = new ArrayList<>();
		User manager = userService.findById(managerId);
		Grade basicGrade = gradeService.getGradeByName("normal");
		Long travelWithId = userCardRepository.getNextGroupSequence();
		UserCard managerCard = createTravelWithCard(manager, manager, nickName, basicGrade, travelWithId, isDefault);
		userCards.add(managerCard);
		for (String invitedEmail : invitedEmails) {
			User user = userService.findByEmail(invitedEmail);
			if (user == null) {
				continue;
			}
			UserCard userCard = createTravelWithCard(user, manager, nickName, basicGrade, travelWithId, isDefault);
			
			userCards.add(userCard);
		}
		List<UserCard> savedUserCards = (List<UserCard>) userCardRepository.saveAll(userCards);
		for (UserCard savedUserCard : savedUserCards) {
			if (savedUserCard.getUser().getId() == managerId) {
				managerCard = savedUserCard;
			}
		}
		return managerCard;
	}
	
	/**
	 * managerId를 기반으로 TravelWithCard(공용카드) 생성
	 * @param user
	 * @param manager
	 * @param basicGrade
	 * @param travelWithId (그룹 카드 id)
	 * @return
	 */
	private UserCard createTravelWithCard(User user, User manager, String nickName, Grade basicGrade, Long travelWithId, Boolean isDefault) {
		UserCard userCard = UserCard.builder()
				.user(user)
				.manager(manager)
				.nickName(nickName)
				.grade(basicGrade)
				.isGroup(true)
				.expiredAt(LocalDateTime.now())
				.travelWithId(travelWithId)
				.isDefault(isDefault)
				.build();
		return userCard;
	}

	public List<UserCard> getAllTravelWithCards(Long userId) {
		return userCardRepository.findByUser_IdAndIsGroup(userId, true);
	}
	
	public List<User> getAllUsersInTravelWithGroup(Long travelWithId) {
		return userCardRepository.getUsersByTravelWithId(travelWithId, true);
	}
	
	/**
	 * 그룹카드 비활성화
	 * 1. 그룹의 매니저인지확인하고 아니면 notAllowed return
	 * 2. 그룹에 포함된 다른 사람들 모두 deactivate
	 * @param travelWithCard
	 * @return
	 */
	@Transactional
	public UserCard deactivateTravelWithCard(UserCard travelWithCard) {
		User manager = travelWithCard.getManager();
		User user = travelWithCard.getUser();
		if (manager == null || !(manager.getId().equals(user.getId()))) {
			return null;
		}
		travelWithCard.setStatus(false);
		deactivateMemberCards(travelWithCard.getTravelWithId());
		
		return travelWithCard;
	}
	
	/**
	 * 같은 그룹에 포함된 유저카드 조회
	 * @param travelWithId
	 * @return
	 */
	public List<UserCard> findAllMemberCards(Long travelWithId) {
		return userCardRepository.findAllByTravelWithId(travelWithId);
	}
	
	/**
	 * 그룹에서 멤버 한명 내보내기
	 * @param email
	 * @param travelWithId
	 * @return
	 */
	@Transactional
	public UserCard expelMember(String email, Long travelWithId) {
		User user = userService.findByEmail(email);
		UserCard expelledUserCard = userCardRepository.findByUser_IdAndTravelWithId(user.getId(), travelWithId);
		expelledUserCard.setStatus(false);
		return expelledUserCard;
	}
	
	/**
	 * travelWithId를 기반으로 포함된 멤버들의 카드 역시 deactivate
	 * @param travelWithId
	 */
	private void deactivateMemberCards(Long travelWithId) {
		List<UserCard> travelWithCards = findAllMemberCards(travelWithId);
		for (UserCard travelWithCard : travelWithCards) {
			travelWithCard.setStatus(false);
		}
	}

	/**
	 * usercard에 실물 카드 등록
	 * 1. 등록할 수 있는 사람, 카드인지 확인
	 * 2. 등록할 수 있는 상태라면, 카드 등록
	 * @param travelWithId
	 * @param memberId : 등록을 시도하는 User의 아이디
	 * @param managerId
	 * @param cardNo
	 * @return
	 */
	@Transactional
	public String registerCard(Long travelWithId, Long memberId, Long managerId, String cardNo) {
		String canRegister = canRegister(travelWithId, memberId, managerId, cardNo);
		if (!canRegister.equals("possible")) {
			return canRegister;
		}
		List<UserCard> travelWithCards = userCardRepository.findAllByTravelWithId(travelWithId);
		Card card = cardService.findByCardNo(cardNo);
		for (UserCard travelWithCard : travelWithCards) {
			travelWithCard.setCard(card);
		}
		return canRegister;
	}
	
	/**
	 * n분의 1 split 해주는 메서드
	 * @param travelWithId
	 * @return
	 */
	@Transactional
	public UserCard splitBalance(Long travelWithId) {
		List<UserCard> travelWithCards = userCardRepository.findAllByTravelWithId(travelWithId);
		List<User> users = travelWithCards.stream().map(travelWithCard -> travelWithCard.getUser()).collect(Collectors.toList());
		List<UserCard> defaultCards = userCardService.findDefaultCards(users);
		Map<Long, UserCard> defaultCardMap = createDefaultCardMap(defaultCards);
		int splitAmount = travelWithCards.get(0).getBalance() / travelWithCards.size();
		List<NSplit> splits = new ArrayList<>();
		for (UserCard travelWithCard : travelWithCards) {
			travelWithCard.setBalance(travelWithCard.getBalance() - (splitAmount * travelWithCards.size()));
			NSplit split = NSplit.builder()
					.userCard(travelWithCard)
					.amount(splitAmount)
					.build();
			UserCard defaultCard = defaultCardMap.get(travelWithCard.getUser().getId()); 
			defaultCard.setBalance(defaultCard.getBalance() + splitAmount);
			splits.add(split);
		}
		nSplitService.saveAll(splits);
		return travelWithCards.stream()
				.filter(userCard -> userCard.getManager().getId() == userCard.getUser().getId())
				.findFirst().get();
	}
	
	
	
	/** 유저 아이디를 키로, 기본카드를 찾게 해주는 맵을 만들어주는 함수
	 * @param defaultCards
	 * @return
	 */
	private Map<Long, UserCard> createDefaultCardMap(List<UserCard> defaultCards) {
		Map<Long, UserCard> defaultCardMap = new HashMap<>();
		for (UserCard defaultCard : defaultCards) {
			defaultCardMap.put(defaultCard.getUser().getId(), defaultCard);
		}
		return defaultCardMap;
	}
	
	/**
	 * 등록할 수 있는지 없는지 판단하는 메서드
	 * @param travelWithId
	 * @param memberId : 등록을 시도하는 User의 아이디
	 * @param managerId
	 * @param cardNo
	 * @return "possible" -> 가능할 때만
	 * 등록할 수 없는 카드는 각각의 메시지를 리턴해줌
	 */
	private String canRegister(Long travelWithId, Long memberId, Long managerId, String cardNo) {
		if (memberId != managerId) {
			return "NotAllowed";
		}
		if (cardNo.charAt(cardNo.length() - 1) != '1') {
			return "NotTravelWithCard";
		}
		Card card = cardService.findByCardNo(cardNo);
		if (card == null) {
			return "InvalidCardNo";
		}
		if (userCardRepository.existsByCard_CardNo(cardNo)) {
			return "AlreadyRegistered";
		}
		return "possible";
	}
}
