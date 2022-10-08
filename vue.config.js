const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import '@/assets/scss/shared/shared.scss';
        `,
      },
    },
  },
});
