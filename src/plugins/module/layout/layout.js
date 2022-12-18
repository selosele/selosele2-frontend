import AppContentWrapper from '@/components/layout/AppContentWrapper.vue';

export const layoutModule = {
  install: (app, options) => {
    app.component('app-content-wrapper', AppContentWrapper);
  }
};
