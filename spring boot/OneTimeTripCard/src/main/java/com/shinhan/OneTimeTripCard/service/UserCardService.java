package com.shinhan.OneTimeTripCard.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.shinhan.OneTimeTripCard.repository.UserCardRepository;
import com.shinhan.OneTimeTripCard.vo.Card;
import com.shinhan.OneTimeTripCard.vo.UserCard;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserCardService {

	private final CardService cardService;
	private final UserCardRepository userCardRepository;
	
	/**
	 * 카드 번호를 기준으로 끝자리가 1이면 그룹, 0이면 개인 카드로 설정
	 * @param userCard
	 * @return
	 */
	public UserCard save(UserCard userCard) {
		String cardNo = userCard.getCard().getCardNo(); 
		if (cardNo.charAt(cardNo.length() - 1) == '1') {
			userCard.setIsGroup(true);
		}
		return userCardRepository.save(userCard);
	}
	
	public List<UserCard> findByUser_Id(Long userId) {
		return userCardRepository.findByUser_Id(userId);
	}
	
	/**
	 * 카드를 등록 메서드
	 * 1. cardNo로 Card를 조회
	 * 2. 카드가 존재하지 않는다. -> return "notExist"
	 * 3. 카드 존재:
	 *   3-1. 등록되지 않은 카드 -> 등록
	 *   3-2. 다른 유저에 의해 등록된 카드:
	 *     3-2-1. 내가 등록한 카드 -> return 'alreadyRegistered'
	 *     3-2-2. 그룹카드 -> 등록
	 *     3-2-3. 그룹카드X -> return 'alreadyRegistered'
	 * @param cardNo
	 * @param user
	 * @return 등록 -> succeed
	 */
	public String register(UserCard userCard, String cardNo, String nickName, Boolean isDefault) {
		Card savedCard = cardService.findByCardNo(cardNo);
		if (savedCard == null) {
			return "notExist";
		}
		UserCard savedUserCard = findByCard(savedCard);
		if (savedUserCard == null) {
			userCard.setCard(savedCard);
			userCard.setIsDefault(isDefault);
			return save(userCard).toString();
		}
		if (savedUserCard.getUser().equals(userCard.getUser())) {
			return "alreadyRegistered";
		}
		if (savedUserCard.getIsGroup()) {
			savedUserCard.setIsDefault(isDefault);
			return save(savedUserCard).toString();
		}
		return "alreadyRegistered";
	}
	
	private UserCard findByCard(Card card) {
		return userCardRepository.findByCard(card);
	}
}
