import { mapGetters } from 'vuex';

/** 전역 computed */
export const commonComputed = {
  ...mapGetters([
    'isDevelopment',
    'isProduction',
    'isLogin',
    'isAdmin',
    'editorClassName',
  ])
};
