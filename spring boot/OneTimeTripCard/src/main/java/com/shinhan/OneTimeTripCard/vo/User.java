package com.shinhan.OneTimeTripCard.vo;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

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
@Table(name = "users")
@Entity
public class User {
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

}