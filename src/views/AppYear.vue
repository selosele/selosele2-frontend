<template>
  <div class="year__wrapper">
    <ui-skeletor height="6rem" v-if="!loadedData" />
    <ui-skeletor height="6rem" v-if="!loadedData" />

    <template v-else>
      <template v-for="(item,idx) in listYearAndCount" :key="item.year">
        <h2 class="year__list-title">
          <button type="button"
                  :class="['year__list-btn', (idx === activeIndex) && 'year__list-btn--active']"
                  @click="toggleList(item.year, idx)">
            <span class="year__list-name">{{ item.year }}</span>년에 작성된 포스트
            (<span class="sr-only">개수 : </span>{{ item.count }})
          </button>
        </h2>

        <ul class="year__list" v-if="idx === activeIndex">
          <ui-skeletor height="1.35rem" v-if="idx !== itemLoadedIndex" />
          <ui-skeletor height="1.35rem" v-if="idx !== itemLoadedIndex" />

          <template v-if="idx === itemLoadedIndex && listPostsByYear !== null && listPostsByYear.length > 0">
            <li v-for="post in listPostsByYear" :key="post.id">
              <router-link :to="{ path: `/post/${post.id}` }">
                <strong class="year__title">{{ post.title }}</strong>
                <span class="year__date">{{ post.regDate }}</span>
              </router-link>
            </li>
          </template>
        </ul>
      </template>
    </template>
  </div>
</template>

<script>
import snackbar from '@/utils/ui/Snackbar';

export default {
  name: 'app-year',
  data() {
    return {
      activeIndex: -1,
      itemLoadedIndex: -1,
      listLoaded: false,
      listYearAndCount: [],
      listPostsByYear: [],
      loadedData: false,
    }
  },
  created() {
    this.$http.get('/post/year/list')
      .then(res => {
        this.listYearAndCount = res.data;
        this.listLoaded = true;
        this.dataLoading();
      }).catch(error => {
        snackbar.error('오류가 발생했습니다.');
      });
  },
  methods: {
    toggleList(year, idx) {
      if (idx === this.activeIndex) {
        this.listPostsByYear = [];
        this.activeIndex = -1;
        this.itemLoadedIndex = -1;
        return;
      }
      
      this.activeIndex = idx;
      
      this.$http.get(`/post/year/list/${year}`)
        .then(res => {
          this.listPostsByYear = res.data;
          this.itemLoadedIndex = idx;
        }).catch(error => {
          snackbar.error('오류가 발생했습니다.');
        });
    },
    // 검색 데이타 로딩
    dataLoading() {
      setTimeout(() => { this.loadedData = true }, 500);
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/components/year.scss';
</style>
