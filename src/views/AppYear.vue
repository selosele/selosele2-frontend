<template>
  <div class="year__wrapper">
    <ui-skeletor height="1.3rem" v-if="!dataLoaded" />
    <ui-skeletor height="1.3rem" v-if="!dataLoaded" />
    <ui-skeletor height="1.3rem" v-if="!dataLoaded" />

    <template v-else>
      <template v-for="(item,i) in yearList" :key="i">
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
          <ui-skeletor height="1.3rem" v-if="i !== itemLoadedIndex" />
          <ui-skeletor height="1.3rem" v-if="i !== itemLoadedIndex" />

          <template v-if="i === itemLoadedIndex && postList !== null && postList.length > 0">
            <li v-for="(post,j) in postList" :key="j">
              <router-link :to="`/post/${post.id}`">
                <strong class="year__title">{{ post.title }}</strong>
                <span class="year__date">{{ post.regDate }}</span>
              </router-link>
            </li>
          </template>
        </ul>

        <button type="button"
              class="more"
              @click="more(item.year, i)"
              v-if="i === activeIndex && listCnt > pageSize && !isLastPage">
          <i class="xi-ellipsis-h" aria-hidden="true"></i>
          <span class="sr-only">더보기</span>
        </button>
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
      page: 1,
      pageSize: 10,
      listCnt: 0,
      yearList: [],
      postList: [],
      activeIndex: -1,
      itemLoadedIndex: -1,
      dataLoaded: false,
      listLoaded: false,
      isLastPage: false,
    }
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      this.page = 1;
      this.dataLoaded = false;
      this.isLastPage = false;

      await this.dataLoading();
      await this.listYearAndCount();
    },
    listYearAndCount() {
      return this.$http.get('/post/year/list')
        .then(res => {
          res.data.map(d => {
            this.yearList.push(d);
          });
          this.listLoaded = true;
        }).catch(error => {
          snackbar.error('오류가 발생했습니다.');
        });
    },
    toggleList(year, idx) {
      this.page = 1;
      this.listCnt = 0;
      this.postList = [];
      this.isLastPage = false;
      
      if (idx === this.activeIndex) {
        this.activeIndex = -1;
        this.itemLoadedIndex = -1;
        return;
      }
      
      this.activeIndex = idx;

      this.listPostByYear(year, idx);
    },
    listPostByYear(year, idx) {
      let paginationDto = {
        page: this.page,
        pageSize: this.pageSize,
      };
      
      return this.$http.get(`/post/year/list/${year}`, { params: paginationDto })
        .then(res => {
          if (0 === res.data[0].length) {
            snackbar.info('마지막 페이지입니다.');
            return;
          }

          res.data[0].map(d => {
            d.regDate = this.$moment(d.regDate).format('YYYY.MM.DD');
            this.postList.push(d);
          });

          this.listCnt = res.data[1];
          this.itemLoadedIndex = idx;

          if (this.listCnt === this.postList.length) {
            this.isLastPage = true;
          }
        }).catch(error => {
          snackbar.error('오류가 발생했습니다.');
        });
    },
    more(year, idx) {
      this.page++;
      this.listPostByYear(year, idx);
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
};
</script>

<style lang="scss">
@import '@/assets/scss/components/year.scss';
</style>
