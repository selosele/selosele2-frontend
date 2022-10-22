<template>
  <div class="year__wrapper">
    <ui-skeletor height="6rem" v-if="!loadedData" />
    <ui-skeletor height="6rem" v-if="!loadedData" />

    <template v-else>
      <template v-for="(item,i) in listYearAndCount" :key="i">
        <h2 class="year__list-title">
          <button type="button"
                  :class="[
                    'year__list-btn',
                    { 'year__list-btn--active': i === activeIndex }
                    ]"
                  @click="toggleList(item.year, i)">
            <span class="year__list-name">{{ item.year }}</span>년에 작성된 포스트
            (<span class="sr-only">개수 : </span>{{ item.count }})
          </button>
        </h2>

        <ul class="year__list" v-if="i === activeIndex">
          <ui-skeletor height="1.35rem" v-if="i !== itemLoadedIndex" />
          <ui-skeletor height="1.35rem" v-if="i !== itemLoadedIndex" />

          <template v-if="i === itemLoadedIndex && listPostByYear !== null && listPostByYear.length > 0">
            <li v-for="(post,j) in listPostByYear" :key="j">
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
      listPostByYear: [],
      loadedData: false,
    }
  },
  created() {
    this.$http.get('/post/year/list')
      .then(res => {
        res.data.map(d => {
          this.listYearAndCount.push(d);
        });
        this.listLoaded = true;
        this.dataLoading();
      }).catch(error => {
        snackbar.error('오류가 발생했습니다.');
      });
  },
  methods: {
    toggleList(year, idx) {
      if (idx === this.activeIndex) {
        this.listPostByYear = [];
        this.activeIndex = -1;
        this.itemLoadedIndex = -1;
        return;
      }
      
      this.activeIndex = idx;
      
      this.$http.get(`/post/year/list/${year}`)
        .then(res => {
          res.data.map(d => {
            this.listPostByYear.push(d);
          });
          this.itemLoadedIndex = idx;
        }).catch(error => {
          snackbar.error('오류가 발생했습니다.');
        });
    },
    // 데이타 로딩
    dataLoading() {
      setTimeout(() => { this.loadedData = true }, 500);
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/components/year.scss';
</style>
