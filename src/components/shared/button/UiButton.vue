<template>
  <button :type="type"
          :class="`btn ${btnColor}${btnBlock}`"
          v-bind="$attrs"
          v-if="!routerLink && 'link' !== type">
    <span v-if="text">{{ text }}</span>
    <slot></slot>
  </button>

  <router-link :to="routerLink"
               :class="`btn ${btnColor}${btnBlock}`"
               v-bind="$attrs"
               v-if="routerLink && 'link' !== type">
    <span v-if="text">{{ text }}</span>
    <slot></slot>
  </router-link>

  <a :href="href"
     :class="`btn ${btnColor}${btnBlock}`"
     v-bind="$attrs"
     v-if="!routerLink && 'link' === type">
     <span v-if="text">{{ text }}</span>
    <slot></slot>
  </a>
</template>

<script>
import { isNotEmpty } from '@/utils';

export default {
  name: 'UiButton',
  props: {
    /** button type */
    type: {
      type: String,
      default: 'button', // a 태그 사용하려면 link type
    },
    /** text */
    text: String,
    /** color */
    color: {
      type: String,
      default: '',
    },
    /** block 스타일 여부 */
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
        return ` is--block`;
      }
      return '';
    }
  },
}
</script>

<style lang="scss" scoped>

</style>