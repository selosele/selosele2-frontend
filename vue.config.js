const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
  outputDir: path.resolve(__dirname, '../../backend/selosele2/client'),
  devServer: {
    proxy: {
      '/api': {
        target: 'production' === process.env.NODE_ENV ? 'https://blog-selosele.koyeb.app' : 'http://localhost:3000',
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
