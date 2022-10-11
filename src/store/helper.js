import { mapGetters } from "vuex";

export const commonComputed = {
  ...mapGetters([
    'isLogin',
    'isDevelopment',
    'isProduction'
  ])
};
