<template>
  <app-content-wrapper>
    <div class="error__wrapper">
      <p class="error__message">방문을 원하시는 페이지의 주소가 잘못 입력되었거나, 변경 혹은 삭제되어 페이지를 찾을 수 없습니다.</p>

      <div class="popular-post__list">
        <h2 class="popular-post__title">이런 글은 어떠신가요?</h2>

        <ul>
          <template v-if="0 < postList.length">
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
  </app-content-wrapper>
</template>

<script>
export default {
  name: 'app-error',
  data() {
    return {
      postList: [],
    }
  },
  async created() {
    
    // 페이지 타이틀 세팅
    this.$store.dispatch('Breadcrumb/FETCH_PAGE_TITLE', '페이지를 찾을 수 없습니다.');

    await this.listPostByLimit(3);
  },
  methods: {
    /** 개수별 포스트 목록 조회 */
    listPostByLimit(limit) {
      return this.$http.get(`/post/limit/${limit}`)
      .then(resp => {
        resp.data.forEach(d => {
          this.postList.push(d);
        });
      });
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/views/error.scss';
@import '@/assets/scss/components/popular.scss';
</style>