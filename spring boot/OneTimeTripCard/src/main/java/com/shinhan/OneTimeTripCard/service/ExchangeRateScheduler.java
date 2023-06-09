package com.shinhan.OneTimeTripCard.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.shinhan.OneTimeTripCard.repository.ExchangeRateRepository;
import com.shinhan.OneTimeTripCard.vo.ExchangeRate;
import com.shinhan.OneTimeTripCard.vo.ExchangeRateName;

import lombok.RequiredArgsConstructor;

/**
 * 한국 수출입 은행에 환율 정보를 요청하는 서비스
 * 주기적으로 API를 호출하고, 프로그램 내에서 이 서비스에 호출하지 않는 서비스
 * @author User
 *
 */
@Service
@RequiredArgsConstructor
public class ExchangeRateScheduler {
	
	private final ExchangeRateRepository exchangeRateRepository;

//	@Scheduled
	public void saveRateOpeningHour() throws IOException {
		StringBuffer sb = new StringBuffer();
		StringBuilder urlBuilder = new StringBuilder("https://www.koreaexim.go.kr/site/program/financial/exchangeJSON");
		urlBuilder.append("?authkey=cIq87G69re5oumha5iTrIicToXHxHnqr");
		urlBuilder.append("&data=AP01");

		URL url = new URL(urlBuilder.toString());
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();

		// Request 형식 설정
		conn.setRequestMethod("GET");
		conn.setRequestProperty("Content-Type", "application/json");

		// 응답 데이터 받아오기
		BufferedReader rd;
		if (conn.getResponseCode() >= 200 & conn.getResponseCode() <= 300) {
			rd = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
		} else {
			rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
		}
		String line;
		while ((line = rd.readLine()) != null) {
			sb.append(line);
		}
		rd.close();
		conn.disconnect();
			
		ObjectMapper mapper = new ObjectMapper();
		
		List<ExchangeRate> exchangeRates = mapper.readValue(sb.toString(), new TypeReference<List<ExchangeRate>>() {});
		List<String> exchangeRateNames = Arrays.asList(ExchangeRateName.values()).stream().map(exchangeRateName -> exchangeRateName.getUnit()).collect(Collectors.toList());
		exchangeRates = exchangeRates.stream()
				.filter(exchangeRate -> exchangeRateNames.contains(exchangeRate.getCurUnit()))
				.collect(Collectors.toList());
		
		exchangeRateRepository.saveAll(exchangeRates);
	}
}
