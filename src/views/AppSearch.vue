<template>
  <app-content-wrapper :pageTitle="pageTitle">
    <div class="search__wrapper">
      <ui-form :class="'search__frm'" :name="'searchForm'" @onSubmit="onSubmit">
        <div class="search__field" ref="searchField">
          <ui-select :name="'t'"
                     :id="'t'"
                     :title="'검색 옵션'"
                     :class="'search__option'"
                     :data="tData"
                     :selectedValue="this.$route.query['t']"
                     v-model="t">
          </ui-select>

          <ui-text-field :type="'search'"
                         :name="'q'"
                         :id="'q'"
                         :ref="'q'"
                         :title="'포스트 검색'"
                         :placeholder="'검색어를 입력하세요.'"
                         v-model="q">
          </ui-text-field>

          <button type="submit" class="search__btn">
            <i class="xi-search" aria-hidden="true"></i>
            <span class="sr-only">검색</span>
          </button>
        </div>

        <div class="search__detail">
          <ui-checkbox :name="'c'"
                       :id="'c'"
                       :label="'대소문자 구분'"
                       :values="'Y,N'"
                       v-model="c">
          </ui-checkbox>
        </div>
      </ui-form>

        <p class="search__info">
          <template v-if="0 === listCnt">
            검색 결과를 찾을 수 없습니다.
          </template>
          
          <template v-if="postList !== null && postList.length > 0">
            <strong class="search__info__txt">{{ this.$route.query['q'] }}</strong>에 대한 검색 결과는
            <strong class="search__info__txt">{{ listCnt }}개</strong>입니다.

            <ui-button :type="'link'"
                       :color="'dark'"
                       :class="'btn--dark search__google'"
                       :href="googleSearchUrl"
                       :target="'_blank'"
                       :title="'새창'"
                       :rel="'noopener noreferrer nofollow'">
              <i class="xi-google" aria-hidden="true"></i> Google에서 검색
            </ui-button>
          </template>
        </p>

      <div class="search__results__wrapper" ref="resultsWrapper">
        <ui-loading :activeModel="!dataLoaded"
                    :fullPage="true"
                    v-if="$route.query['q'] && 0 < postList.length">
        </ui-loading>

        <app-post-list-detail :type="'search'"
                              :postList="postList"
                              v-if="dataLoaded">
        </app-post-list-detail>

        <p class="search__more__wrapper"
           @click="more"
           v-if="listCnt > pageSize && !isLastPage">

          <ui-button :class="'search__more'">
            <i class="xi-plus-circle" aria-hidden="true"></i> 더보기
          </ui-button>
        </p>

        <ui-button :class="[
                    'search__to-input',
                    { 'search__to-input--active': this.toInputActive }
                   ]"
                   @click="toInput">
          <i class="xi-search" aria-hidden="true"></i>
          <span class="sr-only">검색 필드 바로가기</span>
        </ui-button>
      </div>
    </div>
  </app-content-wrapper>
</template>

<script>
import AppPostListDetail from '@/components/views/post/AppPostListDetail.vue';
import { messageUtil } from '@/utils/ui/messageUtil';
import { breadcrumbService } from '@/services/breadcrumb/breadcrumbService';
import { isBlank, isNotEmpty } from '@/utils/util';

export default {
  name: 'app-search',
  components: {
    AppPostListDetail,
  },
  data() {
    return {
      t: this.$route.query['t'] || '001',
      q: this.$route.query['q'] || '',
      c: this.$route.query['c'] || 'N',
      tData: [],
      pageTitle: '포스트 검색',
      page: 1,
      nowPage: 1,
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
    breadcrumbService.setPageTitle(this.pageTitle);

    // 검색옵션 코드 세팅
    this.$store.state.Code.data.map((d,i) => {
      if ('A01' === d.prefix) {
        let obj = {
          value: d.val,
          text: d.nm,
        };
        this.tData.push(obj);
      }
    });

    // 검색키워드 파라미터 값이 있으면 검색 메소드 실행
    if (this.$route.query['q']) {
      await this.listPostSearch({
        t: this.t,
        q: this.q,
        c: this.c,
        page: this.page,
        pageSize: this.pageSize,
      });
      
      this.dataLoading();
    }
  },
  beforeRouteUpdate(to, from, next) {
    // 페이지 전환 시 검색키워드 파라미터가 없으면 검색결과를 초기화
    if (!to.query.q) {
      this.postList = null;
    }
    next();
  },
  mounted() {
    document.addEventListener('scroll', this.scroll);
  },
  unmounted() {
    document.removeEventListener('scroll', this.scroll);
  },
  methods: {
    /** 초기 세팅 */
    init() {
      if (isNotEmpty(localStorage.getItem('searchPage'))) localStorage.removeItem('searchPage');
      if (isNotEmpty(localStorage.getItem('searchPostList'))) localStorage.removeItem('searchPostList');

      this.page = 1;
      this.dataLoaded = false;

      this.postList = [];
      this.isLastPage = false;
    },
    /** 포스트 검색 submit */
    async onSubmit(values) {
      if (isBlank(this.t)) {
        messageUtil.toastWarning('검색옵션을 선택하세요.');
        return;
      }
      
      if (isBlank(this.q)) {
        messageUtil.toastWarning('검색어를 입력하세요.');
        return;
      }
      
      this.init();
      
      values.page = this.page;
      values.pageSize = this.pageSize;
      
      await this.listPostSearch(values);
      this.dataLoading();
    },
    /** 포스트 검색 */
    listPostSearch(params) {
      const storageList = localStorage.getItem('searchPostList');

      return this.$http.get('/post/search', { params: params })
        .then(async res => {
          const resList = storageList ? JSON.parse(storageList) : res.data[0];

          res.data[0].map(d => {
            this.postList.push(d);
          });

          this.listCnt = res.data[1];

          if (this.listCnt === this.postList.length) {
            this.isLastPage = true;
          }

          this.googleSearchUrl = encodeURI(`https://www.google.com/search?q=${this.q}`);

          await this.$router.push({
            path: '/search', 
            query: {
              q: params.q, 
              t: params.t, 
              c: params.c,
            },
          });
        });
    },
    /** 뒤로가기 시 더보기 데이타 유지를 위해 페이지 값과 포스트 목록을 저장 */
    saveToStorage() {
      localStorage.setItem('searchPage', (localStorage.getItem('searchPage') ? this.nowPage : this.page+1));
      localStorage.setItem('searchPostList', JSON.stringify(this.postList));
    },
    /** 더보기 */
    more() {
      const storageList = localStorage.getItem('searchPostList');
      // if (storageList) this.postList = [];

      this.nowPage = parseInt(localStorage.getItem('searchPage')) || this.page;
      this.page++;

      this.listPostSearch({
        t: this.t,
        q: this.q,
        c: this.c,
        page: this.page,
        pageSize: this.pageSize,
      });
    },
    /** 스크롤 시 검색 input으로 향하는 버튼 toggle */
    scroll() {
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
    /** 데이타 로딩 */
    dataLoading() {
      if (0 < this.postList.length) {
        this.dataLoaded = true;
      }
    },
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/views/search.scss';
</style>
