<template>
  <app-content-wrapper>
    <div class="category__wrapper">
      <ul class="category__list">
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

      <ui-icon-button :icon="'xi-ellipsis-h'"
                      :text="'더보기'"
                      :class="'btn--more'"
                      @click="onMore"
                      v-if="listCnt > pageSize && !isLastPage">
      </ui-icon-button>
    </div>
  </app-content-wrapper>
</template>

<script>
import { isNotEmpty } from '@/utils';

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
      this.postList = [];

      await this.listPostByCategory();
    },
    /** 카테고리별 포스트 목록 조회 */
    listPostByCategory() {
      let paginationDto = {
        page: this.page,
        pageSize: this.pageSize,
      };
      
      let category = {};

      return this.$http.get(`${this.getApiUri()}/${this.id}`, { params: paginationDto })
      .then(resp => {
        resp.data[0].map(d => {
          category.type = isNotEmpty(d.postCategory) ? '카테고리' : '태그';
          category.nm = isNotEmpty(d.postCategory) ? d.postCategory[0].category.nm : d.postTag[0].tag.nm;
          d.regDate = this.$moment(d.regDate).format('YYYY.MM.DD');
          
          this.postList.push(d);
        });

        this.listCnt = resp.data[1];

        if (this.listCnt === this.postList.length) {
          this.isLastPage = true;
        }

        // 페이지 타이틀 세팅
        this.pageTitle = `'${category.nm}' ${category.type}의 글`;
        this.$store.dispatch('Breadcrumb/FETCH_PAGE_TITLE', this.pageTitle);
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
        return '/post/category';
      } else if ('D01005' === this.pageType) {
        return '/post/tag';
      }

      return '';
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/views/archive.scss';
</style>