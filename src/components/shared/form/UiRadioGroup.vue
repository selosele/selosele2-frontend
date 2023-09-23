<template>
  <label :for="id"
         :class="'input-label'"
         v-if="label">{{ label }}
  </label>

  <slot></slot>
</template>

<script>
export default {
  name: 'UiRadioGroup',
  props: {
    /** radio id */
    id: String,
    /** radio group label */
    label: String,
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/basics/input.scss';
</style>