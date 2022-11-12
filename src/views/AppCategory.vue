<template>
  <div class="category__wrapper">
    <template v-if="!dataLoaded">
      <ui-skeletor height="1.3rem" />
      <ui-skeletor height="1.3rem" />
      <ui-skeletor height="1.3rem" />
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
              @click="more"
              v-if="listCnt > pageSize && !isLastPage">
        <i class="xi-ellipsis-h" aria-hidden="true"></i>
        <span class="sr-only">더보기</span>
      </button>
    </template>
  </div>
</template>

<script>
import UiSkeletor from '@/components/shared/skeletor/UiSkeletor.vue';

export default {
  name: 'app-category',
  props: {
    type: String,
    nm: String,
    id: String,
  },
  components: {
    UiSkeletor,
  },
  data() {
    return {
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
    $route(to, from) {
      this.init();
    },
  },
  methods: {
    async init() {
      this.page = 1;
      this.isLastPage = false;
      this.dataLoaded = false;
      this.postList = [];

      await this.listPostByCategory();
      this.dataLoading();
    },
    // 카테고리별 포스트 목록 조회
    listPostByCategory() {
      let paginationDto = {
        page: this.page,
        pageSize: this.pageSize,
      };
      
      return this.$http.get(`/post/${this.type}/list/${this.id}`, { params: paginationDto })
        .then(res => {
          res.data[0].map(d => {
            d.regDate = this.$moment(d.regDate).format('YYYY.MM.DD');
            this.postList.push(d);
          });

          this.listCnt = res.data[1];

          if (this.listCnt === this.postList.length) {
            this.isLastPage = true;
          }
        });
    },
    more() {
      this.page++;
      this.listPostByCategory();
    },
    // 데이타 로딩
    dataLoading() {
      if (0 < this.postList.length) {
        this.dataLoaded = true;
      }
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/views/archive.scss';
</style>