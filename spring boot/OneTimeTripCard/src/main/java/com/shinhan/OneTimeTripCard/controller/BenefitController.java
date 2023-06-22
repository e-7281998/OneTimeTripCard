package com.shinhan.OneTimeTripCard.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	
	
	
	@GetMapping("/getAll")
	public List<Benefit> findAll() {
		return benefitService.findAll();
	}
	
	@PutMapping("/insertBenefits")
	public void insertBenefits(@RequestBody List<Benefit> benefit) {
		benefitService.insertBenefits(benefit);
	}
}
