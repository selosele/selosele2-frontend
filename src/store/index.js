import { createStore } from 'vuex';
import { Code } from '@/store/modules/Code';
import { Breadcrumb } from '@/store/modules/Breadcrumb';
import { Auth } from '@/store/modules/Auth';
import { Satisfaction } from '@/store/modules/Satisfaction';
import { Notification } from '@/store/modules/Notification';
import { BlogConfig } from '@/store/modules/BlogConfig';
import { Layout } from '@/store/modules/Layout';
import { Category } from '@/store/modules/Category';
import { Post } from '@/store/modules/Post';
import { Guestbook } from '@/store/modules/Guestbook';
import { Menu } from '@/store/modules/Menu';
import { Year } from '@/store/modules/Year';
import { Search } from '@/store/modules/Search';
import { Loading } from '@/store/modules/Loading';
import { isNotBlank } from '@/utils';

export default createStore({
  modules: {
    Code,           // 공통코드
    Breadcrumb,     // Breadcrumb
    Auth,           // 인증
    Satisfaction,   // 만족도조사
    Notification,   // 알림
    BlogConfig,     // 블로그 환경설정
    Layout,         // 레이아웃
    Category,       // 카테고리, 태그
    Post,           // 포스트
    Guestbook,      // 방명록
    Menu,           // 메뉴
    Year,           // 연도별 모아보기
    Search,         // 검색
    Loading,        // 로딩
  },
  getters: {
    /** 로컬 환경일 경우 */
    isDevelopment() {
      return 'localhost' === window.location.hostname || '127.0.0.1' === window.location.hostname;
    },
    /** 운영 환경일 경우 */
    isProduction() {
      return 'localhost' !== window.location.hostname && '127.0.0.1' !== window.location.hostname;
    },
    /** 로그인 여부 */
    isLogin(state) {
      // 페이지 새로고침 시, 상태가 초기화되므로 localStorage에 저장된 accessToken의 존재 유무도 확인해야 정상적인 값을 반환한다.
      return isNotBlank(state.Auth.accessToken) || isNotBlank(window.localStorage.getItem('accessToken'));
    },
    /** 관리자 여부 */
    isAdmin(state) {
      return state.Auth.isAdmin;
    },
    /** Editor 클래스명 */
    editorClassName() {
      return 'md-editor-v3-textarea';
    },
  },
});
