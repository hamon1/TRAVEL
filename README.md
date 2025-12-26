# 🌍 TravelBUDDY - 여행 계획 & 공유 iOS 앱

**React Native와 Firebase로 구현된 여행 계획 앱 TravelBUDDY는 친구와 함께 여행을 계획하고 관리할 수 있는 스마트한 방법을 제공합니다.**

## 📱 기능 소개

### 1️⃣ 홈 화면 (여행지 추천)

<div style="display: flex; justify-content: space-between;">
<img src="app_screen_shot/home.png" width="200"/>
<img src="app_screen_shot/home_tag.png" width="200"/>
</div>

사용자 위치 기반 추천: 현재 위치를 기준으로 주변의 여행지 목록을 확인할 수 있습니다.
태그 필터링: 여행지에는 다양한 태그(예: 관광 명소, 카페, 숙박, 식당, 캠핑장)가 포함되어 있으며, 태그별로 여행지를 필터링할 수 있습니다.

<img src="app_screen_shot/search_place.png" width="200"/>

검색 기능: 상단의 검색 버튼을 통해 특정 여행지를 찾아볼 수 있습니다.

### 2️⃣ 여행 계획 관리

<div style="display: flex; justify-content: space-between;">
<img src="app_screen_shot/plan.png" width="200"/>
<img src="app_screen_shot/plan_detail.png" width="200"/>
</div>

나의 여행 계획: 사용자가 생성한 여행 목록을 확인할 수 있습니다.

<img src="app_screen_shot/plan_add_user.png" width="200"/>

초대받은 여행: 친구가 초대한 여행 계획을 한눈에 확인할 수 있습니다.
*(초대받은 사용자는 읽기만 가능합니다.)*

### 3️⃣ 여행 일정 구성

<img src="app_screen_shot/edit_plan.png" width="200"/>

장소 추가: 여행지를 검색해 여행 일정에 추가할 수 있습니다.
카테고리별 구성:
- *여행지*
- *이동수단*
- *숙소*
- *식당*

날짜별 정렬: 여행 일정이 날짜 순으로 자동 정렬됩니다.

### 4️⃣ 채팅 기능

<img src="app_screen_shot/chat.png" width="200"/>

그룹 채팅: 여행에 참여 중인 사람들과 실시간으로 소통할 수 있습니다.
1:1 채팅: 개별 채팅을 통해 더 깊은 소통이 가능합니다.

<div style="display: flex; justify-content: space-between;">
<img src="app_screen_shot/profile.png" width="200"/>
<img src="app_screen_shot/friend.png" width="200"/>
</div>

## 🛠️ 기술 스택

프론트엔드
React Native *(ios)*

백엔드 및 데이터베이스
Firebase

API *(Google Places API)*

## 📂 파일 구조

/src/components/: UI의 일관성과 재사용성을 위해 분리된 공통 컴포넌트 (입력창, 일정 상세 버튼 등)

/src/pages/: 서비스의 핵심 기능을 담당하는 메인 스크린 (Home, Chat, FriendsList 등)

/src/context/: Context API를 활용하여 검색 상태 및 사용자 데이터를 전역적으로 관리

/src/lib/: Firebase SDK 연동을 모듈화하여 인증(Auth) 및 DB(Firestore) 로직을 분리 관리

/src/utils/: 사용자 권한 체크 및 데이터 정렬 등 독립적인 비즈니스 로직 처리

src/welcome/: 앱 온보딩 및 초기 진입 프로세스

## ⚙️ function

Navigation: react-navigation/bottom-tab,react-navigation/stack 을 사용한 화면 전환

OptimizedFlatList: 대규모 여행지 리스트 랜더링 시 메모리 효율을 위해 FlatList 대신 OptimizedFlatList를 사하여 렝더링 제한 

Google Maps/Places API 기반 데이터 서비스: 사용자의 실시간 좌표(경도, 위도)를 기반으로 인근 여행지 데이터를 우선 노출하여, 앱 실행과 동시에 주변의 유용한 정보를 즉시 탐색. 키워드 태그를 통해 필터링, 검색 기능을 통해 사용자가 원하는 장소를 빠르게 찾을 수 있도록 기능 추가
