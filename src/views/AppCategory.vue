<template>
  <div class="category__wrapper">
    <template v-if="!dataLoaded">
      <ui-skeletor height="1.3rem" />
      <ui-skeletor height="1.3rem" />
      <ui-skeletor height="1.3rem" />
    </template>

    <template v-else>
      <ul v-for="(post,i) in categoryList" :key="i">
        <li class="category__item">
          <router-link :to="`/post/${post.id}`">
            <strong class="category__title">{{ post.title }}</strong>
            <span class="category__date">{{ $moment(post.regDate).format('YYYY.MM.DD') }}</span>
          </router-link>
        </li>
      </ul>

      <button type="button" class="category__more">
        <i class="xi-ellipsis-h" aria-hidden="true"></i>
        <span class="sr-only">더보기</span>
      </button>
    </template>
  </div>
</template>

<script>
export default {
  name: 'app-category',
  data() {
    return {
      page: 1,
      pageSize: 10,
      categoryList: [],
      categoryId: '',
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
      await this.dataLoading();
      await this.listPostByCategory();
    },
    // 카테고리별 포스트 목록 조회
    listPostByCategory() {
      this.categoryId = this.$route.params['categoryId'];
      this.categoryList = [];

      let paginationDto = {
        page: 1,
        pageSize: 10,
      };

      return this.$http.get(`/post/category/list/${this.categoryId}`, { params: paginationDto })
        .then(res => {
          res.data.map(d => {
            this.categoryList.push(d);
          });

          //this.$route.meta.title = `개발노트 카테고리의 글(9)`;
        });
    },
    // 데이타 로딩
    dataLoading() {
      return Promise.resolve(
        setTimeout(() => {
          this.dataLoaded = true;
        }, 500)
      );
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/views/archive.scss';
</style>