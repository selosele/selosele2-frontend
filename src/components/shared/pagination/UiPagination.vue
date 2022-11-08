<template>
  <nav class="pagination">
    <ul>
      <li class="pagination__list pagination__list--first">
        <span :class="[
                'link',
                { 'link--disabled': page <= 1 }]"
              @click="onPage(1)">
          <i class="xi-step-backward" aria-hidden="true"></i>
          <span class="sr-only">첫 번째 페이지</span>
        </span>
      </li>
      <li class="pagination__list pagination__list--prev">
        <span :class="[
                'link',
                { 'link--disabled': page <= 1 }]"
              @click="onPage(this.page-1)">
          <i class="xi-angle-left" aria-hidden="true"></i>
          <span class="sr-only">이전 페이지</span>
        </span>
      </li>

      <li v-for="(num,i) in pages" :key="i"
          :class="[
            'pagination__list',
            'pagination__list--num',
            { 'pagination__list--active': page === num }]">
        <span :title="`${page === num ? '현재 페이지' : ''}`"
              class="link"
              @click="onPage(num)">{{ num }}
        </span>
      </li>

      <li class="pagination__list pagination__list--next">
        <span :class="[
                'link',
                { 'link--disabled': page >= paginationTotal }]"
              @click="onPage(this.page+1)">
          <i class="xi-angle-right" aria-hidden="true"></i>
          <span class="sr-only">다음 페이지</span>
        </span>
      </li>
      <li class="pagination__list pagination__list--last">
        <span :class="[
                'link',
                { 'link--disabled': page >= paginationTotal }]"
              @click="onPage(paginationTotal)">
          <i class="xi-step-forward" aria-hidden="true"></i>
          <span class="sr-only">마지막 페이지</span>
        </span>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'ui-pagination',
  props: {
    // Pagination 데이타
    value: Array,
    // 한 페이지당 표출할 row 개수
    total: Number,
    // Pagination 데이타 총 개수
    rows: {
      type: Number,
      default: 10,
    },
    // Pagination 개수
    size: {
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      // Pagination 현재 번호
      pageNum: 1,
    }
  },
  created() {
    this.onPage(this.page);
  },
  computed: {
    // Pagination 현재 번호
    page: {
      get() {
        return this.pageNum;
      },
      set(i) {
        this.pageNum = i;
      }
    },
    // Pagination 출력
    pages() {
      let list = [];
      for (let i = this.paginationStart; i <= this.paginationEnd; i++) {
        list.push(i);
      }
      return list;
    },
    // Pagination 건너뛸 목록 수
    paginationSkip() {
      return (this.page - 1) * this.rows;
    },
    // 한 페이지당 표출할 row 개수
    paginationRows() {
      return Math.ceil(this.paginationSkip / this.rows) * this.rows + this.rows;
    },
    // Pagination 시작 번호
    paginationStart() {
      const startPage = (parseInt(this.page / this.size - 1) * this.size) + 1;
      return this.page >= this.size ? this.size-1 : startPage;
    },
    // Pagination 끝 번호
    paginationEnd() {
      const lastPage = parseInt(this.page / this.size) * this.size + this.size;
      return lastPage <= this.paginationTotal ? lastPage : this.paginationTotal;
    },
    // Pagination 전체 개수
    paginationTotal() {
      return Math.ceil(this.total / this.rows);
    },
  },
  methods: {
    // Pagination 동작
    onPage(i) {
      this.page = i;

      // Paging 처리된 데이타
      const pageData = this.value.slice(this.paginationSkip, this.paginationRows);

      this.$emit('onPage', {
        page: this.page,
        pageData: pageData,
      });
    },
  },
};
</script>

<style lang="scss"></style>
