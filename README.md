"# OneTimeTripCard" 
"# OneTimeTripCard" 

# Spring Boot API

## User
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

## UserCard
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

## Login
### Login
url : /login  
method : post  
data : User user(로그인을 시도하는 user의 이메일, password)  
return : User user(로그인을 시도한 user)  

### 회원가입
url : /login/sign-up  
method : post  
data : User user(회원가입 정보 입력된 user)  
return : User user(회원가입 된 user)  

### 이메일 찾기
url : /login/find-email  
method : post  
data : User user(firstname, lastname, phone 정보로 만들어진 user)  
return : List String emails by 입력된 정보  

### 비밀번호 찾기
url : /login/find-password  
method : post  
data : User user(email, phone정보로 만들어진 user)  
return : User user  

## 환율
### 충전 환율 정보 조회
url : /exchange-rate/charge  
method : get  
param : String currencyName 통화 이름  
return : Double 충전 시 적용되는 환율  

### 환불 환율 정보 조회
url : /exchange-rate/return  
method : get  
param : String currenctName 통화 이름  
return : Double 환불 시 적용되는 환율  

## TravelWith(그룹 여행 카드)
### TravelWith 카드 등록
url : /travel-with/register  
method : post  
data : map (managerId, nickName, List emails, isDefault) 포함  
return : manager의 UserCard(email들로 구해진 유저들 각각 같은 카드가 등록 된다. return때 manager아이디만)  

### 유저별 TravelWith 카드 리스트 조회
url : /travel-with/getAll/{userId}  
method : get  
return : List UserCard  

## 충전
### 충전
url : /charge  
method : post  
data : Charge charge  
return : Charge charge(충전된 정보)  

### 유저카드 별 충전 내역(월별)
url : /charge/getHistory/{userCardId}  
method : get  
param : year, month  
return : List Charge  

## 혜택
### 모든 혜택 조회
url : /benefit/getAll  
method : get  
return : List Benefit  

## 등급
### 모든 등급 조회
url : /grade/getAll  
method : get  
return : List Grade  

### 아이디 기반 등급 조회
url : /grade/getGradeById/{gradeId}
method : get
return : Grade
