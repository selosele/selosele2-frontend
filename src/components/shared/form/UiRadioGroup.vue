<template>
  <label :for="id"
         :class="'input-label'"
         v-if="label">{{ label }}
  </label>

  <slot></slot>
</template>

<script>
export default {
  name: 'ui-radio-group',
  props: {
    /** radio group label */
    label: String,
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/basics/input.scss';
</style>