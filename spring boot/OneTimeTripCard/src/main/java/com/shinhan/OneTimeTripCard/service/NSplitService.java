package com.shinhan.OneTimeTripCard.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.shinhan.OneTimeTripCard.repository.NSplitRepository;
import com.shinhan.OneTimeTripCard.vo.NSplit;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NSplitService {
	
	private final NSplitRepository nSplitRepository;
	
	public List<NSplit> saveAll(List<NSplit> splits) {
		return (List<NSplit>) nSplitRepository.saveAll(splits);
	}
	
	public List<NSplit> getSplitHistories(Long travelWithId) {
		return nSplitRepository.findAllByTravelWithId(travelWithId);
	}
}
