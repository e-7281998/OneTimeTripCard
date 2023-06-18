package com.shinhan.OneTimeTripCard.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.shinhan.OneTimeTripCard.service.ChargeService;
import com.shinhan.OneTimeTripCard.vo.Charge;
import com.shinhan.OneTimeTripCard.vo.UserCard;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/charge")
public class ChargeController {

    private final ChargeService chargeService;

    public Charge charge(@RequestBody Charge charge) {
        return chargeService.charge(charge);
    }

    @GetMapping("/getHistory/{userCardId}") // getMapping이기 때문에 RequestBody가 아니라, Requestparam or pathvariable사용
    public List<Charge> getHistory(@PathVariable Long userCardId, @RequestParam int year, @RequestParam int month) {
        return chargeService.getChargeHistoryByMonth(userCardId, year, month);
    }
}
