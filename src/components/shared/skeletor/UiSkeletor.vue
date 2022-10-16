<template>
  <span
    :style="{ height, width: computedWidth }"
    class='skeletor-box'
  />
</template>

<script>
export default {
  name: 'ui-skeletor',
  props: {
    maxWidth: {
      default: 100,
      type: Number,
    },
    minWidth: {
      default: 80,
      type: Number,
    },
    width: {
      default: null,
      type: String,
    },
    height: {
      default: `1em`,
      type: String,
    },
  },
  computed: {
    computedWidth () {
      return this.width || `${Math.floor((0.9 * (this.maxWidth - this.minWidth)) + this.minWidth)}%`
    }
  },
}
</script>

<style lang="scss">
.skeletor-box {
  display: inline-block;
  overflow: hidden;
  position: relative;
  vertical-align: middle;
  background-color: #dddbdd;

  & ~ & {
    margin-top: 1rem;
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
      90deg,
      rgba(#fff, 0) 0,
      rgba(#fff, 0.2) 20%,
      rgba(#fff, 0.4) 60%,
      rgba(#fff, 0)
    );
    animation: shimmer 3s infinite;
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
}
</style>