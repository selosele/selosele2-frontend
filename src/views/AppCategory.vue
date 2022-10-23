<template>
  <div class="category__wrapper">
    <template v-if="categoryList.length > 0">
      <ul id="category_list" v-for="(post,i) in categoryList" :key="i">
        <li class="category__item">
          <router-link :to="`/post/${post.id}`">
            <strong class="category__title">{{ post.title }}</strong>
            <span class="category__date">{{ moment(post.regDate).format('YYYY-MM-DD') }}</span>
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
import moment from 'moment';

export default {
  name: 'app-category',
  data() {
    return {
      moment: moment,
      categoryList: [],
      categoryId: '',
    }
  },
  created() {
    this.listPostByCategory();
  },
  watch: {
    $route(to, from) {
      this.listPostByCategory();
    },
  },
  methods: {
    // 카테고리별 포스트 목록 조회
    listPostByCategory() {
      this.categoryId = this.$route.params['categoryId'];
      this.categoryList = [];

      this.$http.get(`/post/category/list/${this.categoryId}`)
        .then(res => {
          res.data.map(d => {
            this.categoryList.push(d);
          });
        });
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/views/archive.scss';
</style>