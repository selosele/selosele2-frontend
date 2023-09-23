<template>
  <ui-modal :title="post?.title"
            :name="this.$options.name"
  >
    <div class="post-view__wrapper">
      <div class="post__contents__body line-numbers" v-html="post?.cont"></div>
    </div>
  </ui-modal>
</template>

<script>
export default {
  name: 'AppPreviewPostModal',
  props: {
    /** 포스트 */
    post: Object,
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/views/view.scss';
</style>