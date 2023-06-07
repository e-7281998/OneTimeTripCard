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
public class Stamp {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private User user;  
	private CourseNode courseNode; 
	private Store store;
}
