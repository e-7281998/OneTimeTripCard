package com.shinhan.OneTimeTripCard.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public enum ExchangeRateName {
	DOLLAR("$", "미국 달러", "USD"),
	EURO("€", "유로", "EUR"),
	YUAN("元", "위안화", "CNH"),
	YEN("¥", "일본 엔", "JPY(100)");
	
	private String symbol;
	private String korName;
	private String unit;
}
