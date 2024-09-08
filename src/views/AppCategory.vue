<template>
  <app-content-wrapper>
    <div class="category__wrapper">
      <ui-skeletor :height="'0.8rem'" v-if="!dataLoaded" />
      <ui-skeletor :height="'0.8rem'" v-if="!dataLoaded" />
      <ui-skeletor :height="'0.8rem'" v-if="!dataLoaded" />

      <template v-else>
        <div class="category__desc" v-if="'' != desc && null != desc">
          <p>{{ desc }}</p>
        </div>
  
        <ul class="category__list">
          <li v-for="(post,i) in postList" :key="i"
              :class="[
                'category__item',
                'Y' === post.secretYn && 'category__item--secret'
              ]"
          >
            <router-link :to="`/post/${post.id}`">
              <strong class="category__title">{{ post.title }}</strong>
              <span class="category__date">{{ post.regDate }}</span>
            </router-link>
          </li>
        </ul>
  
        <ui-icon-button
          :icon="'xi-ellipsis-h'"
          :text="'더보기'"
          :class="'btn--more'"
          @click="onMore"
          v-if="(listCnt > pageSize) && !isLastPage"
        />
      </template>
    </div>
  </app-content-wrapper>
</template>

<script>
import moment from 'moment';
import { isNotEmpty, isNotBlank } from '@/utils';

export default {
  name: 'AppCategory',
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
      desc: '',
      postList: [],
      isLastPage: false,
    }
  },
  created() {
    this.init();
  },
  watch: {
    '$route.params.id'(id) {
      if (isNotBlank(id)) {
        this.init();
      }
    }
  },
  methods: {
    /** 초기 세팅 */
    async init() {
      this.page = 1;
      this.desc = '';
      this.postList = [];
      this.isLastPage = false;

      await this.listPostByCategory();

      // 페이지 타이틀 세팅
      this.$store.dispatch('Breadcrumb/FETCH_PAGE_TITLE', this.pageTitle);
    },
    /** 카테고리별 포스트 목록 조회 */
    listPostByCategory() {
      let paginationDto = {
        page: this.page,
        pageSize: this.pageSize,
      };
      
      let category = {};

      return this.$http.get(this.getApiUri(), { params: paginationDto })
      .then(resp => {
        this.dataLoaded = true;

        resp.data[0].forEach((d,i) => {
          if (0 === i) {
            if (isNotEmpty(d.postCategory)) {
              this.desc = d.postCategory[0].category.desc;
            }

            if (isNotEmpty(d.postTag)) {
              this.desc = d.postTag[0].tag.desc;
            }
          }

          category.type = isNotEmpty(d.postCategory) ? '카테고리' : '태그';
          category.nm = isNotEmpty(d.postCategory) ? d.postCategory[0].category.nm : d.postTag[0].tag.nm;
          d.regDate = moment(d.regDate).format('YYYY.MM.DD');
          
          this.postList.push(d);
        });

        this.listCnt = resp.data[1];

        if (this.listCnt === this.postList.length) {
          this.isLastPage = true;
        }

        this.pageTitle = `'${category.nm}' ${category.type}의 글`;
        
      });
    },
    /** 더보기 */
    async onMore() {
      this.page++;
      await this.listPostByCategory();
    },
    /** 페이지 유형에 따른 API 호출 URI 반환 */
    getApiUri() {
      if ('D01004' === this.pageType) {
        return `/post/category/${this.id}`;
      } else if ('D01005' === this.pageType) {
        return `/post/tag/${this.id}`;
      }

      return '';
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/views/archive.scss';
</style>