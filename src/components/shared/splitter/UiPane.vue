<template>
  <pane :class="{ 'is--transparent': isTransparent }">
    <div class="pane__content-wrapper">
      <slot></slot>
    </div>
  </pane>
</template>

<script>
import { Pane } from 'splitpanes';
import 'splitpanes/dist/splitpanes.css';

export default {
  name: 'UiSplitPane',
  components: {
    Pane,
  },
  props: {
    /** Pane 배경 투명색 사용 여부 */
    isTransparent: {
      type: Boolean,
      default: false,
    }
  },
}
</script>

<style lang="scss" scoped>
.splitpanes.default-theme .splitpanes__pane.is--transparent {
  background-color: transparent;
}

.splitpanes--vertical .splitpanes__pane {
  overflow-x: hidden;
  overflow-y: auto;
}

.splitpanes__splitter {
  ~ .splitpanes__pane {
    border: 1px solid $grey15;
    box-sizing: border-box;
  }
}
</style>