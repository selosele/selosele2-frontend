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
- **[완료]** toast 메시지 모듈 적용
- Form 유효성검사 라이브러리 적용
- Skeleton UI 적용
  - 특히 연도별 모아보기 아코디언
- AG-Grid 사용

## 기타

- jQuery로 DOM을 조작하고 있는 것을 어케 Vue로 바꿀 것인지.. 제일 어려울 듯
- 포스트/콘텐츠 작성, 수정 html에서 meditor css, js 호출 필요
  - 에디터를 다른 걸로 바꿔도 됨
- Favicon 적용
- html 파일에서 어플리케이션 명 받아올 때 ```<%= htmlWebpackPlugin.options.title %>``` 쓰면 됨
- Vue의 ```computed```에 HTTP 요청은 넣지 않는다.
- DB에서 데이타를 가져와서 뿌리는 건 ```created()``` 메서드에서 해준다.
- ```watch```: 특정 데이타를 모니터링하고 있다가 그 데이타가 바뀌면 실행되는 영역
- Vue ```v-model``` 한글 이슈
- 디스크 용량 점점 줄어드는 거 Vue 에러 로그 쌓여서?
