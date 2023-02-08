<template>
  <app-content-wrapper :pageTitle="pageTitle">
    <div class="category__wrapper">
      <template v-if="!dataLoaded">
        <ui-skeletor :height="'1.3rem'"></ui-skeletor>
        <ui-skeletor :height="'1.3rem'"></ui-skeletor>
        <ui-skeletor :height="'1.3rem'"></ui-skeletor>
      </template>

      <template v-else>
        <ul>
          <template v-for="(post,i) in postList" :key="i">
            <li :class="[
              'category__item',
              'Y' === post.secretYn && 'category__item--secret']">
              <router-link :to="`/post/${post.id}`">
                <strong class="category__title">{{ post.title }}</strong>
                <span class="category__date">{{ post.regDate }}</span>
              </router-link>
            </li>
          </template>
        </ul>

        <button type="button"
                class="btn--more"
                @click="onMore"
                v-if="listCnt > pageSize && !isLastPage">
          <i class="xi-ellipsis-h" aria-hidden="true"></i>
          <span class="sr-only">더보기</span>
        </button>
      </template>
    </div>
  </app-content-wrapper>
</template>

<script>
import { isNotEmpty } from '@/utils';
import { breadcrumbService } from '@/services/breadcrumb/breadcrumbService';

export default {
  name: 'app-category',
  props: {
    pageType: String,
    id: String,
  },
  data() {
    return {
      pageTitle: '',
      page: 1,
      pageSize: 20,
      listCnt: 0,
      postList: [],
      isLastPage: false,
      dataLoaded: false,
    }
  },
  created() {
    this.init();
  },
  watch: {
    '$route.params.id'(id) {
      this.init();
    }
  },
  methods: {
    /** 초기 세팅 */
    async init() {
      this.page = 1;
      this.isLastPage = false;
      this.dataLoaded = false;
      this.postList = [];

      await this.listPostByCategory();
      this.dataLoading();
    },
    /** 카테고리별 포스트 목록 조회 */
    listPostByCategory() {
      let paginationDto = {
        page: this.page,
        pageSize: this.pageSize,
      };
      
      let category = {};

      return this.$http.get(`/post/${this.getApiUri()}/${this.id}`, { params: paginationDto })
      .then(res => {
        res.data[0].map(d => {
          category.type = isNotEmpty(d.postCategory) ? '카테고리' : '태그';
          category.nm = isNotEmpty(d.postCategory) ? d.postCategory[0].category.nm : d.postTag[0].tag.nm;
          d.regDate = this.$moment(d.regDate).format('YYYY.MM.DD');
          this.postList.push(d);
        });

        this.listCnt = res.data[1];

        if (this.listCnt === this.postList.length) {
          this.isLastPage = true;
        }

        // 페이지 타이틀 세팅
        this.pageTitle = `'${category.nm}' ${category.type}의 글`;
        breadcrumbService.setPageTitle(this.pageTitle);
      });
    },
    /** 더보기 */
    onMore() {
      this.page++;
      this.listPostByCategory();
    },
    /** 페이지 유형에 따른 API 호출 URI 얻기 */
    getApiUri() {
      if ('D01004' === this.pageType) {
        return 'category';
      } else if ('D01005' === this.pageType) {
        return 'tag';
      }

      return '';
    },
    /** 데이타 로딩 */
    dataLoading() {
      if (0 < this.postList.length) {
        this.dataLoaded = true;
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/views/archive.scss';
</style>