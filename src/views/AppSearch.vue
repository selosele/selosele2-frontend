<template>
  <div class="search__wrapper">
    <ui-form :class="'search__frm'" :name="'searchForm'" @onSubmit="onSubmit">
      <div class="search__field" ref="searchField">
        <ui-select :name="'t'"
                   :title="'검색 옵션'"
                   :class="'search__option'" 
                   v-model="t" 
                   :data="tData"
                   :selectedValue="this.$route.query['t']" />

        <ui-form-field :type="'search'"
                       :name="'q'"
                       :id="'q'"
                       :title="'포스트 검색'"
                       :placeholder="'검색어를 입력하세요.'"
                       v-model="q" />

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
                     v-model="c"
                     :checked="('Y' === this.$route.query['c'])" />
      </div>
    </ui-form>

      <p class="search__info">
        <template v-if="0 === listCnt">
          검색 결과를 찾을 수 없습니다.
        </template>
        
        <template v-if="postList !== null && postList.length > 0">
          <strong class="search__info__txt">{{ this.$route.query['q'] }}</strong>에 대한 검색 결과는
          <strong class="search__info__txt">{{ listCnt }}개</strong>입니다.
      
          <a :href="googleSearchUrl"
              target="_blank"
              title="새창"
              rel="noopener noreferrer nofollow"
              class="btn btn--dark search__google">
            <i class="xi-google" aria-hidden="true"></i> Google에서 검색
          </a>
        </template>
      </p>

    <div class="search__results__wrapper" ref="resultsWrapper">
      <ui-loading :activeModel="dataLoaded"
                  :fullPage="true" />

      <ul class="post__wrapper search__results" v-if="!dataLoaded">
        <li class="post__wrapper__list" v-for="(post,i) in postList" :key="i">
          <article>
            <h2 class="post__title">
              <router-link :to="`/post/${post.id}`" @click="saveToStorage">{{ post.title }}</router-link>
            </h2>

            <p class="post__og-image" v-if="post.ogImgUrl">
              <span class="post__og-image__box">
                <img :src="post.ogImgUrl" alt="">
              </span>
            </p>
  
            <p class="post__cont">{{ post.rawText }}</p>

            <div class="post__box__item-wrapper">
              <span class="post__box__item post__box__item--regdate">
                <i class="xi-time-o" aria-hidden="true"></i>
                <span class="sr-only">등록일</span>
                <time :datetime="$moment(post.regDate).format('YYYY-MM-DD HH:mm:ss')">
                  {{ $moment(post.regDate).format('YYYY.MM.DD') }}
                </time>
              </span>

              <template v-if="post.postCategory.length > 0">
                <span class="post__box__item post__box__item--category"
                      v-for="(category,j) in post.postCategory"
                      :key="j">
                  <span class="sr-only">카테고리</span> {{ category.category.nm }}
                </span>
              </template>
            </div>
          </article>
        </li>
      </ul>

      <p class="search__more__wrapper"
          @click="more"
          v-if="listCnt > pageSize && !isLastPage">
        <button type="button" class="btn search__more">
          <i class="xi-plus-circle" aria-hidden="true"></i> 더보기
        </button>
      </p>

      <a href="#q"
        :class="[
          'btn search__to-input',
          { 'search__to-input--active': this.searchToInputActive }
          ]"
        @click.prevent="searchToInput">
        <i class="xi-search" aria-hidden="true"></i>
        <span class="sr-only">검색 필드 바로가기</span>
      </a>
    </div>
  </div>
</template>

<script>
import UiForm from '@/components/shared/form/UiForm.vue';
import UiFormField from '@/components/shared/form/UiFormField.vue';
import UiSelect from '@/components/shared/form/UiSelect.vue';
import UiCheckbox from '@/components/shared/form/UiCheckbox.vue';
import snackbar from '@/utils/ui/Snackbar';

export default {
  name: 'app-search',
  components: {
    UiForm,
    UiFormField,
    UiSelect,
    UiCheckbox,
  },
  data() {
    return {
      t: this.$route.query['t'] || '001',
      q: this.$route.query['q'] || '',
      c: this.$route.query['c'] || 'N',
      tData: [],
      page: 1,
      nowPage: 1,
      pageSize: 10,
      listCnt: null,
      postList: [],
      googleSearchUrl: '',
      searchToInputActive: false,
      isLastPage: false,
      dataLoaded: false,
    }
  },
  async created() {
    // 검색옵션 코드 세팅
    this.$store.state.code.map((d,i) => {
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
      await this.dataLoading();
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
    async onSubmit(values) {
      if (!this.t.trim()) {
        snackbar.warning('검색옵션을 선택하세요.');
        return;
      }
      if (!this.q.trim()) {
        snackbar.warning('검색어를 입력하세요.');
        return;
      }
      await this.dataLoading();

      this.init();

      values.page = this.page;
      values.pageSize = this.pageSize;
      
      await this.listPostSearch(values);
    },
    init() {
      localStorage.getItem('searchPage') && localStorage.removeItem('searchPage');
      localStorage.getItem('searchPostList') && localStorage.removeItem('searchPostList');

      this.page = 1;
      this.dataLoaded = false;

      this.postList = [];
      this.isLastPage = false;
    },
    // 포스트 검색
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
              q: this.q, 
              t: this.t, 
              c: this.c,
            },
          });
        });
    },
    // 뒤로가기 시 더보기 데이타 유지를 위해 페이지 값과 포스트 목록을 저장
    saveToStorage() {
      localStorage.setItem('searchPage', (localStorage.getItem('searchPage') ? this.nowPage : this.page+1));
      localStorage.setItem('searchPostList', JSON.stringify(this.postList));
    },
    // 더보기
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
    // 스크롤 시 검색 input으로 향하는 버튼 toggle
    scroll() {
      if (this.$refs.resultsWrapper && (window.pageYOffset >= this.$refs.resultsWrapper.offsetTop)) {
        this.searchToInputActive = true;
      } else {
        this.searchToInputActive = false;
      }
    },
    // 검색 필드로 focus
    searchToInput() {
      const st = this.$refs.searchField.offsetTop - 100;
      window.scrollTo(0, st);
    },
    // 데이타 로딩
    dataLoading() {
      this.dataLoaded = true;

      return Promise.resolve(
        setTimeout(() => {
          this.dataLoaded = false;
        }, 1000)
      );
    },
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/views/search.scss';
</style>
