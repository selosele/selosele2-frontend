<template>
  <div class="search__wrapper">
    <form method="post" action="/search" id="searchForm" class="search__frm">
      <input type="hidden" name="_csrf" value="" />

      <div class="search__field">
        <select name="t" id="t" title="검색 옵션" class="search__option">
          <option value="all">전체</option>
          <option value="title">제목</option>
          <option value="raw_text">내용</option>
          <option value="category">카테고리</option>
        </select>

        <input type="search" name="q" id="q" title="포스트 검색" placeholder="검색어를 입력하세요." />

        <button type="button" class="search__btn">
          <i class="xi-search" aria-hidden="true"></i>
          <span class="sr-only">검색</span>
        </button>
      </div>

      <div class="search__detail">
        <input type="checkbox" name="case_sensitive" id="case_sensitive" />
        <label for="case_sensitive">대소문자 구분</label>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Search',
};
</script>

<style lang="scss">
@import '@/assets/scss/views/search.scss';
</style>
