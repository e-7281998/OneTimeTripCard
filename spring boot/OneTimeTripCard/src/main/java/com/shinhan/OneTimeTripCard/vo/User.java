package com.shinhan.OneTimeTripCard.vo;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString(exclude = {"userCards","userCourses","stamps"})
@Builder
@AllArgsConstructor
@NoArgsConstructor  
@Table(name = "users")
@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class User implements Serializable{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;  
	private String email; 
	private String firstName;
	private String lastName;
	private String password; 
	private String phone; 
	private String preferredCurrency;		//현재환율
	private Boolean status;				//사용중 Y 탈퇴 N
	private String accountNo;				//충전용 자국 계좌 번호
	private String bankName;				//충전용 자국 계좌 이름
	
	@JsonIgnore
	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
	private List<UserCard> userCards;
	
	@JsonIgnore
	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
	private List<UserCourse> userCourses;
	
	@JsonIgnore
	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
	private List<Stamp> stamps;
}