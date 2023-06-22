package com.shinhan.OneTimeTripCard.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shinhan.OneTimeTripCard.service.NSplitService;
import com.shinhan.OneTimeTripCard.vo.NSplit;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/split")
public class NSplitController {
	
	private final NSplitService nSplitService;
	
	@GetMapping("/history/{travelWithId}")
	public List<NSplit> getSplitHistories(@PathVariable Long travelWithId) {
		return nSplitService.getSplitHistories(travelWithId);
	}
}
