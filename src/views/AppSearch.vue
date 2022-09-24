<template>
  <div class="search__wrapper">
    <form method="get" action="/search" class="search__frm" @submit.prevent="search">
      <div class="search__field">
        <select v-model="t" name="t" id="t" title="검색 옵션" class="search__option">
          <option value="0">전체</option>
          <option value="1">제목</option>
          <option value="2">내용</option>
          <option value="3">카테고리</option>
        </select>

        <input type="search" v-model="q" name="q" id="q" title="포스트 검색" placeholder="검색어를 입력하세요." />

        <button type="submit" class="search__btn">
          <i class="xi-search" aria-hidden="true"></i>
          <span class="sr-only">검색</span>
        </button>
      </div>

      <div class="search__detail">
        <input type="checkbox" name="case_sensitive" id="case_sensitive" 
               v-model="c"
               true-value="Y"
               false-value="N" />
        <label for="case_sensitive">대소문자 구분</label>
      </div>
    </form>
  </div>
</template>

<script>
import snackbar from '@/utils/ui/Snackbar';

export default {
  name: 'AppSearch',
  data() {
    return {
      t: '0',
      q: '',
      c: 'N'
    }
  },
  methods: {
    search() {
      if (!this.q.trim()) {
        snackbar.warning('검색어를 입력하세요.');
        return;
      }
      this.$router.push(`/search?q=${this.q}&t=${this.t}&c=${this.c}`);
    }
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/views/search.scss';
</style>
