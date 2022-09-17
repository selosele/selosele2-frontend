# 개인블로그 리뉴얼 프로젝트 (Frontend)

## 기본정보

- 작업기간 : 2022.09.10. ~
- 어플리케이션 명 : selosele2
- Backend : Nest.js
- Frontend : Vue
- DBMS : MariaDB (& TypeORM)
- Port: 8080
- 프론트엔드 구동 : ```npm run serve``` &rarr; ```npm run sass:watch```
- 프론트엔드 빌드 : ```npm run build```
- [Backend 저장소](https://github.com/selosele/selosele2-backend)

## 라이브러리 및 기술

- **[완료]** Vue 상태관리 라이브러리 Vuex 적용
  - Pinia는 다음 기회에..
- **[완료]** SCSS 적용
- **[완료 -> 2022.09.17. 보류]** Prettier 적용
- **[완료]** Angular의 HttpClient를 Axios 기반으로 만들어보기
  - main.js에 ```app.config.globalProperties.$http = axios;``` 해놓고 컴포넌트에서 this.$http로 바로 axios 호출해도 됨(단, Vue 전역변수는 .vue 파일에서만 접근 가능).

## 기타

- jQuery로 DOM을 조작하고 있는 것을 어케 Vue로 바꿀 것인지.. 제일 어려울 듯
- 포스트/콘텐츠 작성,수정 html에서 meditor css, js 호출 필요
- Favicon 적용
- html 파일에서 어플리케이션 명 받아올 때 ```<%= htmlWebpackPlugin.options.title %>``` 쓰면 됨
- Vue의 computed에 HTTP 요청은 넣지 않는다.
