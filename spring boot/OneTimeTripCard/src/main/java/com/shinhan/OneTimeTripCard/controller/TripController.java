package com.shinhan.OneTimeTripCard.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shinhan.OneTimeTripCard.repository.CourseNodeRepository;
import com.shinhan.OneTimeTripCard.repository.CourseRepository;
import com.shinhan.OneTimeTripCard.repository.StoreRepository;
import com.shinhan.OneTimeTripCard.vo.Course;
import com.shinhan.OneTimeTripCard.vo.CourseNode;
import com.shinhan.OneTimeTripCard.vo.Store;

@RestController
@RequestMapping("/trip")
public class TripController {

	@Autowired
	CourseRepository courseRepo; 
	
	@Autowired
	CourseNodeRepository nodeRepo;
	
	@Autowired
	StoreRepository storeRepo;
	
	@GetMapping("/course")
	public List<Course> getCourseInfo() { 
		List<Course> courseList = (List<Course>) courseRepo.findAll(); 
		 
		return courseList;
	}
	
	@GetMapping("/node")
	public List<CourseNode> getCourseNodeInfo() { 
		List<CourseNode> nodeList = (List<CourseNode>) nodeRepo.findAll(); 
		 
		return nodeList;
	}
	
	@GetMapping("/store")
	public List<Store> getCourseStoreInfo() { 
		List<Store> storeList = (List<Store>) storeRepo.findAll(); 
		 
		return storeList;
	}
}
