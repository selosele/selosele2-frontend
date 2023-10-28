# selosele2-frontend

## 작업기간

- 2022.09.10. ~ 2023.02.19.

## 기술스택 및 개발환경

- `NestJS` - 9.0.0
- `Vue.js` - 3.2.13
- `MariaDB` - 10.6.7
- `Redis` - 3.0.504
- `TypeORM` - 0.3.10
- `WSL2` - Ubuntu 22.04 LTS

## etc.

- 구동 명령 순서
  1. `redis-server` (Redis 구동)
  2. `sudo service mysql start` (MariaDB 구동)
  3. `nvm use 16.14.2` (Node.js 버전 스위칭)
  4. `npm run start:dev` (백엔드 구동)
  5. `npm start` (프론트엔드 구동)
- [Backend 저장소](https://github.com/selosele/selosele2-backend)
