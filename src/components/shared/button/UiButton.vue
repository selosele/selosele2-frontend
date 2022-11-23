<template>
  <button :type="type"
          :class="`btn ${btnColor} ${className}`"
          v-if="!routerLink">
    <slot></slot>
  </button>

  <router-link v-else
               :to="routerLink"
               :class="`btn ${btnColor} ${className}`">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  name: 'ui-button',
  props: {
    // button type
    type: {
      type: String,
      default: 'button',
    },
    // button color
    color: {
      type: String,
      default: '',
    },
    // button className
    className: {
      type: String,
      default: ' ',
    },
    // link
    routerLink: {
      type: String,
      default: '',
    }
  },
  computed: {
    btnColor() {
      switch (this.color) {
        case 'primary':
          return 'btn--primary';
        case 'secondary':
          return 'btn--secondary';
      }
      return '';
    }
  },
}
</script>

<style lang="scss" scoped>

</style>