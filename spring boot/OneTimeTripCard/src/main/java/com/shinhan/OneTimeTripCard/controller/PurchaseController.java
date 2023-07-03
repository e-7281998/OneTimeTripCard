package com.shinhan.OneTimeTripCard.controller;

import com.shinhan.OneTimeTripCard.dto.PurchaseHistoryDTO;
import com.shinhan.OneTimeTripCard.service.PurchaseService;
import com.shinhan.OneTimeTripCard.vo.Purchase;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/purchase")
public class PurchaseController {

    private final PurchaseService purchaseService;

    @GetMapping("/getHistory/{userCardId}")
    public List<PurchaseHistoryDTO> getHistory(@PathVariable Long userCardId, @RequestParam int year, @RequestParam int month) {
        return purchaseService.getChargeHistoryByMonth(userCardId, year, month);
    }
}
