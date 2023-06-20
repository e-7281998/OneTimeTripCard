package com.shinhan.OneTimeTripCard.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.shinhan.OneTimeTripCard.service.ExchangeRateService;
import com.shinhan.OneTimeTripCard.vo.ExchangeRateName;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/exchange-rate")
public class ExchangeRateController {
	
	private final ExchangeRateService exchangeRateService;
	
	@GetMapping("/charge")
	public Double getChargeExchangeRate(@RequestParam String currencyName) {
		System.out.println(currencyName);
		return exchangeRateService.getExchangeRate(currencyName, true);
	}
	
	@GetMapping("/return")
	public Double getReturnExchangeRate(@RequestParam String currencyName) {
		return exchangeRateService.getExchangeRate(currencyName, false);
	}
	
	@GetMapping("/getAllCurrency")
	   public List<ExchangeRateName> getAllCurrency() {
	      return Arrays.asList(ExchangeRateName.values());
	   }
}
