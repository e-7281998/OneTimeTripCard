package com.shinhan.OneTimeTripCard.service;

import org.springframework.stereotype.Service;

import com.shinhan.OneTimeTripCard.repository.ExchangeRateRepository;
import com.shinhan.OneTimeTripCard.vo.ExchangeRate;
import com.shinhan.OneTimeTripCard.vo.ExchangeRateName;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ExchangeRateService {

	private final ExchangeRateRepository exchangeRateRepository;
	
	/**
	 * 환율 조회
	 * 1. 이름을 기준으로 ENUM에서 unit정보를 조회하고(dollar, euro, etc)
	 * 2. unit을 기준으로 환율 정보를 가져온다.
	 * 3. toCharge 여부에 따라 
	 *   3-1. true: tts(살 때)를 리턴
	 *   3-2. false: tbs(팔 때)를 리턴
	 * @param currencyName
	 * @param toCharge
	 * @return 
	 */
	public Double getExchangeRate(String currencyName, boolean toCharge) {
		ExchangeRateName exchangeRateName = ExchangeRateName.getExchangeRateName(currencyName);
		String unit = exchangeRateName.getUnit();
		ExchangeRate exchangeRate = exchangeRateRepository.findByCurUnit(unit);
		if (exchangeRate == null) {
			return null;
		}
		if (toCharge) {
			return Double.parseDouble(exchangeRate.getTts());
		}
		else {
			return Double.parseDouble(exchangeRate.getTtb());
		}
	}
}
