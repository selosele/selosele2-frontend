<template>
  <table class="write-tbl">
    <caption class="sr-only" v-if="name">{{ name }}</caption>
    <colgroup>
      <template v-for="(width,i) in colWidth" :key="i">
        <col :style="{ width }">
      </template>
    </colgroup>
    <tbody>
      <slot />
    </tbody>
  </table>

  <div class="d-flex-w flex--center gap--10 mt--20 mb--20">
    <slot name="btn" />
  </div>
</template>

<script>
export default {
  name: 'UiWriteTable',
  props: {
    /** 테이블 이름 */
    name: String,
    /** col 태그 width */
    colWidth: {
      type: Array,
      default: () => ['17%', '83%']
    },
  },
}
</script>

<style lang="scss" scoped>
.write-tbl:deep {
  colgroup {
    display: none;

    @media (min-width: $min-big-width) {
      display: table-column-group;
    }
  }

  tbody {
    th {
      display: block;
      float: left;
      width: 100%;
      text-align: left;

      @media (min-width: $min-big-width) {
        display: table-cell;
        float: none;
        width: auto;
        text-align: center;
      }
    }
  }

  td {
    display: block;
    position: relative;
    float: left;
    width: 100%;

    @media (min-width: $min-big-width) {
      display: table-cell;
      float: none;
      width: auto;
    }
  }
}
</style>