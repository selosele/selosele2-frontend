<template>
  <app-content-wrapper>
    <div class="year__wrapper">
      <ui-skeletor :height="'0.8rem'" v-if="!dataLoaded" />
      <ui-skeletor :height="'0.8rem'" v-if="!dataLoaded" />
      <ui-skeletor :height="'0.8rem'" v-if="!dataLoaded" />

      <template v-else>
        <template v-for="(item,i) in $store.state.Year.yearList" :key="i">
          <h2 class="year__list-title">
            <ui-button
              :class="[
                'year__list-btn',
                { 'year__list-btn--active': i === activeIndex }
              ]"
              @click="toggleList(item.year, i)"
            >
              
              <span class="year__list-name">{{ item.year }}</span> 년에 작성된 포스트
              (<span class="sr-only">개수 : </span>{{ item.count }})
            </ui-button>
          </h2>

          <div class="year__list" v-if="i === activeIndex">
            <ui-skeletor :height="'0.8rem'" v-if="!itemLoaded" />
            <ui-skeletor :height="'0.8rem'" v-if="!itemLoaded" />
            <ui-skeletor :height="'0.8rem'" v-if="!itemLoaded" />

            <template v-else>
              <ul v-if="i === itemLoadedIndex">
                <li v-for="(post,j) in currentPostList" :key="j">
                  <router-link :to="`/post/${post.id}`">
                    <strong class="year__title">{{ post.title }}</strong>
                    <span class="year__date">{{ post.regDate }}</span>
                  </router-link>
                </li>
              </ul>
            </template>
          </div>
  
          <ui-icon-button
            :icon="'xi-ellipsis-h'"
            :text="'더보기'"
            :class="'btn--more'"
            @click="onMore(item.year, i)"
            v-if="i === activeIndex && (listCnt > pageSize) && !isLastPage"
          />
        </template>
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
      currentPostList: [],
      activeIndex: -1,
      itemLoadedIndex: -1,
      isLastPage: false,
      dataLoaded: false,
      itemLoaded: false,
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
      
      if (0 === this.$store.state.Year.yearList.length) {
        await this.listYearAndCount();
        return;
      }
      
      this.dataLoaded = true;
    },
    /** 포스트의 연도 및 개수 조회 */
    async listYearAndCount() {
      this.$store.dispatch('Year/LIST_YEAR_AND_COUNT')
      .then(() => {
        this.dataLoaded = true;
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
      this.itemLoaded = false;

      let paginationDto = {
        page: this.paginationDto(year)?.page ?? this.page,
        pageSize: this.paginationDto(year)?.pageSize ?? this.pageSize,
      };

      const data = await this.$store.dispatch('Year/LIST_YEAR_POST', { year, paginationDto, flag });
      const currentData = data[year][0];

      this.itemLoaded = true;
      this.currentPostList.push(...currentData);
      
      this.listCnt = data[year][1];
      this.updateItemLoadedIndex(idx);

      if (this.listCnt === this.$store.state.Year.postList[year][0].length) {
        this.isLastPage = true;
      }
    },
    /** 연도와 매칭되는 페이지네이션 DTO  */
    paginationDto(year) {
      return this.$store.state.Year.postList[year]?.paginationDto;
    },
    /** 연도와 매칭되는 데이터가 존재하는지 확인 */
    hasPostList(year) {
      return Object.prototype.hasOwnProperty.call(this.$store.state.Year.postList, year);
    },
    /** 로드된 데이터의 Index 업데이트 */
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
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/year.scss';
</style>
