<template>
  <span
    :style="{ 
      width,
      minWidth,
      maxWidth,
      height, 
      marginTop,
    }"
    :class="['skeletor-box', cssClass]"
  >
  </span>
</template>

<script>
export default {
  name: 'ui-skeletor',
  props: {
    /** margin-top */
    marginTop: String,
    /** width */
    width: {
      default: '',
      type: String,
    },
    /** min-width */
    minWidth: {
      default: 80,
      type: Number,
    },
    /** max-width */
    maxWidth: {
      default: 100,
      type: Number,
    },
    /** height */
    height: {
      default: '',
      type: String,
    },
    /** css class */
    cssClass: {
      default: '',
      type: String,
    },
  },
}
</script>

<style lang="scss" scoped>
.skeletor-box {
  display: inline-block;
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
  vertical-align: middle;
  background-color: $grey14;

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
      rgba(#fff, 0.5) 60%,
      rgba(#fff, 0)
    );
    animation: shimmer 2s infinite;
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
}
</style>