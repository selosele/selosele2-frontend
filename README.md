# 개인블로그 리뉴얼 프로젝트 (Frontend)

## 기본 정보

- 작업기간 : 2022.09.10. ~
- 어플리케이션 명 : selosele2
- Backend : Nest.js
- Frontend : Vue
- DBMS : MariaDB (& TypeORM)
- Port: 8080
- 프론트엔드 구동 : ```npm run serve``` &rarr; ```npm run sass:watch```
- 프론트엔드 빌드 : ```npm run build```
- [Backend 저장소](https://github.com/selosele/selosele2-backend)
- [AS-IS 저장소](https://github.com/selosele/devblog)

## 라이브러리 및 기술

- **[진행중]** Vue 디렉터리 구조 유명 사례 적용
- **[완료]** Vue 상태관리 라이브러리 Vuex 적용
  - Pinia는 다음 기회에..
- **[완료]** SCSS 적용
- **[완료 -> 2022.09.17. 보류]** Prettier 적용
- **[완료]** Angular의 HttpClient를 Axios 기반으로 만들어보기
  - main.js에 ```app.config.globalProperties.$http = axios;``` 해놓고 컴포넌트에서 ```this.$http```로 바로 axios 호출해도 됨(단, Vue 전역변수는 ```.vue``` 파일에서만 접근 가능).
  - ```store.js```에 axios 쓴 부분에 ```api/**``` 이거 URL 매핑 안되면 HttpClient랑 service 원복
  - HttpClient에서 axios error 핸들링하려면 error를 ```resolve```에 담아서 ```promise```를 리턴하면 됨
- **[완료]** toast 메시지 모듈 적용
- **[진행중]** Form 공통 컴포넌트 작업
  - ```vee-validate```를 이용한 유효성검사는 checkbox, radio 같은 건 안되는 거 같음.
    - checkbox, radio는 유효성검사 보류
  - **[대기]** 작성/수정 Form 공통 컴포넌트 작업
- **[완료]** Form 유효성검사 라이브러리 적용
  - [참고](https://vee-validate.logaretm.com/v4/guide/global-validators)
- **[완료]** 공통코드 값 세팅 (방법은 2가지)
  1. codeResolver 같은 거 만들어서 라우터를 탈 때 적용하기
  2. **[이걸로 함]** 공통코드를 어플리케이션이 최초 한번 실행될 때 상태관리에 불러놓기
- **[완료]** JWT에서 사용자 정보 가져오기
- JWT 리프레시 토큰 관리
  - 토큰 발급 시 사용자가 쿠키를 사용안함 설정할 수 있으므로 로컬스토리지에 저장해야 함
  - 토큰 발급 시의 secret key는 환경변수 등의 외부에서 접근하기 어려운 곳에 두고 사용. 소스코드에 적는 건 매우 위험
  - 쿠키를 못 훔치게 HTTP only 설정
- Skeleton UI 적용
  - **[완료]** 프로필 이미지
  - **[완료]** 연도별 모아보기
  - **[완료]** 검색 결과
  - 메인 포스트 목록
  - 사이드바 태그, 카테고리
- 로직 수행 시 로딩 레이어 적용
  - 로그인
  - 포스트/콘텐츠 작성, 수정
- AG-Grid 적용

### Form values 한번에 가져오기 프로젝트..

- ```this.form.values``` 형식으로 만들어야 함
- ```v-slot="{ value }"``` 여기서 value 뽑아보기
  - 이러면 누르기 전부터 checked 상태인 값을 받아올 수 없음

## Task

- **[완료]** 권한 검증
  - **[완료]** 권한 검증 서비스 제작
  - **[완료]** 페이지 접근 권한 검증은 필요 없고, 로그인 여부에 따라 접근 처리하면 됨
- **[완료]** 에러 페이지 작업
- **[진행중]** 메뉴 작업
  - **[대기]** 데이타 CRUD
  - **[완료]** 메뉴 활성화 처리
  - **[대기]** 모바일 메뉴도 작업해야 한다~
  - **[대기]** 2차메뉴 드랍다운 컴포넌트 만들기
- **[진행중]** 포스트 검색
  - 검색옵션, 대소문자 구분도 해야 함
  - 카테고리랑 태그도 뿌려야 함
  - 뒤로가기 시 데이타 유지
  - 검색하면 가끔 레이아웃이 깨짐
    - CSS를 불러오는 데 문제가 있는 거 같음
    - 검색 결과에다가 ```app-post-list``` 컴포넌트를 재활용하는 게 나을듯

## 기타

- jQuery로 DOM을 조작하고 있는 것을 어케 Vue로 바꿀 것인지.. 제일 어려울 듯
- 포스트/콘텐츠 작성, 수정 html에서 meditor css, js 호출 필요
  - 다른 에디터 사용해도 될듯
- Favicon 적용
- html 파일에서 어플리케이션 명 받아올 때 ```<%= htmlWebpackPlugin.options.title %>``` 쓰면 됨
- Vue의 ```computed```에 HTTP 요청은 넣지 않는다.
- DB에서 데이타를 가져와서 뿌리는 건 ```created()``` 메서드에서 해준다.
- ```watch```: 특정 데이타를 모니터링하고 있다가 그 데이타가 바뀌면 실행되는 영역
- Vue ```v-model``` 한글 이슈
- ```@submit.prevent```: ```@submit``` + ```event.preventDefault()```
- 디스크 용량 점점 줄어드는 거 Vue 에러 로그 쌓여서?
