const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import '@/assets/scss/setup/variables.scss';
          @import '@/assets/scss/setup/mixins.scss';
        `,
      },
    },
  },
});
