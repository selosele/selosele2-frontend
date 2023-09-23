<template>
  <nav class="pagination">
    <ul>
      <li class="pagination__list pagination__list--first">
        <span :tabindex="page <= 1 ? '-1' : '0'"
              :class="['link', { 'link--disabled': page <= 1 }]"
              @click="onPage(1)"
              @keydown.enter="onPage(1)">
          <i class="xi-step-backward" aria-hidden="true"></i>
          <span class="sr-only">첫 번째 페이지</span>
        </span>
      </li>
      <li class="pagination__list pagination__list--prev">
        <span :tabindex="page <= 1 ? '-1' : '0'"
              :class="['link', { 'link--disabled': page <= 1 }]"
              @click="onPage(page - 1)"
              @keydown.enter="onPage(page - 1)">
          <i class="xi-angle-left" aria-hidden="true"></i>
          <span class="sr-only">이전 페이지</span>
        </span>
      </li>

      <li v-for="(num,i) in pages" :key="i"
          :class="['pagination__list', 'pagination__list--num', { 'pagination__list--active': page === num }]">
        <span :tabindex="'0'"
              :title="`${page === num ? '현재 페이지' : ''}`"
              class="link"
              @click="onPage(num)"
              @keydown.enter="onPage(num)">{{ num }}
        </span>
      </li>

      <li class="pagination__list pagination__list--next">
        <span :tabindex="page >= paginationTotal ? '-1' : '0'"
              :class="['link', { 'link--disabled': page >= paginationTotal }]"
              @click="onPage(page + 1)"
              @keydown.enter="onPage(page + 1)">
          <i class="xi-angle-right" aria-hidden="true"></i>
          <span class="sr-only">다음 페이지</span>
        </span>
      </li>
      <li class="pagination__list pagination__list--last">
        <span :tabindex="page >= paginationTotal ? '-1' : '0'"
              :class="['link', { 'link--disabled': page >= paginationTotal }]"
              @click="onPage(paginationTotal)"
              @keydown.enter="onPage(paginationTotal)">
          <i class="xi-step-forward" aria-hidden="true"></i>
          <span class="sr-only">마지막 페이지</span>
        </span>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'UiPagination',
  props: {
    /** Pagination 데이타 */
    value: Array,
    /** Pagination 데이타 총 개수 */
    total: Number,
    /** 시작 페이지 번호 */
    first: {
      type: Number,
      default: 1,
    },
    /** 한 페이지당 표출할 row 개수 */
    rows: {
      type: Number,
      default: 10,
    },
    /** Pagination 개수 */
    size: {
      type: Number,
      default: 5,
    },
    /** 고정글 배치 여부 */
    pin: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      /** Pagination 현재 번호 */
      pageNum: this.first,
      /** 고정글 목록 */
      pinPostList: [],
      /** 비고정글 목록 */
      noPinPostList: [],
      /** 한 페이지당 고정글 개수 제외 표출할 row 개수  */
      computedRows: this.rows,
    }
  },
  created() {
    this.pinPostList = this.findPinPostList(this.value);
    this.noPinPostList = this.findNoPinPostList(this.value);

    if (this.pin) {
      this.computedRows = this.rows - this.pinPostList.length;
    }

    this.onPage(this.page);
  },
  computed: {
    /** Pagination 현재 번호 */
    page: {
      get() {
        return this.pageNum;
      },
      set(i) {
        this.pageNum = i;
      }
    },
    /** Pagination 출력 */
    pages() {
      let list = [];
      for (let i = this.paginationStart; i <= this.paginationEnd; i++) {
        list.push(i);
      }
      return list;
    },
    /** Pagination 건너뛸 목록 수 */
    paginationSkip() {
      return (this.page - 1) * this.computedRows;
    },
    /** 한 페이지당 표출할 row 개수 */
    paginationRows() {
      return Math.ceil(this.paginationSkip / this.computedRows) * this.computedRows + this.computedRows;
    },
    /** Pagination 시작 번호 */
    paginationStart() {
      const startPage = (parseInt(this.page / this.size - 1) * this.size) + 1;
      return this.page >= this.size ? this.size - 1 : startPage;
    },
    /** Pagination 끝 번호 */
    paginationEnd() {
      const lastPage = parseInt(this.page / this.size) * this.size + this.size;
      return lastPage <= this.paginationTotal ? lastPage : this.paginationTotal;
    },
    /** Pagination 전체 개수 */
    paginationTotal() {
      return Math.ceil(this.noPinPostList.length / this.computedRows);
    },
  },
  methods: {
    /** Pagination 동작 */
    onPage(i) {
      if (0 === this.value.length) {
        this.$emit('page', {
          page: 1,
          pageData: [],
        });
        
        return;
      }

      this.page = i;

      // if (0 === this.page) {
      //   if (this.pin) {
      //     this.computedRows = this.rows - this.pinPostList.length;
      //   }
      // } else {
      //   this.computedRows = this.rows;
      // }

      // Paging 처리된 데이타
      let pageData = this.noPinPostList.slice(this.paginationSkip, this.paginationRows);
      
      // 고정글 목록도 같이 넣어준다.
      let collectedPageData = this.collectPageData(pageData);
      
      // 페이지 번호와 매칭되는 데이타가 없으면 1페이지로 이동 (예: 6페이지로 갔는데 데이타가 없을 때)
      if (0 === collectedPageData.length) {
        this.onPage(1);
        return;
      }

      this.$emit('page', {
        page: this.page,
        pageData: collectedPageData,
      });
    },
    /** 고정글 목록 가져오기 */
    findPinPostList(data) {
      return this.pin ? data.filter(d => d.pinYn === 'Y') : data;
    },
    /** 비고정글 목록 가져오기 */
    findNoPinPostList(data) {
      return this.pin ? data.filter(d => d.pinYn === 'N') : data;
    },
    /** 고정글 목록과 비고정글 목록을 합친다. */
    collectPageData(data) {
      if (this.pin) {
        return 0 < data.length ? [...this.pinPostList, ...data] : data;
      }
      return data;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/pagination.scss';
</style>
