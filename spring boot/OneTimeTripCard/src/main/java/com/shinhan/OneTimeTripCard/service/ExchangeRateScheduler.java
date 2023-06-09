package com.shinhan.OneTimeTripCard.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.scheduling.annotation.Scheduled;
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
	
	// 개장 시간 내 거래 1
	@Scheduled(cron = "0 * 9-15 * * 1-5") // 초 분 시간 일 월 요일 - 9시부터 3시까지 1분마다 실행
	public void saveRateOpeningHour1() throws IOException {
		saveTransferRate();
	}
	
	// 개장 시간 내 거래 2
	@Scheduled(cron = "0 0-30 15 * * 1-5") // 초 분 시간 일 월 요일 - 3시부터 3시30분까지 1분마다 실행
	public void saveRateOpeningHour2() throws IOException {
		saveTransferRate();
	}
	
	// 시간외 거래
	@Scheduled(cron = "0 0/30 4-6 * * 1-5") // 초 분 시간 일 월 요일 - 4시부터 6시까지 30분마다 실행
	public void saveRateAfterHours() throws IOException {
		saveTransferRate();
	}

	/**
	 * 한국 수출입 은행에서 환율 정보를 가져와 업데이트한다.
	 * 9시~3시30분 까지는 1분 간격으로 정보를 업데이트하고
	 * 4시~6시분 까지는 30분 간격으로 정보를 업데이트한다.
	 * @throws IOException
	 */
	public void saveTransferRate() throws IOException {
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
		
		// 응답데이터를 object mapper를 이용해 list화 한다.
		List<ExchangeRate> response = mapper.readValue(sb.toString(), new TypeReference<List<ExchangeRate>>() {});
		
		// 저장할 환율의 이름들만 리스트로 저장
		List<String> exchangeRateNames = Arrays.asList(ExchangeRateName.values()).stream().map(exchangeRateName -> exchangeRateName.getUnit()).collect(Collectors.toList());
		
		// list화 한 응답데이터를 저장할 대상만 필터링
		response = response.stream()
				.filter(exchangeRate -> exchangeRateNames.contains(exchangeRate.getCurUnit()))
				.collect(Collectors.toList());
		
		// 원래 저장되어 있던 데이터
		List<ExchangeRate> savedExchangeRates = (List<ExchangeRate>) exchangeRateRepository.findAll();
		Map<String, ExchangeRate> exchangeRates = new HashMap<>();
		
		// 응답 데이터 Map으로 변환 : response -> exchangeRates 
		for (ExchangeRate exchangeRate : response) {
			exchangeRates.put(exchangeRate.getCurUnit(), exchangeRate);
		}
		
		for (ExchangeRate savedExchangeRate : savedExchangeRates) {
			ExchangeRate exchangeRate = exchangeRates.get(savedExchangeRate.getCurUnit());
			savedExchangeRate.setDealBasRate(exchangeRate.getDealBasRate());
			savedExchangeRate.setTtb(exchangeRate.getTtb());
			savedExchangeRate.setTts(exchangeRate.getTts());
		}
		
		// 업데이트 된 데이터 저장
		exchangeRateRepository.saveAll(savedExchangeRates);
	}
}
