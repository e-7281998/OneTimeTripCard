package com.shinhan.OneTimeTripCard.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.shinhan.OneTimeTripCard.repository.StoreRepository;
import com.shinhan.OneTimeTripCard.vo.Store;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class StoreService {
	private final StoreRepository storeRepository;
	
	public List<Store> findAll(){
		return (List<Store>) storeRepository.findAll();
	}
}
