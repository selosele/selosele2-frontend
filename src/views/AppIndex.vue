<template>
  <ui-loading :activeModel="dataLoaded"
              :fullPage="true" />

  <app-post-list
    v-if="!dataLoaded"
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
import AppPostList from '../components/views/post/AppPostList.vue';
import AppWidgetConfig from '../components/widget/AppWidgetConfig.vue';
import UiPagination from '../components/shared/pagination/UiPagination.vue';

export default {
  name: 'app-index',
  components: {
    AppPostList,
    AppWidgetConfig,
    UiPagination,
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
    await this.dataLoading();
    await this.listPost();
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
        });
    },
    // 데이타 로딩
    dataLoading() {
      this.dataLoaded = true;

      return Promise.resolve(
        setTimeout(() => {
          this.dataLoaded = false;
        }, 1000)
      );
    },
  },
};
</script>

<style lang="scss"></style>