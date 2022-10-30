<template>
  <div class="search__wrapper">
    <ui-form class="search__frm" name="searchForm" @onSubmit="onSubmit">
      <div class="search__field" ref="searchField">
        <ui-select name="t"
                   title="검색 옵션"
                   class="search__option" 
                   v-model="t" 
                   :data="tData"
                   :selectedValue="this.$route.query['t']" />

        <ui-form-field type="search"
                       name="q"
                       id="q"
                       title="포스트 검색"
                       placeholder="검색어를 입력하세요."
                       v-model="q" />

        <button type="submit" class="search__btn">
          <i class="xi-search" aria-hidden="true"></i>
          <span class="sr-only">검색</span>
        </button>
      </div>

      <div class="search__detail">
        <ui-checkbox name="c"
                     id="c"
                     label="대소문자 구분"
                     values="Y,N"
                     v-model="c"
                     :checked="(this.$route.query['c'] === 'Y')" />
      </div>
    </ui-form>

      <p class="search__info">
        <template v-if="postList && postList.length === 0">
          검색 결과를 찾을 수 없습니다.
        </template>
        
        <template v-if="postList && postList.length > 0">
          <strong class="search__info__txt">{{ this.$route.query['q'] }}</strong>에 대한 검색 결과는
          <strong class="search__info__txt">{{ postList.length }}개</strong>입니다.
      
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
      <template v-if="!dataLoaded">
        <ui-skeletor height="1.3rem" />
        <ui-skeletor height="1.3rem" />
        <ui-skeletor height="1.3rem" />
      </template>

      <template v-else>
        <ul class="post__wrapper search__results">
          <li class="post__wrapper__list" v-for="(post,i) in postList" :key="i">
            <article>
              <h2 class="post__title">
                <router-link :to="`/post/${post.id}`">{{ post.title }}</router-link>
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
              </div>
            </article>
          </li>
        </ul>

        <a href="#q"
          :class="[
            'btn search__to-input',
            { 'search__to-input--active': this.searchToInputActive }
            ]"
          @click.prevent="searchToInput">
          <i class="xi-search" aria-hidden="true"></i>
          <span class="sr-only">검색 필드 바로가기</span>
        </a>
      </template>
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
      postList: null,
      googleSearchUrl: '',
      searchToInputActive: false,
      dataLoaded: true,
    }
  },
  async created() {
    // 검색옵션 코드 세팅
    this.$http.get('/code/list/A01')
      .then(res => {
        res.data.map((item, idx) => {
          let obj = {
            value: item.val,
            text: item.nm,
          };
          this.tData.push(obj);
        });
      }).catch(error => {
        snackbar.error('오류가 발생했습니다.');
      });
  },
  beforeRouteUpdate(to, from, next) {
    // 페이지 전환 시 검색키워드 파라미터가 없으면 검색결과를 초기화
    if (!to.query.q) {
      this.postList = null;
    }
    next();
  },
  async mounted() {
    // 검색키워드 파라미터 값이 있으면 검색 메소드 실행
    if (this.$route.query['q']) {
      await this.dataLoading();
      await this.listPostSearch({
        t: this.t,
        q: this.q,
        c: this.c,
      });
      document.addEventListener('scroll', this.scroll);
    }
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
      await this.listPostSearch(values);
    },
    // 포스트 검색
    listPostSearch(params) {
      return this.$http.get('/post/search', { params: params })
        .then(async res => {
          this.postList = [];

          res.data.map(d => {
            this.postList.push(d);
          });

          this.googleSearchUrl = encodeURI(`https://www.google.com/search?q=${this.q}`);

          await this.$router.push({
            path: '/search', 
            query: {
              q: this.q, 
              t: this.t, 
              c: this.c,
            }
          });
        }).catch(error => {
          snackbar.error('오류가 발생했습니다.');
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
      this.dataLoaded = false;
      
      return Promise.resolve(
        setTimeout(() => {
          this.dataLoaded = true;
        }, 500)
      );
    },
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/views/search.scss';
</style>
