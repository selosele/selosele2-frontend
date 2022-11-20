<template>
  <app-content-wrapper :pageTitle="pageTitle">
    <ui-loading :activeModel="!dataLoaded" :fullPage="true"></ui-loading>

    <app-post-list
      v-if="dataLoaded"
      :type="'main'"
      :page="page"
      :postList="pagingPostList">
    
      <ui-pagination :value="postList"
                     :total="listCnt"
                     :first="page"
                     :rows="5"
                     :size="10"
                     @onPage="onPage">
      </ui-pagination>
    </app-post-list>
    <app-widget-config v-if="isLogin" />
  </app-content-wrapper>
</template>

<script>
import UiLoading from '@/components/shared/loading/UiLoading.vue';
import UiPagination from '@/components/shared/pagination/UiPagination.vue';
import AppPostList from '@/components/views/post/AppPostList.vue';
import AppWidgetConfig from '@/components/widget/AppWidgetConfig.vue';
import { isNotEmpty } from '@/utils/util';
import breadcrumbService from '@/services/breadcrumb/breadcrumbService';

export default {
  name: 'app-index',
  components: {
    UiLoading,
    UiPagination,
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
      dataLoaded: false,
    }
  },
  async created() {
    // 페이지 타이틀 세팅
    breadcrumbService.setPageTitle(this.pageTitle);

    this.page = parseInt(this.$route.query.page) || 1;

    if (!this.hasStorePostList) {
      await this.listPost();
      this.dataLoading();
      return;
    }
    this.dataLoaded = true;
    this.postList = [...this.storePostList];
    this.listCnt = this.storePostListCnt;
  },
  computed: {
    storePostList() {
      return this.$store.state.mainPostObj.postList;
    },
    storePostListCnt() {
      return this.$store.state.mainPostObj.listCnt;
    },
    hasStorePostList() {
      return isNotEmpty(this.storePostList) && 0 < this.storePostList.length;
    },
  },
  methods: {
    // Pagination 동작
    onPage(values) {
      this.page = values.page;
      this.pagingPostList = [...values.pageData];
    },
    // 포스트 목록 조회
    listPost() {
      return this.$http.get('/post/list')
        .then(res => {
          res.data[0].map(d => {
            this.postList.push(d);
          });
          
          this.listCnt = res.data[1];

          this.$store.dispatch('FETCH_MAIN_POSTLIST', {
            postList: this.postList,
            listCnt: this.listCnt,
          });
        });
    },
    // 데이타 로딩
    dataLoading() {
      if (0 < this.postList.length) {
        this.dataLoaded = true;
      }
    },
  },
};
</script>

<style lang="scss"></style>