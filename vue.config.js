const { defineConfig } = require('@vue/cli-service');
const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = defineConfig({
  outputDir: path.resolve(__dirname, '../../backend/selosele2/client'),
  productionSourceMap: false,
  configureWebpack: {
    performance: {
      hints: 'production' === process.env.NODE_ENV ? 'warning' : false,
    },
    plugins: [
      new BundleAnalyzerPlugin(),
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ko/),
    ],
    resolve: {
      alias: {
        moment: 'moment/src/moment',
      },
    },
  },
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
