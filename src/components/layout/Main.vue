<template>
  <main id="main" class="main" ref="mainWrapper">
    <section class="main__contents">
      <slot />
    </section>
  </main>
</template>

<script>
export default {
  name: 'Main',
  methods: {
    getOffsetTop() {
      return this.$refs.mainWrapper.offsetTop;
    },
  },
};
</script>

<style lang="scss"></style>