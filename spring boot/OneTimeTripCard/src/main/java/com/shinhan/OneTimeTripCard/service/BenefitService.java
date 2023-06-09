package com.shinhan.OneTimeTripCard.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.shinhan.OneTimeTripCard.repository.BenefitRepository;
import com.shinhan.OneTimeTripCard.vo.Benefit;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class BenefitService {

	private final BenefitRepository benefitRepository;
	
	public List<Benefit> findAll() {
		return (List<Benefit>) benefitRepository.findAll();
	}
}
