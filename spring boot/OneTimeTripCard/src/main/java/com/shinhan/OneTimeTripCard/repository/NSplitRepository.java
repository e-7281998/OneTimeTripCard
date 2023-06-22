package com.shinhan.OneTimeTripCard.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.shinhan.OneTimeTripCard.vo.NSplit;

public interface NSplitRepository extends CrudRepository<NSplit, Long>{

	List<NSplit> findAllByTravelWithId(Long travelWithId);
}
