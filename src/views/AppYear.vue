<template>
  <app-content-wrapper :pageTitle="pageTitle">
    <div class="year__wrapper">
      <template v-if="!dataLoaded">
        <ui-skeletor :height="'1.3rem'"></ui-skeletor>
        <ui-skeletor :height="'1.3rem'"></ui-skeletor>
        <ui-skeletor :height="'1.3rem'"></ui-skeletor>
      </template>

      <template v-else>
        <template v-for="(item,i) in yearList" :key="i">
          <h2 class="year__list-title">
            <button type="button"
                    :class="[
                      'year__list-btn',
                      { 'year__list-btn--active': i === activeIndex }
                      ]"
                    @click="toggleList(item.year, i)">
              <span class="year__list-name">{{ item.year }}</span>년에 작성된 포스트
              (<span class="sr-only">개수 : </span>{{ item.count }})
            </button>
          </h2>

          <ul class="year__list" v-if="i === activeIndex">
            <ui-skeletor :height="'1.3rem'" v-if="i !== itemLoadedIndex"></ui-skeletor>
            <ui-skeletor :height="'1.3rem'" v-if="i !== itemLoadedIndex"></ui-skeletor>

            <template v-if="i === itemLoadedIndex && null !== postList && 0 < postList.length">
              <li v-for="(post,j) in postList" :key="j">
                <router-link :to="`/post/${post.id}`">
                  <strong class="year__title">{{ post.title }}</strong>
                  <span class="year__date">{{ post.regDate }}</span>
                </router-link>
              </li>
            </template>
          </ul>

          <button type="button"
                  class="btn--more"
                  @click="onMore(item.year, i)"
                  v-if="i === activeIndex && listCnt > pageSize && !isLastPage">
            <i class="xi-ellipsis-h" aria-hidden="true"></i>
            <span class="sr-only">더보기</span>
          </button>
        </template>
      </template>
    </div>
  </app-content-wrapper>
</template>

<script>
import { messageUtil } from '@/utils/utils';
import { breadcrumbService } from '@/services/breadcrumb/breadcrumbService';

export default {
  name: 'app-year',
  data() {
    return {
      pageTitle: '연도별 모아보기',
      page: 1,
      pageSize: 20,
      listCnt: 0,
      yearList: [],
      postList: [],
      activeIndex: -1,
      itemLoadedIndex: -1,
      dataLoaded: false,
      listLoaded: false,
      isLastPage: false,
    }
  },
  created() {
    // 페이지 타이틀 세팅
    breadcrumbService.setPageTitle(this.pageTitle);
    
    this.init();
  },
  methods: {
    /** 초기 세팅 */
    async init() {
      this.page = 1;
      this.dataLoaded = false;
      this.isLastPage = false;
      
      await this.listYearAndCount();
      this.dataLoading();
    },
    /** 포스트의 연도 및 개수 조회 */
    listYearAndCount() {
      return this.$http.get('/post/year')
        .then(res => {
          res.data.map(d => {
            this.yearList.push(d);
          });
          this.listLoaded = true;
        });
    },
    /** 목록 toggle */
    toggleList(year, idx) {
      this.page = 1;
      this.listCnt = 0;
      this.postList = [];
      this.isLastPage = false;
      
      if (idx === this.activeIndex) {
        this.activeIndex = -1;
        this.itemLoadedIndex = -1;
        return;
      }
      
      this.activeIndex = idx;

      this.listPostByYear(year, idx);
    },
    /** 연도별 포스트 목록 조회 */
    listPostByYear(year, idx) {
      let paginationDto = {
        page: this.page,
        pageSize: this.pageSize,
      };
      
      return this.$http.get(`/post/year/${year}`, { params: paginationDto })
        .then(res => {
          if (0 === res.data[0].length) {
            messageUtil.toastInfo('마지막 페이지입니다.');
            return;
          }

          res.data[0].map(d => {
            d.regDate = this.$moment(d.regDate).format('YYYY.MM.DD');
            this.postList.push(d);
          });

          this.listCnt = res.data[1];
          this.itemLoadedIndex = idx;

          if (this.listCnt === this.postList.length) {
            this.isLastPage = true;
          }
        });
    },
    /** 더보기 */
    onMore(year, idx) {
      this.page++;
      this.listPostByYear(year, idx);
    },
    /** 데이타 로딩 */
    dataLoading() {
      if (0 < this.yearList.length) {
        this.dataLoaded = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/year.scss';
</style>
