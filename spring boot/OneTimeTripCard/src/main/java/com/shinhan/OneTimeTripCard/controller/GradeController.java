package com.shinhan.OneTimeTripCard.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shinhan.OneTimeTripCard.service.GradeService;
import com.shinhan.OneTimeTripCard.vo.Grade;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/grade")
public class GradeController {
	
	private final GradeService gradeService;
	
	@GetMapping("/getAll")
	public List<Grade> getAllGrades() {
		return gradeService.getAllGrades();
	}
	
	@GetMapping("/getGradeById/{gradeid}")
	public Grade getGradeById(@PathVariable Long gradeid) {
		return gradeService.getGradeById(gradeid);
	}
}
