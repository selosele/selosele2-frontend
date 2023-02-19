<template>
  <loading v-model:active="active"
           :can-cancel="cancel"
           :is-full-page="fullPage">
  </loading>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

export default {
  name: 'ui-loading',
  components: {
    Loading,
  },
  computed: {
    active: {
      get() {
        return this.activeModel;
      },
      set(v) {}
    }
  },
  props: {
    /** 로딩 상태 변수 */
    activeModel: {
      type: Boolean,
      default: false,
    },
    /** 로딩 수동 취소 가능 여부 */
    cancel: {
      type: Boolean,
      default: true,
    },
    /** 로딩이 화면을 전부 채울지 여부 */
    fullPage: {
      type: Boolean,
      default: false,
    },
  }
}
</script>

<style lang="scss" scoped>

</style>