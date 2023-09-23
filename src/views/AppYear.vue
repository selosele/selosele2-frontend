<template>
  <app-content-wrapper>
    <div class="year__wrapper">
      <template v-for="(item,i) in yearList" :key="i">
        <h2 class="year__list-title">
          <ui-button :class="[
                      'year__list-btn',
                      { 'year__list-btn--active': i === activeIndex }
                     ]"
                     @click="toggleList(item.year, i)">
            <span class="year__list-name">{{ item.year }}</span>년에 작성된 포스트
            (<span class="sr-only">개수 : </span>{{ item.count }})
          </ui-button>
        </h2>

        <ul class="year__list" v-if="i === activeIndex">
          <template v-if="i === itemLoadedIndex">
            <li v-for="(post,j) in currentPostList" :key="j">
              <router-link :to="`/post/${post.id}`">
                <strong class="year__title">{{ post.title }}</strong>
                <span class="year__date">{{ post.regDate }}</span>
              </router-link>
            </li>
          </template>
        </ul>

        <ui-icon-button :icon="'xi-ellipsis-h'"
                        :text="'더보기'"
                        :class="'btn--more'"
                        @click="onMore(item.year, i)"
                        v-if="i === activeIndex && (listCnt > pageSize) && !isLastPage">
        </ui-icon-button>
      </template>
    </div>
  </app-content-wrapper>
</template>

<script>
export default {
  name: 'AppYear',
  data() {
    return {
      page: 1,
      pageSize: 5,
      listCnt: 0,
      yearList: [],
      currentPostList: [],
      activeIndex: -1,
      itemLoadedIndex: -1,
      isLastPage: false,
    }
  },
  created() {
    // 페이지 타이틀 세팅
    this.$store.dispatch('Breadcrumb/FETCH_PAGE_TITLE', '연도별 모아보기');
    
    this.init();
  },
  methods: {
    /** 초기 세팅 */
    async init() {
      this.page = 1;
      this.isLastPage = false;
      
      await this.listYearAndCount();
    },
    /** 포스트의 연도 및 개수 조회 */
    listYearAndCount() {
      return this.$http.get('/post/year')
      .then(resp => {
        resp.data.forEach(d => {
          this.yearList.push(d);
        });
      });
    },
    /** 목록 toggle */
    toggleList(year, idx) {
      this.listCnt = 0;
      this.currentPostList = [];
      this.isLastPage = false;
      
      if (idx === this.activeIndex) {
        this.updateActiveIndex(-1);
        this.updateItemLoadedIndex(-1);
        return;
      }
      
      this.updateActiveIndex(idx);
      this.listPostByYear(year, idx);
    },
    /** 연도별 포스트 목록 조회 */
    async listPostByYear(year, idx, flag = 'new') {
      let paginationDto = {
        page: this.paginationDto(year)?.page ?? this.page,
        pageSize: this.paginationDto(year)?.pageSize ?? this.pageSize,
      };

      const data = await this.$store.dispatch('Year/GET_YEAR_POSTS', { year, paginationDto, flag });
      const currentData = data[year][0];
      
      currentData.forEach(d => {
        const date = new Date(d.regDate);
        d.regDate = this.$moment(date).format('YYYY.MM.DD');
      });

      this.currentPostList.push(...currentData);
      
      this.listCnt = data[year][1];
      this.updateItemLoadedIndex(idx);

      if (this.listCnt === this.$store.state.Year.data[year][0].length) {
        this.isLastPage = true;
      }
    },
    /** 연도와 매칭되는 페이지네이션 DTO  */
    paginationDto(year) {
      return this.$store.state.Year.data[year]?.paginationDto;
    },
    /** 연도와 매칭되는 데이타가 존재하는지 확인 */
    hasPostList(year) {
      return Object.prototype.hasOwnProperty.call(this.$store.state.Year.data, year);
    },
    /** 로드된 데이타의 Index 업데이트 */
    updateItemLoadedIndex(idx) {
      this.itemLoadedIndex = idx;
    },
    /** 활성화된 버튼의 Index 업데이트 */
    updateActiveIndex(idx) {
      this.activeIndex = idx;
    },
    /** 더보기 */
    onMore(year, idx) {
      this.paginationDto(year).page++;
      this.listPostByYear(year, idx, 'more');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/year.scss';
</style>
