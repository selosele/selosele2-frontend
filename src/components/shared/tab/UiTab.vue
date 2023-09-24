<template>
  <tab :name="name" :id="id">
    <slot />
  </tab>
</template>

<script>
import { Tab } from 'vue3-tabs-component';

export default {
  name: 'UiTab',
  components: {
    Tab,
  },
  props: {
    /** tab name */
    name: String,
    /** tab id */
    id: String,
  },
}
</script>

<style lang="scss" scoped>

</style>