package com.shinhan.OneTimeTripCard.repository;

import org.springframework.data.repository.CrudRepository;

import com.shinhan.OneTimeTripCard.vo.Card;

public interface CardRepository extends CrudRepository<Card, String> {

}
