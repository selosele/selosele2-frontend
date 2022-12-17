<template>
  <splitpanes class="default-theme" :style="{ height }" vertical>
    <slot></slot>
  </splitpanes>
</template>

<script>
import { Splitpanes } from 'splitpanes';
import 'splitpanes/dist/splitpanes.css';

export default {
  name: 'ui-split-pane',
  components: {
    Splitpanes,
  },
  props: {
    /** height */
    height: {
      type: String,
      default: '500px',
    },
  },
}
</script>

<style lang="scss" scoped>

</style>