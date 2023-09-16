<template>
  <p class="notice-count__wrapper">총
    <strong class="notice-count">
      {{ text }}
    </strong>개의 읽지 않은 알림
  </p>
</template>

<script>
export default {
  name: 'app-notification-count',
  props: {
    /** 알림 건수 */
    text: [String, Number],
  },
}
</script>

<style lang="scss" scoped>

</style>