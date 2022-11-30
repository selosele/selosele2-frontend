<template>
  <pane>
    <div class="pane__content-wrapper">
      <slot></slot>
    </div>
  </pane>
</template>

<script>
import { Pane } from 'splitpanes';
import 'splitpanes/dist/splitpanes.css';

export default {
  name: 'ui-split-pane',
  components: {
    Pane,
  },
}
</script>

<style lang="scss" scoped>
.splitpanes--vertical .splitpanes__pane {
  overflow-x: hidden;
  overflow-y: auto;
}
</style>