package com.shinhan.OneTimeTripCard.service;

import com.shinhan.OneTimeTripCard.repository.PurchaseRepository;
import com.shinhan.OneTimeTripCard.vo.Purchase;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.YearMonth;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PurchaseService {

    private final PurchaseRepository purchaseRepository;

    public List<Purchase> getChargeHistoryByMonth(Long userCardId, int year, int month) {
        YearMonth standard = YearMonth.of(year, month);
        LocalDateTime from = LocalDateTime.of(year, month, 1, 0, 0);
        LocalDateTime to = LocalDateTime.of(standard.atEndOfMonth(), LocalTime.of(23, 59, 59));
        return purchaseRepository.findByUserCard_IdAndCreatedAtBetween(userCardId, from, to);
    }

}
