<template>
  <tabs :options="options"
        @clicked="onTabClicked"
        @changed="onTabChanged"
  >
    <slot></slot>
  </tabs>
</template>

<script>
import { Tabs } from 'vue3-tabs-component';

export default {
  name: 'ui-tabs',
  components: {
    Tabs,
  },
  props: {
    /** 탭 옵션 */
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      /** 탭 옵션 기본 값 */
      defaultOptions: {
        useUrlFragment: false,
      }
    }
  },
  created() {
    Object.assign(this.options, this.defaultOptions);
  },
  methods: {
    /** 탭 클릭 시 */
    onTabClicked(selectedTab) {
      this.$emit('onTabClicked', selectedTab);
    },
    /** 탭 변경 시 */
    onTabChanged(selectedTab) {
      this.$emit('onTabChanged', selectedTab);
    },
  }
}
</script>

<style lang="scss" scoped>

</style>