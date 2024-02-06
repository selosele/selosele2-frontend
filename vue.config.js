const { defineConfig } = require('@vue/cli-service');
const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = defineConfig({
  // WAS, WEB 분리 시, outputDir 주석 처리
  //outputDir: path.resolve(__dirname, '../backend/client'),
  productionSourceMap: false,
  configureWebpack: {
    performance: {
      hints: ('production' === process.env.NODE_ENV) ? 'warning' : false,
    },
    plugins: [
      ('development' === process.env.NODE_ENV) && new BundleAnalyzerPlugin(),
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ko/),
    ],
    resolve: {
      // alias: {
      //   moment: 'moment/src/moment',
      // },
    },
  },
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
