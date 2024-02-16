<template>
  <ul :class="['post__wrapper', { 'search__results': 'D01006' === pageType }]">
    <li class="post__wrapper__list" v-for="(post,i) in postList" :key="i">
      <div :class="['post__wrapper__list__item', 
                  { 'post__wrapper__list__item--logined': isAdmin && 'D01001' === pageType },
                  { 'post__wrapper__list__item--pin': 'Y' === post.pinYn && 'D01001' === pageType },
                  { 'post__wrapper__list__item--tmp': 'Y' === post.tmpYn && 'D01001' === pageType },
                  { 'post__wrapper__list__item--secret': 'Y' === post.secretYn },
                  { 'post__wrapper__list__item--new': isNewPost(post.regDate) },
        ]">
        <span class="post__check only-input" v-if="isAdmin && 'D01001' === pageType">
          <ui-checkbox
            :name="'checkPost'"
            :id="`checkPost${post.id}`"
            :clazz="['post__checkbox']"
            :label="'포스트 삭제'"
            :hideLabel="true"
            :value="post.id"
            v-model="chkList"
            @click="onClick($event)"
          />
        </span>
  
        <article :aria-labelledby="`title${post.id}`" :aria-describedby="`cont${post.id}`" class="post__box">
          <h2 :id="`title${post.id}`" class="post__title">
            <router-link
              :to="{ path: `/post/${post.id}`, query: { page } }"
              :title="post.title"
              v-if="'D01001' === pageType"
            >
              {{ post.title }}
            </router-link>
  
            <router-link
              :to="`/post/${post.id}`"
              :title="post.title"
              v-else
            >
              {{ post.title }}
            </router-link>
          </h2>
  
          <p class="post__og-image" v-if="post.ogImgUrl">
            <span class="post__og-image__box">
              <img :src="post.ogImgUrl" alt="">
            </span>
          </p>
  
          <p :id="`cont${post.id}`" class="post__cont" v-text="post.rawText"></p>
  
          <div class="post__box__item-wrapper">
            <span class="post__box__item post__box__item--regdate">
              <i class="xi-time-o" aria-hidden="true"></i>
              <span class="sr-only">등록일</span>
              <time :datetime="moment(post.regDate).format('YYYY-MM-DD HH:mm:ss')">
                {{ moment(post.regDate).format('YYYY.MM.DD') }}
              </time>
            </span>
  
            <template v-if="0 < post.postCategory.length">
              <span class="post__box__item post__box__item--category"
                    v-for="(category,j) in post.postCategory" :key="j">
                <span class="sr-only">카테고리</span> {{ category.category.nm }}
              </span>
            </template>
  
            <span class="post__box__item post__box__item--like-count" v-if="'D01001' === pageType">
              <i class="xi-heart-o" aria-hidden="true"></i>
              <span class="sr-only">추천수</span> {{ post.likeCnt }}
            </span>
  
            <span class="post__box__item post__box__item--comment-count" v-if="'D01001' === pageType">
              <i class="xi-speech-o" aria-hidden="true"></i>
              <span class="sr-only">댓글수</span> {{ post.replyCnt }}
            </span>
          </div>
        </article>
      </div>
    </li>
  </ul>
</template>

<script>
import moment from 'moment';

export default {
  name: 'AppPostListDetail',
  props: {
    // D01001: 메인, D01006: 검색
    pageType: String,
    // 현재 페이지 번호
    page: Number,
    // 포스트 목록
    postList: Array,
    // 체크박스 삭제용 배열
    checkList: Array,
    // 전체 삭제 체크박스 선택 여부
    checkAll: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      moment: moment,
      nowDate: moment().format('YYYYMMDD'),
    }
  },
  computed: {
    chkList: {
      get() {
        if (!this.checkAll) return [];
        return this.checkList;
      },
      set(v) {}
    },
  },
  methods: {
    isNewPost(regDate) {
      return this.nowDate === moment(regDate).format('YYYYMMDD');
    },
    onClick(e) {
      if (!e.target.checked) {
        // 2022.12.11. 포스트 체크박스 1개를 체크 해제하면 모든 포스트가 체크 해제되서 주석 처리함. 추후 리팩토링
        // this.$store.dispatch('Post/FETCH_CHECKALL', false);
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/post-list-detail.scss';
</style>