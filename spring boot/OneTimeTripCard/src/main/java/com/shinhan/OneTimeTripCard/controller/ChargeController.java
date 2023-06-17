package com.shinhan.OneTimeTripCard.controller;

import com.shinhan.OneTimeTripCard.service.ChargeService;
import com.shinhan.OneTimeTripCard.vo.Charge;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/charge")
public class ChargeController {

    private final ChargeService chargeService;

    public Charge charge(@RequestBody Charge charge) {
        return chargeService.charge(charge);
    }
}
