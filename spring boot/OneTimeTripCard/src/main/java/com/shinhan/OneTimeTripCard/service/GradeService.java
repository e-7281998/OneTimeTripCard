package com.shinhan.OneTimeTripCard.service;

import java.util.List;

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
	
	public List<Grade> getAllGrades() {
		return (List<Grade>) gradeRepository.findAll();
	}
}
