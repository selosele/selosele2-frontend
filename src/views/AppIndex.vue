<template>
  <app-content-wrapper :pageTitle="pageTitle">
    <ui-loading :activeModel="!dataLoaded" :fullPage="true"></ui-loading>

    <app-post-list
      v-if="dataLoaded"
      :type="'main'"
      :page="page"
      :postList="pagingPostList"
      :categoryList="categoryList"
      @listPost="listPostByCategory"
      @removePost="refreshPostList">
    
      <ui-pagination :value="postList"
                     :key="postList"
                     :total="listCnt"
                     :first="page"
                     :rows="storePageSize"
                     :size="10"
                     :pinColumn="'pinYn'"
                     @page="onPage">
      </ui-pagination>
    </app-post-list>

    <app-widget-config v-if="isLogin"></app-widget-config>
  </app-content-wrapper>
</template>

<script>
import AppPostList from '@/components/views/post/AppPostList.vue';
import AppWidgetConfig from '@/components/widget/AppWidgetConfig.vue';
import { isNotEmpty } from '@/utils';
import { breadcrumbService } from '@/services/breadcrumb/breadcrumbService';

export default {
  name: 'app-index',
  components: {
    AppPostList,
    AppWidgetConfig,
  },
  data() {
    return {
      pageTitle: '',
      page: null,
      listCnt: null,
      postList: [],
      pagingPostList: [],
      categoryList: [],
      dataLoaded: false,
    }
  },
  async created() {
    // 페이지 타이틀 세팅
    breadcrumbService.setPageTitle(this.pageTitle);

    this.page = parseInt(this.$route.query.page) || 1;

    this.listCategoryAndCount();

    this.init();
  },
  computed: {
    storePageSize() {
      return this.$store.state.BlogConfig.data?.pageSize;
    },
    storePostList() {
      return this.$store.state.Post.mainPostObj.postList;
    },
    storePostListCnt() {
      return this.$store.state.Post.mainPostObj.listCnt;
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
      const post = await this.$http.get('/post');

      post.data[0].map(d => {
        this.postList.push(d);
      });
      
      this.listCnt = post.data[1];

      this.$store.dispatch('Post/FETCH_MAIN_POSTLIST', {
        postList: this.postList,
        listCnt: this.listCnt,
      });

      return post;
    },
    /** 포스트 목록 갱신 */
    async refreshPostList() {
      const post = await this.listPost();
      this.listPostByCategory(post.data);
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
    /** 카테고리 목록 및 개수 조회 */
    listCategoryAndCount() {
      this.categoryList.push({
        value: '0',
        text: '전체',
      });
      
      return this.$http.get('/category/list/count')
      .then(res => {
        res.data.map(d => {
          this.categoryList.push({
            value: d.id,
            text: d.nm,
          });
        });
      });
    },
    /** 데이타 로딩 */
    dataLoading() {
      if (0 < this.postList.length) {
        this.dataLoaded = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>