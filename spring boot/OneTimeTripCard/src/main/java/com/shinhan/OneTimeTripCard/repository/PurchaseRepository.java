package com.shinhan.OneTimeTripCard.repository;

import com.shinhan.OneTimeTripCard.vo.Purchase;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.repository.CrudRepository;

public interface PurchaseRepository extends CrudRepository<Purchase, Long> {
    List<Purchase> findByUserCard_IdAndCreatedAtBetween(Long userCardId, LocalDateTime from, LocalDateTime to);
}
