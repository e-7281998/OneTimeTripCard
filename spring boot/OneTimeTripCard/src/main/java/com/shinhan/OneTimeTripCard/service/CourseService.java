package com.shinhan.OneTimeTripCard.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.shinhan.OneTimeTripCard.repository.CourseRepository;
import com.shinhan.OneTimeTripCard.vo.Course;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CourseService {
	private final CourseRepository courseRepository;
	
	public List<Course> findAll(){
		return (List<Course>) courseRepository.findAll();
	}
}
