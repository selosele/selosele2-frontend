<template>
  <button :type="type"
          :class="`btn ${btnColor}${btnBlock}`"
          :title="title"
          v-bind="$attrs"
          v-if="!routerLink && 'link' !== type">
    <i :class="icon" aria-hidden="true"></i>
    <span class="sr-only" v-if="text">{{ text }}</span>
    <slot></slot>
  </button>

  <router-link :to="routerLink"
               :class="`btn ${btnColor}${btnBlock}`"
               v-bind="$attrs"
               v-if="routerLink && 'link' !== type">
    <i :class="icon" aria-hidden="true"></i>
    <span class="sr-only" v-if="text">{{ text }}</span>
    <slot></slot>
  </router-link>

  <a :href="href"
     :target="target"
     :title="title"
     :rel="rel"
     :class="`btn ${btnColor}${btnBlock}`"
     v-bind="$attrs"
     v-if="!routerLink && 'link' === type">
    <i :class="icon" aria-hidden="true"></i>
    <span class="sr-only" v-if="text">{{ text }}</span>
    <slot></slot>
  </a>
</template>

<script>
import UiButton from './UiButton.vue';

export default {
  name: 'ui-icon-button',
  extends: UiButton,
  props: {
    /** icon */
    icon: String,
    /** text */
    text: String,
  },
}
</script>

<style lang="scss" scoped>

</style>