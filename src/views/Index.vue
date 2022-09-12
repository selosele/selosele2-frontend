<template>
  <PostList />
  <WidgetConfig />
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

<style lang="scss"></style>