package com.shinhan.OneTimeTripCard.vo;

public class User {
	Long id;  
	char email; 
	char first_name;
	char last_name;
	char password; 
	char phone; 
	char preferred_currency;	//현재환율
	Boolean status;		//사용중 Y 탈퇴 N
	char account_no;	//충전용 자국 계좌 번호
	char bank_name;		//충전용 자국 계좌 이름

}
