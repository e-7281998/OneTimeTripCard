package com.shinhan.OneTimeTripCard.exchangeRate;

import java.io.IOException;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.shinhan.OneTimeTripCard.service.ExchangeRateScheduler;
import com.shinhan.OneTimeTripCard.service.ExchangeRateService;

@SpringBootTest
public class ExchangeRateTest {

	@Autowired
	ExchangeRateScheduler exchangeRateScheduler;
	
	@Autowired
	ExchangeRateService exchangeRateService;
	
//	@Test
	void callTheAPI() {
//		try {
////			exchangeRateScheduler.saveRateOpeningHour();
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
	}
	
	@Test
	void exchangeRateTest() {
		String [] names = { "dollar", "euro", "yuan", "yen" };
		double [] exchangeRateToCharge = new double[names.length];
		double [] exchangeRateToReturn = new double[names.length];
		for (int i = 0; i < names.length; ++i) {
			exchangeRateToCharge[i] = exchangeRateService.getExchangeRate(names[i], true);
			exchangeRateToReturn[i] = exchangeRateService.getExchangeRate(names[i], false);
		}
		for (int i = 0; i < names.length; ++i) {
			Assertions.assertThat(exchangeRateService.getExchangeRate(names[i], true)).isEqualTo(exchangeRateToCharge[i]);
			Assertions.assertThat(exchangeRateService.getExchangeRate(names[i], false)).isEqualTo(exchangeRateToReturn[i]);
		}
	}
}
