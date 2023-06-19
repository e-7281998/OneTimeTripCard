package com.shinhan.OneTimeTripCard.exchangeRate;

import java.io.IOException;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.shinhan.OneTimeTripCard.service.ExchangeRateScheduler;

@SpringBootTest
public class ExchangeRateTest {

	@Autowired
	ExchangeRateScheduler exchangeRateScheduler;
	
//	@Test
	void callTheAPI() {
//		try {
////			exchangeRateScheduler.saveRateOpeningHour();
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
	}
}
