<template>
  <div class="category__wrapper">
    <template v-if="!dataLoaded">
      <ui-skeletor height="1.3rem" />
      <ui-skeletor height="1.3rem" />
      <ui-skeletor height="1.3rem" />
    </template>

    <template v-else>
      <ul>
        <li class="category__item" v-for="(post,i) in postList" :key="i">
          <router-link :to="`/post/${post.id}`">
            <strong class="category__title">{{ post.title }}</strong>
            <span class="category__date">{{ $moment(post.regDate).format('YYYY.MM.DD') }}</span>
          </router-link>
        </li>
      </ul>

      <button type="button"
              class="more"
              @click="more"
              v-if="listCnt > pageSize && !isLastPage">
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
  props: {
    type: String,
    nm: String,
    id: String,
  },
  data() {
    return {
      page: 1,
      pageSize: 10,
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

      await this.dataLoading();
      await this.listPostByCategory();
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
            this.postList.push(d);
          });

          this.listCnt = res.data[1];

          if (this.listCnt === this.postList.length) {
            this.isLastPage = true;
          }
        }).catch(error => {
          snackbar.error('오류가 발생했습니다.');
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