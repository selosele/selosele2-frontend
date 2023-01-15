<template>
  <div class="file-list">
    <ul>
      <li v-for="(file,i) in value" :key="i">
        <a :href="file.url" @click.prevent="onClick(file)">
          <img :src="file.url" alt="">
          <span>{{ file.public_id }}.{{ file.format }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ui-file-list',
  props: {
    value: Array,
  },
  methods: {
    /** 파일 클릭 시 */
    onClick(file) {
      this.$emit('clickFile', file);
    },
  },
}
</script>

<style lang="scss" scoped>
.file-list {
  position: absolute;
  top: 3.1rem;
  left: 0.7rem;
  z-index: 1;
  width: calc(100% - 1rem);
  background-color: $grey12;
  line-height: 1.8;
  box-shadow: rgba(0, 0, 0, 0.3) 1px 1px 0.25rem;

  > p {
    &:only-child {
      margin: 0;
      padding: 0.5rem 0.8rem;
      font-size: 0.85rem;
    }
  }

  > ul {
    display: flex;
    overflow: auto;
    max-height: 16.5rem;
    margin: 0;
    padding: 1rem 2rem;
    list-style-type: none;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    box-sizing: border-box;

    @media (min-width: $min-mini-width) {
      height: 17.6rem;
    }

    > li {
      width: 100%;

      @media (min-width: $min-mini-width) {
        width: calc(50% - 1rem);
      }

      @media (min-width: $min-medium-width) {
        width: calc(33.33% - 1rem);
      }

      + li {
        margin-top: 0.25rem;
      }

      > a {
        display: block;
        font-size: 0.85rem;

        @media (min-width: $min-large-width) {
          &:hover {
            > span {
              text-decoration: underline;
            }
          }
        }

        img {
          display: block;
          width: auto;
          height: 5rem;
          margin: 0 auto;
        }

        > span {
          display: block;
          @include ellipsis;
          margin-top: 0.5rem;
          text-align: center;
        }
      }
    }
  }
}
</style>