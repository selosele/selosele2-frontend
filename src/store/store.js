import { createStore } from 'vuex';
import { Code } from '@/store/modules/Code';
import { Auth } from '@/store/modules/Auth';
import { BlogConfig } from '@/store/modules/BlogConfig';
import { Layout } from '@/store/modules/Layout';
import { Post } from '@/store/modules/Post';
import { Guestbook } from '@/store/modules/Guestbook';
import { Splitter } from '@/store/modules/Splitter';

export default createStore({
  modules: {
    Code,           // 공통코드
    Auth,           // 인증·인가
    BlogConfig,     // 블로그 환경설정
    Layout,         // 레이아웃
    Post,           // 포스트
    Guestbook,      // 방명록
    Splitter,       // Splitter
  },
  getters: {
    // 로컬 환경일 경우
    isDevelopment() {
      return 'localhost' === location.hostname || '127.0.0.1' === location.hostname;
    },
    // 로컬 환경이 아닐 경우
    isProduction() {
      return 'localhost' !== location.hostname && '127.0.0.1' !== location.hostname;
    },
    // 로그인 여부
    isLogin(state) {
      return state.Auth.token !== null;
    },
    // Splitter 활성화 여부
    isSplitterActive(state) {
      return state.Splitter.isActive;
    }
  },
});
