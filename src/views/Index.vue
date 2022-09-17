<template>
  <div class="index-container">
    <PostList />
    <WidgetConfig />
  </div>
</template>

<script>
import PostList from '../components/views/post/PostList.vue';
import WidgetConfig from '../components/widget/WidgetConfig.vue';

export default {
  name: 'Index',
  components: {
    PostList,
    WidgetConfig,
  },
};
</script>

<style lang="scss">
.index-container {
  @include clearfix;
}
</style>