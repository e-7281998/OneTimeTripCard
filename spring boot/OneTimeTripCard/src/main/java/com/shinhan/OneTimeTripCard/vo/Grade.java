package com.shinhan.OneTimeTripCard.vo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Grade {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;					//pk
	private String gradeName; 
	private Integer price; 
	private Integer period; 
	private Double refundRate;
	private Integer benefitCount;
	private String imgSrc;
	private Integer maxRechargeCount; 	// 재충전 가능 횟수
	private Integer deliveryCount;		// 무료 수화물 횟수(골드, 다이아만)
 }