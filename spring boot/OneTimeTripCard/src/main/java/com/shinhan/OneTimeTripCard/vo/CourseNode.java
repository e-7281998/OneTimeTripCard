package com.shinhan.OneTimeTripCard.vo;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

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
public class CourseNode {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id; //pk
	private String nodeName;
	@ManyToOne
	@NotNull
	private Course course;
	
	@OneToMany(mappedBy = "courseNode", fetch = FetchType.LAZY)
	private List<Store> stores;
	
	private Double latitude; // 위도
	private Double longitude; // 경도
}