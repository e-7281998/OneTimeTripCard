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
import com.shinhan.OneTimeTripCard.service.CourseNodeService;
import com.shinhan.OneTimeTripCard.service.CourseService;
import com.shinhan.OneTimeTripCard.service.StoreService;
import com.shinhan.OneTimeTripCard.vo.Course;
import com.shinhan.OneTimeTripCard.vo.CourseNode;
import com.shinhan.OneTimeTripCard.vo.Store;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/trip")
public class TripController {
	
//	private final TripService tripService;
	
	private final CourseService courseService;
//	private final CourseNodeService courseNodeService;
//	private final StoreService storeService;
	
//
//	@Autowired
//	CourseRepository courseRepo; 
//	
//	@Autowired
//	CourseNodeRepository nodeRepo;
//	
//	@Autowired
//	StoreRepository storeRepo;
	
	@GetMapping("/course")
	public List<Course> getCourseInfo() { 
		return courseService.findAll();
//		List<Course> courseList = (List<Course>) courseRepo.findAll(); 
//		 
//		return courseList;
	}
//	
//	@GetMapping("/node")
//	public List<CourseNode> getCourseNodeInfo() { 
//		return  courseNodeService.findAll();
////		List<CourseNode> nodeList = (List<CourseNode>) nodeRepo.findAll(); 
////		return nodeList;
//	}
	
//	@GetMapping("/store")
//	public List<Store> getCourseStoreInfo() { 
//		return storeService.findAll();
////		List<Store> storeList = (List<Store>) storeRepo.findAll(); 
////		 
////		return storeList;
//	}
}
