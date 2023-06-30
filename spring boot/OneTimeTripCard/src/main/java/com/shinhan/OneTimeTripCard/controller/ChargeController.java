package com.shinhan.OneTimeTripCard.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.shinhan.OneTimeTripCard.service.ChargeService;
import com.shinhan.OneTimeTripCard.vo.Charge;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/charge")
public class ChargeController {

    private final ChargeService chargeService;

    @PostMapping
    public Charge charge(@RequestBody Charge charge) {
        return chargeService.charge(charge);
    }

    @GetMapping("/getHistory/{userCardId}") // getMapping이기 때문에 RequestBody가 아니라, Requestparam or pathvariable사용
    public List<Charge> getHistory(@PathVariable Long userCardId, @RequestParam int year, @RequestParam int month) {
         return chargeService.getChargeHistoryByMonth(userCardId, year, month);
    }
    
    @PostMapping("/travelWith")
    public List<Charge> chargeTravelWith(@RequestBody Charge charge) {
    	Long travelWithId = charge.getUserCard().getTravelWithId();
    	return chargeService.chargeTravelWithCard(charge, travelWithId);
    }
}
