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

      <button type="button"
              class="category__more"
              @click="more"
              v-if="listCnt > pageSize">
        <i class="xi-ellipsis-h" aria-hidden="true"></i>
        <span class="sr-only">더보기</span>
      </button>
    </template>
  </div>
</template>

<script>
import snackbar from '@/utils/ui/Snackbar';

export default {
  name: 'app-category',
  data() {
    return {
      page: 1,
      pageSize: 10,
      listCnt: 0,
      categoryList: [],
      categoryId: '',
      categoryNm: '',
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
      this.dataLoaded = false;
      this.categoryList = [];
      await this.dataLoading();
      await this.listPostByCategory();
    },
    // 카테고리별 포스트 목록 조회
    listPostByCategory() {
      this.categoryId = this.$route.params['categoryId'];
      
      let paginationDto = {
        page: this.page,
        pageSize: this.pageSize,
      };
      
      return this.$http.get(`/post/category/list/${this.categoryId}`, { params: paginationDto })
        .then(res => {
          if (res.data[0].length === 0) {
            snackbar.info('마지막 페이지입니다.');
            return;
          }

          res.data[0].map(d => {
            this.categoryList.push(d);
            this.categoryNm = d.postCategory[0].category.nm;
          });

          this.listCnt = res.data[1];

          //this.$route.meta.title = `'${this.categoryNm}' 카테고리의 글(${this.listCnt})`;
        });
    },
    more() {
      this.page++;
      this.listPostByCategory();
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