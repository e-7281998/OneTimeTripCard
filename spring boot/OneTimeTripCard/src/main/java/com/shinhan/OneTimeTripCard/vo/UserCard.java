package com.shinhan.OneTimeTripCard.vo;

import java.time.LocalDateTime;


public class UserCard {
	Long user_id;
	char card_no;	//카드넘버
	Long manager_id;  // nullable 모임 통장일 때만
	char nickname;  // 카드별칭
	char level;  // 카드등급
	Integer balance;  // 카드잔액
	Integer discount_amount;  // 받은 혜택 총액
	Integer recharge_count;  // 재 충전 횟수
	Boolean status; // 카드 삭제 여부 Y, N
	LocalDateTime create_at;	//카드 생성날짜
	LocalDateTime expired_at;	//만료날짜
	Boolean is_group; // Y, N
	// 모임통장 삭제시 활성화된 user_card 주인들의
	// status를 전부 비활성화 시켜준다.
	Boolean isDefault; // Y, N 기본카드

}
