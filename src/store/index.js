import { createStore } from 'vuex';
import { Code } from '@/store/modules/Code';
import { Auth } from '@/store/modules/Auth';
import { Notification } from '@/store/modules/Notification';
import { BlogConfig } from '@/store/modules/BlogConfig';
import { Layout } from '@/store/modules/Layout';
import { Post } from '@/store/modules/Post';
import { Guestbook } from '@/store/modules/Guestbook';
import { Menu } from '@/store/modules/Menu';
import { Year } from '@/store/modules/Year';
import { Splitter } from '@/store/modules/Splitter';
import { Loading } from '@/store/modules/Loading';
import { isNotEmpty } from '@/utils';
import { AuthService } from '@/services/auth/authService';

export default createStore({
  modules: {
    Code,           // 공통코드
    Auth,           // 인증
    Notification,   // 알림
    BlogConfig,     // 블로그 환경설정
    Layout,         // 레이아웃
    Post,           // 포스트
    Guestbook,      // 방명록
    Menu,           // 메뉴
    Year,           // 연도별 모아보기
    Splitter,       // Splitter
    Loading,        // 로딩
  },
  getters: {
    /** 로컬 환경일 경우 */
    isDevelopment() {
      return 'localhost' === location.hostname || '127.0.0.1' === location.hostname;
    },
    /** 운영 환경일 경우 */
    isProduction() {
      return 'localhost' !== location.hostname && '127.0.0.1' !== location.hostname;
    },
    /** 로그인 여부 */
    isLogin(state) {
      // 새로고침 시, 상태가 초기화되므로 localStorage에 저장된 accessToken의 존재 유무도 확인해야 정상적인 값을 반환한다.
      return isNotEmpty(state.Auth.accessToken) || isNotEmpty(new AuthService().getAccessToken());
    },
    /** Splitter 활성화 여부 */
    isSplitterActive(state) {
      return state.Splitter.isActive;
    },
    /** Editor 클래스명 */
    editorClassName() {
      return 'md-editor-v3-textarea';
    },
  },
});
