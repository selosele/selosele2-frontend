<template>
  <app-content-wrapper>
    <ui-skeletor :height="'0.8rem'" v-if="!dataLoaded" />
    <ui-skeletor :height="'0.8rem'" v-if="!dataLoaded" />
    <ui-skeletor :height="'0.8rem'" v-if="!dataLoaded" />

    <app-post-list
      v-else
      :pageType="'D01001'"
      :page="page"
      :postList="pagingPostList"
      :categoryList="$store.state.Category.categorySelectList"
      @listPost="listPostByCategory"
      @removePost="refreshPostList"
    >
    
      <ui-pagination
        :value="postList"
        :key="postList"
        :total="listCnt"
        :first="page"
        :rows="storePageSize"
        :size="10"
        :pin="true"
        @page="onPage"
      />
    </app-post-list>

    <app-widget-config v-if="isAdmin" />
  </app-content-wrapper>
</template>

<script>
import AppPostList from '@/components/views/post/AppPostList.vue';
import AppWidgetConfig from '@/components/widget/AppWidgetConfig.vue';
import { isNotEmpty } from '@/utils';
import { isNotBlank } from '../utils';

export default {
  name: 'AppIndex',
  components: {
    AppPostList,
    AppWidgetConfig,
  },
  data() {
    return {
      page: null,
      listCnt: null,
      postList: [],
      pagingPostList: [],
      dataLoaded: false,
    }
  },
  async created() {
    const pageTitle = this.$store.state.BlogConfig.data?.title;
    
    if (isNotBlank(pageTitle)) {
      /**
       * 페이지 타이틀 세팅
       *   - 여기서 페이지타이틀을 세팅하지 않으면, 메인페이지로 왔을 때 페이지타이틀 세팅이 되지 않음
       */
      this.$store.dispatch('Breadcrumb/FETCH_PAGE_TITLE', pageTitle);
    }
    
    this.page = isNotEmpty(this.$route.query.page) ? parseInt(this.$route.query.page) : 1;

    await this.init();
  },
  computed: {
    storePageSize() {
      return this.$store.state.BlogConfig.data?.pageSize;
    },
    storePostList() {
      return this.$store.state.Post.mainPostList.postList;
    },
    storePostListCnt() {
      return this.$store.state.Post.mainPostList.listCnt;
    },
    hasStorePostList() {
      return isNotEmpty(this.storePostList) && 0 < this.storePostList.length;
    },
  },
  methods: {
    /** Pagination 동작 */
    onPage(values) {
      this.page = values.page;
      this.pagingPostList = [...values.pageData];

      this.$store.dispatch('Post/FETCH_CHECKLIST', []);
      this.$store.dispatch('Post/FETCH_CHECKALL', false);
    },
    /** 초기 세팅 */
    async init() {
      if (!this.hasStorePostList) {
        await this.listPost();
        this.dataLoading();
        return;
      }
      
      this.dataLoaded = true;
      this.postList = [...this.storePostList];
      this.listCnt = this.storePostListCnt;
    },
    /** 포스트 목록 조회 */
    async listPost() {
      const listPostDto = { pageType: 'D01001' };
      const { data } = await this.$http.get('/post', { params: listPostDto });

      data[0].forEach(d => {
        this.postList.push(d);
      });
      
      this.listCnt = data[1];

      this.$store.dispatch('Post/FETCH_MAIN_POSTLIST', {
        postList: this.postList,
        listCnt: this.listCnt,
      });

      return data;
    },
    /** 포스트 목록 갱신 */
    async refreshPostList() {
      const post = await this.listPost();
      this.listPostByCategory(post);
    },
    /** 카테고리 필터링 */
    async listPostByCategory(values) {
      await (() => {
        this.dataLoaded = false;
        this.postList = [...values[0]];
        this.listCnt = values[1];
        
        return Promise.resolve();
      })();
      
      this.dataLoading();
    },
    /** 데이터 로딩 */
    dataLoading() {
      if (0 < this.postList.length) {
        this.dataLoaded = true;
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>