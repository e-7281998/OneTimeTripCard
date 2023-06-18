package com.shinhan.OneTimeTripCard.repository;


import com.shinhan.OneTimeTripCard.vo.Charge;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.repository.CrudRepository;

public interface ChargeRepository extends CrudRepository<Charge, Long> {
    List<Charge> findByUserCard_IdAndCreatedAtBetween(Long userCardId, LocalDateTime from, LocalDateTime to);
}
