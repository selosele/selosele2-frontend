<template>
  <button :type="type"
          :class="`btn ${btnColor} ${className}`"
          @click="$emit('click')"
          v-if="!routerLink && 'link' !== type">
    <slot></slot>
  </button>

  <router-link :to="routerLink"
               :class="`btn ${btnColor} ${className}`"
               v-if="routerLink && 'link' !== type">
    <slot></slot>
  </router-link>

  <a :href="href"
     :target="target"
     :title="title"
     :rel="rel"
     :class="`btn ${btnColor} ${className}`"
     v-if="!routerLink && 'link' === type">
    <slot></slot>
  </a>
</template>

<script>
import { isNotEmpty } from '@/utils/util';

export default {
  name: 'ui-button',
  props: {
    // button type
    type: {
      type: String,
      default: 'button', // a 태그 사용하려면 link type
    },
    // button color
    color: {
      type: String,
      default: '',
    },
    // button className
    className: [String, Object, Array],
    // link
    routerLink: {
      type: String,
      default: '',
    },
    // href
    href: {
      type: String,
      default: '',
    },
    // target
    target: {
      type: String,
      default: '_self',
    },
    // title
    title: {
      type: String,
      default: '',
    },
    // rel
    rel: {
      type: String,
      default: '',
    }
  },
  computed: {
    btnColor() {
      if (isNotEmpty(this.color)) {
        return `btn--${this.color}`;
      }
      return '';
    }
  },
}
</script>

<style lang="scss" scoped>

</style>