# 📌 5주차 프로젝트[Project1]

## 필수 프로젝트

- 프로젝트 기한
  - 프로젝트 수행 기간 : 2023년 6월 27일(화) ~ 2023년 7월 6일(목)
  - 멘티 코드 리뷰 기간 : 2023년 7월 7일(금) ~ 2023년 7월 10일(월)
  - 멘토 코드 리뷰 기간 : 2023년 7월 7일(금) ~ 2023년 7월 13일(목)
  - 코드 리뷰 반영 기간 : 2023년 7월 14일(금) ~ 2023년 7월 17일(월)
- 내용
  - [[Day 19] 노션 클로닝 요구사항](https://school.programmers.co.kr/app/courses/17516/curriculum/lessons/196456#part-46365)을 확인해 주세요.

# 구현내용

## App 페이지

라우트로 SPA 동작을 담당한다.

Document List와 Document Content 의 연결을 담당한다.

- [ ] Document List 클릭 시 Documnet Content 를 호출한다.

## Document List 페이지

Root Document 리스트를 호출하여 출력하고, 해당 도큐먼트들의 하위 리스트들을 관리한다.

### 기본 구현

- [ ] DocumentList Page 를 생성한다.

- [ ] DocumentList 컴포넌트를 생성한다.
  - [ ] li 태그 안에 + 토글 버튼과 > 토글 버튼을 생성한다.
  - [ ] li 태그 안에 Document 의 제목을 출력한다.
  - [ ] 토글 버튼이 아닌 제목을 클릭하면 해당 페이지를 렌더링 한다. 

## Document Content 페이지

어떤 이벤트에 의해 해당 도큐먼트의 내용을 그린다.

### 기본 구현

- [ ] DocumentConent Page 를 생성한다.
- [ ] DocumentContent Component 를 생성한다.
  - [ ] 제목을 출력한다.
  - [ ] 본문을 출력한다.