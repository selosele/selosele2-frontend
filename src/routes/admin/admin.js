export default [
  {
    path: '/admin/blogconfig',
    component: () => import('@/views/AppBlogConfig.vue'),
    meta: {
      requiresAuth: true,
      showSidebar: false,
      showSatis: false,
    },
  },
  {
    path: '/admin/code',
    component: () => import('@/views/AppCode.vue'),
    meta: {
      requiresAuth: true,
      showSidebar: false,
      showSatis: false,
    },
  },
  {
    path: '/admin/satisfaction',
    component: () => import('@/views/AppAdminSatisfaction.vue'),
    meta: {
      requiresAuth: true,
      showSidebar: false,
      showSatis: false,
    },
  },
];
