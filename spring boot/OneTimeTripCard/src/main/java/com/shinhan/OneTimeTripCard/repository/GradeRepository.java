package com.shinhan.OneTimeTripCard.repository;

import java.util.List;
import org.springframework.data.repository.CrudRepository;

import com.shinhan.OneTimeTripCard.vo.Grade;

public interface GradeRepository extends CrudRepository<Grade, Long>{

    public List<Grade> findAllByOrderByPriceAsc();
}
