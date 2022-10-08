<template>
  <div class="search__wrapper">
    <ui-form class="search__frm" name="searchForm" @onSubmit="onSubmit">
      <div class="search__field" ref="searchField">
        <ui-select name="t"
                   title="검색 옵션"
                   class="search__option" 
                   v-model="t" 
                   :data="tData"
                   :defaultValue="'검색옵션'"
                   :defaultValueDisabled="true"
                   :selectedValue="this.$route.query.t" />

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
                     :checked="(this.$route.query.c === 'Y')" />
      </div>
    </ui-form>

      <p class="search__info">
        <template v-if="posts && posts.length === 0">
          검색 결과를 찾을 수 없습니다.
        </template>
        
        <template v-if="posts && posts.length > 0">
          <strong class="search__info__txt">{{ this.$route.query.q }}</strong>에 대한 검색 결과는
          <strong class="search__info__txt">{{ posts.length }}개</strong>입니다.
      
          <a :href=googleSearchUrl target="_blank" title="새창" rel="noopener noreferrer nofollow" class="btn search__google">
            <i class="xi-google" aria-hidden="true"></i> Google에서 검색
          </a>
        </template>
      </p>

    <div class="search__results__wrapper" ref="resultsWrapper" v-if="posts && posts.length > 0">
      <ul class="post__wrapper search__results">
        <li class="post__wrapper__list" v-for="post in posts" :key="post.id">
          <article>
            <h2 class="post__title">
              <router-link :to="{ path: '/post/' + post.id }">{{ post.title }}</router-link>
            </h2>

            <p class="post__og-image" v-if="post.og_img_url">
              <img :src=post.og_img_url alt="">
            </p>
  
            <p class="post__cont">{{ post.rawText }}</p>

            <div class="post__box__item-wrapper">
              <span class="post__box__item post__box__item--create-at">
                <i class="xi-time-o" aria-hidden="true"></i>
                <span class="sr-only">등록일</span>
                <time :datetime=post.dateTime>{{ post.regDate }}</time>
              </span>
            </div>
          </article>
        </li>
      </ul>

      <a href="#q"
         :class="['btn search__to-input', this.searchToInputActive ? 'search__to-input--active' : '']"
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
      t: this.$route.query.t || '',
      q: this.$route.query.q || '',
      c: this.$route.query.c || 'N',
      tData: [],
      posts: null,
      googleSearchUrl: '',
      searchToInputActive: false,
    }
  },
  async created() {
    // 검색옵션 코드 세팅
    this.$http.get('/code/list/A01')
      .then(res => {
        res.data.forEach((item, idx) => {
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
  mounted() {
    // 검색 파라미터 값이 있으면 검색 메소드 실행
    if (this.$route.query.q) {
      this.listPostSearch({
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
    onSubmit(values) {
      if (!this.t.trim()) {
        snackbar.warning('검색옵션을 선택하세요.');
        return;
      }
      if (!this.q.trim()) {
        snackbar.warning('검색어를 입력하세요.');
        return;
      }

      this.listPostSearch(values);
    },
    // 포스트 검색
    listPostSearch(params) {
      this.$http.get('/post/search', { params: params })
        .then(res => {
          this.posts = res.data;
          this.googleSearchUrl = encodeURI(`https://www.google.com/search?q=site:${this.$rootUrl} ${this.q}`);

          this.$router.push({
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
      if (window.pageYOffset >= this.$refs.resultsWrapper.offsetTop) {
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
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/views/search.scss';
</style>
