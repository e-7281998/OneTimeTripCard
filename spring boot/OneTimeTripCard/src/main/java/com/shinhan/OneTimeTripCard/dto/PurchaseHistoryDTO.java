package com.shinhan.OneTimeTripCard.dto;

import com.shinhan.OneTimeTripCard.vo.UserCard;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class PurchaseHistoryDTO {
    private Long id;
    private UserCard userCard;
    private Integer amount;
    private Integer discount;
    private String store;
    private LocalDateTime createdAt;
}
