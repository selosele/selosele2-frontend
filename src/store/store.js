import { createStore } from 'vuex';
import { Code } from '@/store/modules/Code';
import { Auth } from '@/store/modules/Auth';
import { BlogConfig } from '@/store/modules/BlogConfig';
import { Layout } from '@/store/modules/Layout';
import { Post } from '@/store/modules/Post';
import { Guestbook } from '@/store/modules/Guestbook';

export default createStore({
  modules: {
    Code,           // 공통코드 Store
    Auth,           // 인증·인가 Store
    BlogConfig,     // 블로그 환경설정 Store
    Layout,         // 레이아웃 Store
    Post,           // 포스트 Store
    Guestbook,      // 방명록 Store
  },
  getters: {
    // 로그인 여부
    isLogin(state) {
      return state.Auth.token !== null;
    },
    // 개발/운영모드 구분
    isDevelopment() {
      return 'development' === process.env.NODE_ENV;
    },
    isProduction() {
      return 'production' === process.env.NODE_ENV;
    },
  },
});
