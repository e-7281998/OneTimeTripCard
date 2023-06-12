package com.shinhan.OneTimeTripCard.vo;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString(exclude = "courseNode")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table
@Entity
public class Store {
	@Id
	private String no; // 가맹점번호
	private String storeName; // 가맹점이름

	@ManyToOne
	private CourseNode courseNode; // 코스에 포함되지 않는 가맹점 -> null
	
	@OneToMany(mappedBy = "store", fetch = FetchType.LAZY)
	private List<Purchase> purchases;

	private Double latitude; // 위도
	private Double longitude; // 경도
}