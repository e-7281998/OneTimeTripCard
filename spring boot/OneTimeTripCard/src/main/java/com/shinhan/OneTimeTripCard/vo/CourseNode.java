package com.shinhan.OneTimeTripCard.vo;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonUnwrapped;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
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
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class CourseNode {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id; //pk
	private String nodeName;
	@ManyToOne
	@NotNull
//	@JsonUnwrapped
	private Course course;
	
	@JsonIgnore
	@OneToMany(mappedBy = "courseNode", fetch = FetchType.EAGER)
	@JsonUnwrapped
	private List<Store> stores;
	
	private Double latitude; // 위도
	private Double longitude; // 경도
}