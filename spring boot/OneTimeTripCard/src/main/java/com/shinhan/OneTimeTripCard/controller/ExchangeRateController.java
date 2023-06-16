package com.shinhan.OneTimeTripCard.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shinhan.OneTimeTripCard.service.ExchangeRateService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/exchange-rate")
public class ExchangeRateController {
	
	private final ExchangeRateService exchangeRateService;
	
	@GetMapping("/charge")
	public Double getChargeExchangeRate(String currencyName) {
		return exchangeRateService.getExchangeRate(currencyName, true);
	}
	
	@GetMapping("/return")
	public Double getReturnExchangeRate(String currencyName) {
		return exchangeRateService.getExchangeRate(currencyName, false);
	}
}
