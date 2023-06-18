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
	
	public Grade getGradeById(Long id) {
		return gradeRepository.findById(id).orElse(null);
	}

	/**
	 * 등급 이름을 입력받고, 한 등급 높은 등급 리턴
	 * 1. 0 ~ 마지막 - 1번째의 등급을 순회하며 이름 비교
	 * 2. 이름이 동일하면, i + 1번째의 등급 리턴
	 * 3. 끝까지 동일한 이름이 없으면, null 리턴
	 * @param grade
	 * @return
	 */
	public Grade getNextGrade(String grade) {
		List<Grade> grades = getAllGradesOrderInOrder();
		for (int i = 0; i < grades.size() - 1; ++i) {
			if (grade.equals(grades.get(i).getGradeName())) {
				return grades.get(i + 1);
			}
		}
		return null;
	}

	private List<Grade> getAllGradesOrderInOrder() {
		return gradeRepository.findAllOrderByPrice();
	}
}
