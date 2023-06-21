package com.shinhan.OneTimeTripCard.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.shinhan.OneTimeTripCard.repository.UserCardRepository;
import com.shinhan.OneTimeTripCard.vo.Card;
import com.shinhan.OneTimeTripCard.vo.User;
import com.shinhan.OneTimeTripCard.vo.UserCard;

import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

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
			userCard.setNickName(nickName);
			userCard.setIsDefault(isDefault);
			return userCardToString(save(userCard));
		}
		if (savedUserCard.getUser().equals(userCard.getUser())) {
			return "alreadyRegistered";
		}
		if (savedUserCard.getIsGroup()) {
			savedUserCard.setNickName(nickName);
			savedUserCard.setIsDefault(isDefault);
			return userCardToString(save(savedUserCard));
		}
		return "alreadyRegistered";
	}

	public UserCard findById(Long id) {
		return userCardRepository.findById(id).orElse(null);
	}

	/**
	 * 유저카드 삭제(비활성화) 하는 기능
	 * 1. userCardId가 유효한지 확인
	 * 2. 이미 비활성화 했는지 확인
	 * 3. 카드가 유효하고, 활성화 상태이면 비활성화
	 * 4. Transactional 처리는 Dirty Check를 통한 update를 위해 사용
	 * @param userCardId
	 * @return
	 */
	@Transactional
	public String deactivateUserCard(Long userCardId) {
		UserCard userCard = userCardRepository.findById(userCardId).orElse(null);
		if (userCard == null) {
			return "notValidId";
		}
		if (!userCard.getStatus()) {
			return "alreadyDeactivated";
		}
		userCard.setStatus(false);
//		save(userCard);
		return "succeed";
	}

	/**
	 * 유저카드 -> 유저카드 잔액 전송
	 * 1. from, to가 request body에 들어오지 않으면 전송 실패
	 * 2. 둘 중 하나가 유효하지 않은 아이디면 return
	 * 3. 이 외, 보내는 카드의 잔액을 받는 카드의 잔액에 더해주고, 그만큼의 금액을 리턴
	 * Dirty checking을 위해 @Transactional 사용
	 * @param from
	 * @param to
	 * @return 전송한 금액
	 */
	@Transactional
	public int transferBetweenUserCards(Long from, Long to) {
		if (from == null || to == null) {
			return 0;
		}
		UserCard sender = userCardRepository.findById(from).orElse(null);
		UserCard receiver = userCardRepository.findById(to).orElse(null);
		if (sender == null || receiver == null) {
			return 0;
		}
		int amount = sender.getBalance();
		receiver.setBalance(receiver.getBalance() + amount);
		sender.setBalance(0);
		return amount;
	}

	/**
	 * 유저카드 환불 기능
	 * 1. userCardId를 기반으로 userCard 검색
	 * 2. 유효하지 않은 카드는 0원 환불(return 0)
	 * 3. 잔액을 0으로 만들고 차감한 금액만큼 return
	 * @param userCardId
	 * @return
	 */
	@Transactional
	public int refund(Long userCardId) {
		UserCard userCard = userCardRepository.findById(userCardId).orElse(null);
		if (userCard == null) {
			return 0;
		}
		int amount = userCard.getBalance();
		userCard.setBalance(0);
		return amount;
	}
	
	private UserCard findByCard(Card card) {
		return userCardRepository.findByCard(card);
	}
	
	/**
	 * 유저들의 기본 카드를 찾아주는 메서드
	 * @param users
	 * @return
	 */
	public List<UserCard> findDefaultCards(List<User> users) {
		return userCardRepository.findAllByUserInAndIsDefault(users, true);
	}
	
	private String userCardToString(UserCard userCard) {
		ObjectMapper mapper = new ObjectMapper();
		mapper.registerModule(new JavaTimeModule());
		String result = "";
		try {
			result = mapper.writeValueAsString(userCard);
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return result;
	}
}
