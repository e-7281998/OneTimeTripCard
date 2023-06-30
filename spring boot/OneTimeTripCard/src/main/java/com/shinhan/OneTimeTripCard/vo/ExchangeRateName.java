package com.shinhan.OneTimeTripCard.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public enum ExchangeRateName {
	DOLLAR("$", "미국 달러", "dollar", "USD"),
	EURO("€", "유로", "euro", "EUR"),
	YUAN("元", "위안화", "yuan", "CNH"),
	YEN("¥", "일본 엔", "yen", "JPY(100)");
	
	private String symbol;
	private String korName;
	private String engName;
	private String unit;

	public static ExchangeRateName getExchangeRateName(String currencyName) {
		for (ExchangeRateName exchangeRateName : ExchangeRateName.values()) {
			if (exchangeRateName.engName.toUpperCase().equals(currencyName.toUpperCase())) {
				return exchangeRateName;
			}
		}
		return null;
	}
}
