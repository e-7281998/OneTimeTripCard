package com.shinhan.OneTimeTripCard.vo;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

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
public class Course {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id; //  pk
	private String courseName;
	private String location;
	private Double latitude; // 위도
	private Double longitude; // 경도
	@OneToMany(mappedBy = "course", fetch = FetchType.LAZY)
	private List<CourseNode> courseNodes;
}