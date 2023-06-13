package com.shinhan.OneTimeTripCard.controller;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shinhan.OneTimeTripCard.service.BenefitService;
import com.shinhan.OneTimeTripCard.vo.Benefit;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/benefit")
public class BenefitController {
	
	private final BenefitService benefitService;
	
	public List<Benefit> findAll() {
		return benefitService.findAll();
	}
}
