<template>
  <div class="notice">
    <i class="xi-info-o notice__icon" aria-hidden="true" />

    <slot />

    <!-- <ui-icon-button
      :icon="'xi-close'"
      :text="'알림창 닫기'"
      :class="'notice__close'"
      @click="closeNotice"
    /> -->
  </div>
</template>

<script>
export default {
  name: 'UiNotice',
  methods: {
    /** 알림창 닫기 */
    closeNotice() {
      // TODO: 오늘 하루 보지 않기 기능 필요
    },
  },
}
</script>

<style lang="scss" scoped>
.notice {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  width: 100%;
  margin-bottom: 2rem;
  padding: 1rem;
  //background: linear-gradient(to left, $grey07, $sub-color07);
  background-color: $sub-color07;

  @media (min-width: $min-big-width) {
    float: left;
  }

  &__icon {
    font-size: 1.3rem;
  }

  &__close {
    width: 1.5rem;
    height: 1.5rem;
    box-shadow: none;
    text-decoration: none;
  }
}
</style>