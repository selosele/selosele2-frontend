<template>
  <app-content-wrapper>
    <div class="search__wrapper">
      <ui-form :class="'search__frm'" :name="'searchForm'" @onsubmit="onSubmit">
        <div class="search__field" ref="searchField">
          <ui-select
            :name="'t'"
            :id="'t'"
            :title="'검색 옵션'"
            :clazz="['search__option']"
            :data="$store.state.Search.optionSelectList"
            :selectedValue="$route.query['t']"
            v-model="t"
          />

          <ui-text-field
            :type="'search'"
            :name="'q'"
            :id="'q'"
            :ref="'q'"
            :title="'포스트 검색'"
            :placeholder="'검색어를 입력하세요.'"
            v-model="q"
          />

          <ui-icon-button
            :type="'submit'"
            :icon="'xi-search'"
            :text="'검색'"
            :class="'search__btn'"
          />
        </div>

        <div class="search__detail">
          <ui-checkbox
            :name="'c'"
            :id="'c'"
            :label="'대소문자 구분'"
            :values="'Y,N'"
            v-model="c"
          />
        </div>
      </ui-form>

      <ui-skeletor :height="'0.8rem'" v-if="!dataLoaded && this.$route.query['q']" />
      <ui-skeletor :height="'0.8rem'" v-if="!dataLoaded && this.$route.query['q']" />
      <ui-skeletor :height="'0.8rem'" v-if="!dataLoaded && this.$route.query['q']" />

      <template v-else>
        <p class="search__info">
          <template v-if="0 === listCnt">
            검색 결과를 찾을 수 없습니다.
          </template>
          
          <template v-if="postList !== null && postList.length > 0">
            <strong class="search__info__text">{{ $route.query['q'] }}</strong>에 대한 검색 결과는
            <strong class="search__info__text">{{ listCnt }}개</strong>입니다.
  
            <ui-icon-button
              :type="'link'"
              :color="'dark'"
              :icon="'xi-google'"
              :text="'Google에서 검색'"
              :showText="true"
              :class="'search__google'"
              :href="googleSearchUrl"
              :target="'_blank'"
              :title="'새창'"
              :rel="'noopener noreferrer nofollow'"
            />
          </template>
        </p>
  
        <div class="search__results__wrapper" ref="resultsWrapper">
          <app-post-list-detail
            :type="'D01006'"
            :postList="postList"
          />
  
          <div
            class="search__more__wrapper"
            @click="more"
            v-if="listCnt > pageSize && !isLastPage"
          >
            <ui-icon-button
              :icon="'xi-plus-circle'"
              :class="'search__more'"
              :text="'더보기'"
              :showText="true"
            />
          </div>
  
          <ui-icon-button
            :icon="'xi-search'"
            :text="'검색 필드 바로가기'"
            :class="[
              'search__to-input',
              { 'search__to-input--active': toInputActive }
            ]"
            @click="toInput"
          />
        </div>
      </template>
    </div>
  </app-content-wrapper>
</template>

<script>
import AppPostListDetail from '@/components/views/post/AppPostListDetail.vue';
import { messageUtil, isBlank } from '@/utils';

export default {
  name: 'AppSearch',
  components: {
    AppPostListDetail,
  },
  data() {
    return {
      t: this.$route.query['t'] || '001',
      q: this.$route.query['q'] || '',
      c: this.$route.query['c'] || 'N',
      page: 1,
      pageSize: 10,
      listCnt: null,
      postList: [],
      googleSearchUrl: '',
      toInputActive: false,
      isLastPage: false,
      dataLoaded: false,
    }
  },
  async created() {
    // 페이지 타이틀 세팅
    this.$store.dispatch('Breadcrumb/FETCH_PAGE_TITLE', '포스트 검색');

    // 검색키워드 파라미터 값이 있으면 검색 메서드를 실행
    if (this.$route.query['q']) {
      await this.listPostSearch({
        t: this.t,
        q: this.q,
        c: this.c,
        page: this.page,
        pageSize: this.pageSize,
      });
    }
  },
  beforeRouteUpdate(to, from, next) {
    // 페이지 전환 시 검색키워드 파라미터가 없으면 검색결과를 초기화
    if (!to.query['q']) {
      this.postList = null;
    }
    next();
  },
  mounted() {
    document.addEventListener('scroll', this.onScroll);
  },
  unmounted() {
    document.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    /** 초기 세팅 */
    init() {
      this.page = 1;
      this.postList = [];
      this.isLastPage = false;
    },
    /** 포스트 검색 submit */
    async onSubmit(values) {
      const isValid = this.validationCheck();
      if (!isValid) return;
      
      this.init();
      
      values.page = this.page;
      values.pageSize = this.pageSize;
      
      await this.$store.dispatch('Search/GO_SEARCH', values);
    },
    /** 유효성 검사 */
    validationCheck() {
      if (isBlank(this.t)) {
        messageUtil.toastWarning('검색옵션을 선택하세요.');
        return false;
      }
      
      if (isBlank(this.q)) {
        messageUtil.toastWarning('검색어를 입력하세요.');
        return false;
      }

      return true;
    },
    /** 포스트 검색 */
    listPostSearch(params, isMore = false) {
      return this.$http.get('/post/search', { params })
      .then(async resp => {
        this.dataLoaded = true;

        resp.data[0].forEach(d => {
          this.postList.push(d);
        });

        this.listCnt = resp.data[1];

        if (this.listCnt === this.postList.length) {
          this.isLastPage = true;
        }

        this.googleSearchUrl = encodeURI(`https://www.google.com/search?q=${this.q}`);

        // 더보기 버튼 클릭 시, 스크롤 위치가 최상단으로 세팅되는 현상때문에 검색 페이지에서는 페이지 전환이 안되도록 수정
        if (!isMore) {
          await this.$router.push({
            path: '/search', 
            query: {
              q: params['q'], 
              t: params['t'], 
              c: params['c'],
              page: params['page'],
              pageSize: params['pageSize'],
            },
          });
        }
      });
    },
    /** 검색결과 더보기 */
    more() {
      this.page++;

      this.listPostSearch({
        t: this.t,
        q: this.q,
        c: this.c,
        page: this.page,
        pageSize: this.pageSize,
      }, true);
    },
    /** 스크롤 시 검색 input으로 향하는 버튼 toggle */
    onScroll() {
      if (null === this.postList || 0 === this.postList.length) return;

      if (this.$refs['resultsWrapper'] && (window.pageYOffset >= this.$refs['resultsWrapper'].offsetTop)) {
        this.toInputActive = true;
      } else {
        this.toInputActive = false;
      }
    },
    /** 검색 필드로 focus */
    toInput() {
      const st = this.$refs['searchField'].offsetTop - 100;

      window.scrollTo(0, st);
      this.$refs['q'].focus();
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/views/search.scss';
</style>
