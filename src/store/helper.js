import { mapGetters } from 'vuex';

export const commonComputed = {
  ...mapGetters([
    'isDevelopment',
    'isProduction',
    'isLogin',
    'isSplitterActive',
  ])
};
