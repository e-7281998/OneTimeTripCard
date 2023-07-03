package com.shinhan.OneTimeTripCard.service;

import com.shinhan.OneTimeTripCard.dto.PurchaseHistoryDTO;
import com.shinhan.OneTimeTripCard.repository.PurchaseRepository;
import com.shinhan.OneTimeTripCard.vo.Purchase;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PurchaseService {

    private final PurchaseRepository purchaseRepository;

    public List<PurchaseHistoryDTO> getChargeHistoryByMonth(Long userCardId, int year, int month) {
        YearMonth standard = YearMonth.of(year, month);
        LocalDateTime from = LocalDateTime.of(year, month, 1, 0, 0);
        LocalDateTime to = LocalDateTime.of(standard.atEndOfMonth(), LocalTime.of(23, 59, 59));
        List<Purchase> purchases = purchaseRepository.findByUserCard_IdAndCreatedAtBetween(userCardId, from, to);
        return convertToPurchaseHistoryDTO(purchases);
    }

    private List<PurchaseHistoryDTO> convertToPurchaseHistoryDTO(List<Purchase> purchases) {
        List<PurchaseHistoryDTO> purchaseHistories = new ArrayList<>();
        for (Purchase purchase : purchases) {
            purchaseHistories.add(PurchaseHistoryDTO.builder()
                            .id(purchase.getId())
                            .userCard(purchase.getUserCard())
                            .amount(purchase.getAmount())
                            .discount(purchase.getDiscount())
                            .store(purchase.getStore().getStoreName())
                            .createdAt(purchase.getCreatedAt())
                    .build());
        }
        return purchaseHistories;
    }
}
