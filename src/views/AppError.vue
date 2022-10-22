<template>
  <div class="error__wrapper">
    <p class="error__message">방문을 원하시는 페이지의 주소가 잘못 입력되었거나, 변경 혹은 삭제되어 페이지를 찾을 수 없습니다.</p>

    <div class="popular-post__list">
      <h2 class="popular-post__title">이런 글은 어떠신가요?</h2>

      <ul>
        <ui-skeletor class="popular-post__list__item" v-if="!loadedData" />
        <ui-skeletor marginTop="0" class="popular-post__list__item" v-if="!loadedData" />
        <ui-skeletor marginTop="0" class="popular-post__list__item" v-if="!loadedData" />

        <template v-if="postList.length > 0 && loadedData">
          <li class="popular-post__list__item" v-for="(post,i) in postList" :key="i">
            <router-link :to="`/post/${post.id}`">
              <p class="popular-post__list__image">
                <img :src="post.ogImgUrl" alt="" v-if="post.ogImgUrl">
                <span class="popular-post__list__no-image" v-else>{{ post.title.substring(0,1) }}</span>
              </p>
              <p class="popular-post__list__title">
                <span>{{ post.title }}</span>
              </p>
            </router-link>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
import snackbar from '@/utils/ui/Snackbar';

export default {
  name: 'app-error',
  data() {
    return {
      postList: [],
      loadedData: false,
    }
  },
  created() {
    // 포스트 3개 조회
    this.$http.get('/post/list/3')
      .then(res => {
        res.data.map(d => {
          this.postList.push(d);
        });
        this.dataLoading();
      }).catch(error => {
        snackbar.error('오류가 발생했습니다.');
      });
  },
  methods: {
    // 검색 데이타 로딩
    dataLoading() {
      setTimeout(() => { this.loadedData = true }, 500);
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/views/error.scss';
@import '@/assets/scss/components/popular.scss';
</style>