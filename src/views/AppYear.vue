<template>
  <div class="year__wrapper">
    <template v-for="(item,idx) in listYearAndCount" :key="item.year">
      <h2 class="year__list-title">
        <button type="button"
                :class="['year__list-btn', (activeIndex === idx) && 'year__list-btn--active']"
                @click="toggleList(item.year, idx)">
          <span class="year__list-name">{{ item.year }}</span>년에 작성된 포스트
          (<span class="sr-only">개수 : </span>{{ item.count }})
        </button>
      </h2>

      <template v-if="activeIndex === idx
                      && listPostsByYear !== null
                      && listPostsByYear.length > 0">
        <ul class="year__list">
          <li v-for="post in listPostsByYear" :key="post.id">
            <router-link :to="{ path: '/post/' + post.id }">
              <strong class="year__title">{{ post.title }}</strong>
              <span class="year__date">{{ post.regDate }}</span>
            </router-link>
          </li>
        </ul>
      </template>
    </template>
  </div>
</template>

<script>
import snackbar from '@/utils/ui/Snackbar';

export default {
  name: 'AppYear',
  data() {
    return {
      listYearAndCount: [],
      listPostsByYear: [],
      activeIndex: -1,
    }
  },
  methods: {
    async toggleList(year, idx) {
      if (this.activeIndex === idx) {
        this.listPostsByYear = [];
        this.activeIndex = -1;
        return;
      }

      this.$http.get(`/post/year/list/${year}`)
        .then(res => {
          this.listPostsByYear = res.data;
          this.activeIndex = idx;
        }).catch(error => {
          snackbar.error('오류가 발생했습니다.');
        });
    },
  },
  async created() {
    this.$http.get('/post/year/list')
      .then(res => {
        this.listYearAndCount = res.data;
      }).catch(error => {
        snackbar.error('오류가 발생했습니다.');
      });
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/components/year.scss';
</style>
