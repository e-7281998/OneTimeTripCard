package com.shinhan.OneTimeTripCard.service;

import org.springframework.stereotype.Service;

import com.shinhan.OneTimeTripCard.repository.GradeRepository;
import com.shinhan.OneTimeTripCard.vo.Grade;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class GradeService {

	private final GradeRepository gradeRepository;
	
	public Grade findById(Long id) {
		return gradeRepository.findById(id).orElse(null);
	}
}
