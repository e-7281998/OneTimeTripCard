package com.shinhan.OneTimeTripCard.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.shinhan.OneTimeTripCard.repository.CourseNodeRepository;
import com.shinhan.OneTimeTripCard.vo.CourseNode;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CourseNodeService {
	private final CourseNodeRepository courseNodeRepository;
	
	public List<CourseNode> findAll(){
		return (List<CourseNode>) courseNodeRepository.findAll();
	}
}
