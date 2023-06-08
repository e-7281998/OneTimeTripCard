package com.shinhan.OneTimeTripCard.vo;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.sun.istack.NotNull;

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
public class Delivery {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id; // pk
	
	@ManyToOne
	private UserCard userCard;
	
	@ManyToOne
	@JoinColumn(name = "delivery_node_id")
	@NotNull
	private DeliveryNode deliveryNode;
	private Integer quantity;
	private Integer extraCost; // default 0
	private Date deliveryDate; // default today
}
