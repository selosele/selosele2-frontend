<template>
  <nav class="skip-links">
    <a href="#main" class="sr-only">본문 바로가기</a>
    <a href="#gnb" class="sr-only">주메뉴 바로가기</a>
  </nav>
</template>

<script>
export default {
  name: 'AppSkipLinks',
}
</script>

<style lang="scss" scoped>
.skip-links {
  > a {
    top: 0;
    line-height: 1;
    color: $grey10;
    transition: all 0.2s;

    &:focus,
    &:active {
      display: block;
      clip: auto;
      clip-path: none;
      z-index: 100000;
      width: auto;
      height: auto;
      margin: 0;
      padding: 0 1.3rem;
      outline-offset: -2px;
      background-color: $grey12;
      box-shadow: 0 0 0.1rem 0.1rem rgba(0, 0, 0, 0.6);
      font-size: 1rem;
      font-weight: 700;
      line-height: 2.6rem;
      text-decoration: none;
      box-sizing: border-box;
    }

    &:hover {
      color: $black;
    }
  }
}
</style>
