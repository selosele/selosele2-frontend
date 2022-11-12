<template>
  <ui-loading :activeModel="!dataLoaded"
              :fullPage="true" />

  <app-post-list
    v-if="dataLoaded"
    :type="'main'"
    :postList="pagingPostList">
  
    <ui-pagination :value="postList"
                   :total="listCnt"
                   :rows="5"
                   :size="10"
                   @onPage="onPage" />
  </app-post-list>
  <app-widget-config v-if="isLogin" />
</template>

<script>
import UiLoading from '@/components/shared/loading/UiLoading.vue';
import UiPagination from '../components/shared/pagination/UiPagination.vue';
import AppPostList from '../components/views/post/AppPostList.vue';
import AppWidgetConfig from '../components/widget/AppWidgetConfig.vue';
import { isNotEmpty } from '@/utils/util';

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
      listCnt: null,
      postList: [],
      pagingPostList: [],
      dataLoaded: false,
    }
  },
  async created() {
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
      return this.$store.getters.mainPostObj.postList;
    },
    storePostListCnt() {
      return this.$store.getters.mainPostObj.listCnt;
    },
    hasStorePostList() {
      return isNotEmpty(this.storePostList)
            && 0 < this.storePostList.length;
    },
  },
  methods: {
    // Pagination 동작
    onPage(values) {
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