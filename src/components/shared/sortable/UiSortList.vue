<template>
  <SlickList
    :axis="axis"
    :pressDelay="pressDelay"
    :shouldCancelStart="shouldCancelStart"
    v-model:list="mv"
    @sort-start="onSortStart"
    @update:list="onUpdateList">
    <slot />
  </SlickList>
</template>

<script>
import { SlickList } from 'vue-slicksort';

export default {
  name: 'UiSortList',
  components: {
    SlickList,
  },
  props: {
    /** 정렬 방향 */
    axis: {
      type: String,
      default: 'y',
    },
    /** delay */
    pressDelay: Number,
    /** 클릭한 요소가 input, button 등 입력 요소일경우 정렬을 취소(callback 사용 및 HTML 태그명 추가 가능) */
    shouldCancelStart: Function,
    /** v-model 값 */
    modelValue: Array,
  },
  computed: {
    mv: {
      get() {
        return this.modelValue;
      },
      set(v) {}
    }
  },
  methods: {
    /** 정렬 시작 시 */
    onSortStart() {
      this.$emit('sortStart');
    },
    /** 정렬 종료 시 */
    onUpdateList(list) {
      this.$emit('updateList', list);
    },
  },
}
</script>

<style lang="scss" scoped>

</style>