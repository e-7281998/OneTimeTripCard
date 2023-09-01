## 1️⃣소개 ⭐ [PPT](https://drive.google.com/file/d/1G3BwKYgM8mg6acMkOHJ9n0UD0YM70fPl/view?usp=sharing) 
One Time Trip Card는 한국을 관광하는 외국인 관광객들을 대상으로 발급해주는 일회용 여행 카드입니다.

## 2️⃣개요
해외 여행을 할 때 현금을 들고 다니느라 불편함을 겪는 분들이 많습니다. Master 카드나 Visa 카드와 같이 전 세계에서 통용되는 카드가 있지만, 
수수료 때문에 막상 여행 전에 환전하고 현금을 소지하고 여행하시는 분들도 많습니다.

현금 없는 버스, 배달 앱에서의 비대면 카드 결제, 카카오 택시 등 한국에서 점점 현금 사용이 줄어들고 있는 만큼, 
외국인 관광객들도 편하게 사용할 수 있는 카드를 제공해주기 위해 프로젝트를 진행하게 되었습니다.

신용도와 상관이 없어 카드사에서 리스크를 질 필요 없고, 구매 과정을 간편화 하기 위해 선불 카드 방식을 채택하였습니다.

## 3️⃣기술
### Environment
<img alt="eclipse" src ="https://img.shields.io/badge/Eclipse-525C86.svg?&style=for-the-badge&logo=eclipseide&logoColor=white"/> <img alt="github" src ="https://img.shields.io/badge/github-181717.svg?&style=for-the-badge&logo=github&logoColor=white"/>
<img alt="git" src ="https://img.shields.io/badge/git-F05032.svg?&style=for-the-badge&logo=git&logoColor=white"/>

### Development
<img alt="Java" src ="https://img.shields.io/badge/Java-007396.svg?&style=for-the-badge&logo=Java&logoColor=white"/> <img alt="JavaScript" src ="https://img.shields.io/badge/JavaScript-black.svg?&style=for-the-badge&logo=javascript&logoColor=FFFF33"/> <img alt="Spring Framework" src ="https://img.shields.io/badge/spring-6DB33F.svg?&style=for-the-badge&logo=spring&logoColor=white"/> <img alt="Spring Boot" src ="https://img.shields.io/badge/spring%20boot-6DB33F.svg?&style=for-the-badge&logo=springboot&logoColor=white"/> <img alt="react" src ="https://img.shields.io/badge/react-61DAFB.svg?&style=for-the-badge&logo=react&logoColor=black"/> <img alt="oracle" src ="https://img.shields.io/badge/oracle-F80000.svg?&style=for-the-badge&logo=oracle&logoColor=white"/>

### Communication
<img alt="slack" src ="https://img.shields.io/badge/slack-4A154B.svg?&style=for-the-badge&logo=slack&logoColor=white"/>

## 4️⃣기능
### OneTimeTripCard
![Argon Design System React by Creative Tim - Chrome 2023-08-05 17-11-33](https://github.com/OneTimeGroup/OneTimeTripCard/assets/89973303/c9c9787e-8cab-4915-b801-1258709028c9)

### 기본 기능
* 카드 발급
* 금액 충전
* 잔액 환불
* 다른 카드로 금액 이동

### 모임 카드 기능
* 카드 발급
* 멤버 초대
* 멤버 내보내기
* 1/N 정산하기

### 카드 발급 방법
+ 온라인에서 미리 카드를 결제하고
+ 편의점, 대형 할인마트, 공항 등과 같이 접근성이 쉬운 곳에서 실물 카드를 구매해
+ 온라인에서 연동하는 방식을 사용하였습니다.

### 충전 방식
한국 수출입 은행에서 제공하는 환율 API를 Scheduler를 활용하여 개장 시간 동안 1분 단위의 환율을 업데이트합니다.
이를 활용해 본인의 국가에서 사용하는 화폐 단위에 맞게 온라인에서 간단하게 충전할 수 있습니다.

### 여행
Kakao 지도 API를 통해 여행 경로를 구현했습니다.

## 5️⃣ 팀
|[ehopaak](https://github.com/ehopaak)|[junbeom-Son](https://github.com/junbeom-Son)|[leessol](https://github.com/leessol)|[e-7281998](https://github.com/e-7281998)|
|---|---|---|---|
|<img src="https://github.com/OneTimeGroup/OneTimeTripCard/assets/89973303/331e39cf-d004-4310-901a-f13f8c6e90f8" width="150" height="200">|<img src="https://github.com/OneTimeGroup/OneTimeTripCard/assets/89973303/af74cfa3-637d-4224-b98d-dcaa5a8bbcb6" width="150" height="200">|<img src="https://github.com/OneTimeGroup/OneTimeTripCard/assets/89973303/331f813e-46ec-4445-927c-de7aff5a772c" width="150" height="200">|<img src="https://github.com/OneTimeGroup/OneTimeTripCard/assets/89973303/caf1f71d-78cf-44ef-b7c3-34a819beb64e" width="150" height="200">|


