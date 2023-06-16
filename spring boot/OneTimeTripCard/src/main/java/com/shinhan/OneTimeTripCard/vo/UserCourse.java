package com.shinhan.OneTimeTripCard.vo;

import java.sql.Date;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
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
@AllArgsConstructor
@NoArgsConstructor
@Table
@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class UserCourse {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id; // pk
	@ManyToOne
	@NotNull
	private User user; // user id
	@ManyToOne
	@NotNull
	@JsonUnwrapped
	private Course course; // course id
	private Date createdAt; // 코스 생성 날짜
	private Boolean completed; // Y / N

}
