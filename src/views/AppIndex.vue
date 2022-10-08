<template>
  <app-post-list />
  <app-widget-config />
</template>

<script>
import AppPostList from '../components/views/post/AppPostList.vue';
import AppWidgetConfig from '../components/widget/AppWidgetConfig.vue';

export default {
  name: 'app-index',
  components: {
    AppPostList,
    AppWidgetConfig,
  },
};
</script>

<style lang="scss"></style>