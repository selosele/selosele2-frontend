import AppLogin from '../../views/AppLogin.vue';

export default [
  {
    path: '/a/goto',
    component: AppLogin,
    meta: {
      title: '로그인',
      showSidebar: false,
      showSatis: false,
    },
  },
];
