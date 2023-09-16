<template>
  <span class="count">
    {{ text }}
  </span>
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