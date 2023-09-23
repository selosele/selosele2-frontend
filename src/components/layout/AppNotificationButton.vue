<template>
  <ui-button :class="{ 'active': idx === activeIndex }" @click="onClick">{{ text }}
    <strong class="count" v-if="0 < count">
      {{ count }}
    </strong>
  </ui-button>
</template>

<script>
export default {
  name: 'AppNotificationButton',
  props: {
    /** 버튼 텍스트 */
    text: String,
    /** 버튼 Index */
    idx: Number,
    /** 버튼 활성화 Index */
    activeIndex: Number,
    /** 알림 건수 */
    count: Number,
  },
  methods: {
    onClick() {
      this.$emit('click');
    }
  },
}
</script>

<style lang="scss" scoped>

</style>