<template>
  <div :class="{
        'file-list': true,
        'file-list--scroll': scroll,
        'file-list--float': float,
      }"
  >
    <ul :style="{ height }">
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
  name: 'UiFileList',
  props: {
    /** 파일 목록 */
    value: Array,
    /** 절대 위치값 사용 여부 */
    float: {
      type: Boolean,
      default: true,
    },
    /** 스크롤 가능 여부 */
    scroll: {
      type: Boolean,
      default: true,
    },
    /** 높이값 */
    height: {
      type: String,
      default: '17.6rem',
    },
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
  position: relative;
  z-index: 1;
  width: 100%;
  border-radius: 0.5rem;
  background-color: $grey12;
  line-height: 1.8;
  box-shadow: rgba(0, 0, 0, 0.3) 1px 1px 0.25rem;

  &--float {
    position: absolute;
    top: 3.1rem;
    left: 0.7rem;
    width: calc(100% - 1rem);
  }

  &--scroll {
    > ul {
      overflow: auto;
    }
  }

  > p {
    &:only-child {
      margin: 0;
      padding: 0.5rem 0.8rem;
      font-size: 0.85rem;
    }
  }

  > ul {
    display: flex;
    margin: 0;
    padding: 1rem 2rem;
    list-style-type: none;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    box-sizing: border-box;

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