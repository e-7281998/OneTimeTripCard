package com.shinhan.OneTimeTripCard.service;

import org.springframework.stereotype.Service;

import com.shinhan.OneTimeTripCard.repository.CardRepository;
import com.shinhan.OneTimeTripCard.vo.Card;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CardService {
	
	private final CardRepository cardRepository;
	
	public Card findByCardNo(String cardNo) {
		return cardRepository.findById(cardNo).orElse(null);
	}
}
