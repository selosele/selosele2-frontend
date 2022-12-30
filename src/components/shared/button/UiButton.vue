<template>
  <button :type="type"
          :class="`btn ${btnColor}${btnBlock}`"
          :title="title"
          @click="$emit('click')"
          v-bind="$attrs"
          v-if="!routerLink && 'link' !== type">
    <slot></slot>
  </button>

  <router-link :to="routerLink"
               :class="`btn ${btnColor}${btnBlock}`"
               v-bind="$attrs"
               v-if="routerLink && 'link' !== type">
    <slot></slot>
  </router-link>

  <a :href="href"
     :target="target"
     :title="title"
     :rel="rel"
     :class="`btn ${btnColor}${btnBlock}`"
     v-bind="$attrs"
     v-if="!routerLink && 'link' === type">
    <slot></slot>
  </a>
</template>

<script>
import { isNotEmpty } from '@/utils/utils';

export default {
  name: 'ui-button',
  props: {
    /** button type */
    type: {
      type: String,
      default: 'button', // a 태그 사용하려면 link type
    },
    /** button color */
    color: {
      type: String,
      default: '',
    },
    /** block button */
    block: {
      type: Boolean,
      default: false,
    },
    /** link */
    routerLink: {
      type: String,
      default: '',
    },
    /** href */
    href: {
      type: String,
      default: '',
    },
    /** target */
    target: {
      type: String,
      default: '_self',
    },
    /** title */
    title: {
      type: String,
      default: '',
    },
    /** rel */
    rel: {
      type: String,
      default: '',
    }
  },
  computed: {
    /** 버튼 color */
    btnColor() {
      if (isNotEmpty(this.color)) {
        return `btn--${this.color}`;
      }
      return '';
    },
    /** 버튼 block 스타일 */
    btnBlock() {
      if (isNotEmpty(this.block) && true === this.block) {
        return ` btn--block`;
      }
      return '';
    }
  },
}
</script>

<style lang="scss" scoped>

</style>