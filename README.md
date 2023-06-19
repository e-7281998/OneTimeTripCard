"# OneTimeTripCard" 
"# OneTimeTripCard" 

# Spring Boot API

## User관련

### 회원가입
url : /user/signUp
method : post
data : User user
return : User(회원가입된 정보)

### 마이페이지 유저 정보
url : /user/userInfoGet/{userid}
method : get
return : User(userid와 일치하는 User)

### 마이페이지 유저 업데이트
url : /user/userInfoUpdate
method : put
data : User user(수정된 user)
return : 업데이트 된 User

## UserCard 관련

### 카드 구매
url : /user-card/purchase
method : post
data : UserCard userCard
return : UserCard(등록된 UserCard)


### 카드 구매 이력
url : /user-card/history/{userId}
method : get
return : List UserCard (userId를 가진 User가 구매한 카드 목록)
  
### 카드 등록
url : /user-card/register
method : post
data : map(userCard, cardNo, nickName, isDefault) 정보 포함
return : 등록 성공 여부

### 카드 삭제(비 활성화)
url : /user-card/delete/{userCardId}
method : delete
return : 카드 비 활성화 여부

### 잔액 이동(userCard to another userCard)
url : /user-card/transfer/user-cards
method : put
data : map(from(보내는 userCard의 id), to(받는 userCard의 id)) 정보 포함
return : 이동한 총 잔액

### 환불
url : /user-card/refund/{userCardId}
method : put
return : 환불 금액
