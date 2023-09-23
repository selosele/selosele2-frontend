<template>
  <SlickItem :index="index" :disabled="disabled">
    <slot></slot>
  </SlickItem>
</template>

<script>
import { SlickItem } from 'vue-slicksort';

export default {
  name: 'UiSortItem',
  components: {
    SlickItem,
  },
  props: {
    /** index */
    index: Number,
    /** 정렬 비활성화 여부 */
    disabled: Boolean,
  },
}
</script>

<style lang="scss" scoped>

</style>