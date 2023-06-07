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
public class DeliveryNode {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id; //pk
	private String node_name;
	private String address;
	private String phone;
	private String opening_time;
	private String closing_time;
	private Integer max_quantity;
	private Character is_departure; // Y : 출발지, N : 도착지

}