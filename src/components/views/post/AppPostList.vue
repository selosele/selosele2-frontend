<template>
  <div class="post-list__wrapper">
    <ui-form :name="'postListForm'" @onSubmit="onSubmit">
      <div class="post__btn-wrapper" v-if="isLogin && 'main' === type">
        <router-link to="/write" class="post__btn btn btn--light">
          <i class="xi-pen" aria-hidden="true"></i> 포스트 작성
        </router-link>

        <button type="submit" class="post__btn btn btn--dark">
          <i class="xi-trash" aria-hidden="true"></i> 포스트 삭제
        </button>

        <span class="post__check-all">
          <ui-checkbox :name="'checkAll'"
                       :id="'checkAll'"
                       :label="'포스트 전체 선택'"
                       values="Y,N"
                       v-model="checkAll">
          </ui-checkbox>
        </span>
      </div>

      <ul class="post__wrapper">
        <li v-for="(post,i) in postList" :key="i"
            :class="['post__wrapper__list', 
              { 'post__wrapper__list--logined': isLogin },
              { 'post__wrapper__list--secret': 'Y' === post.secretYn },
              { 'post__wrapper__list--pin': 'Y' === post.pinYn },
            ]">
          <span class="post__check only-input" v-if="isLogin">
            <ui-checkbox :name="`checkPost${post.id}`"
                         :id="`checkPost${post.id}`"
                         :class="'post__checkbox'"
                         :label="'포스트 삭제'"
                         :labelHidden="true"
                         :values="`${post.id},N`"
                         v-model="checkList[i]">
            </ui-checkbox>

            <!-- <input type="hidden" :name="`ck${post.id}`" :value="post.id" />
            <input type="checkbox" 
                  :id="`ck${post.id}`"
                  :name="`ck${post.id}`"
                  :value="post.id"
                  v-model="checkList" />
            <label :for="`ck${post.id}`">sfda</label> -->
          </span>

          <article :aria-labelledby="`title${post.id}`" :aria-describedby="`cont${post.id}`" class="post__box">
            <h2 :id="`title${post.id}`" class="post__title">
              <router-link :to="{ path: `/post/${post.id}`, query: { page } }">
                {{ post.title }}
              </router-link>
            </h2>

            <p :id="`cont${post.id}`" class="post__cont">{{ post.rawText }}</p>

            <div class="post__box__item-wrapper">
              <span class="post__box__item post__box__item--regdate">
                <i class="xi-time-o" aria-hidden="true"></i>
                <span class="sr-only">등록일</span>
                <time :datetime="$moment(post.regDate).format('YYYY-MM-DD HH:mm:ss')">
                  {{ $moment(post.regDate).format('YYYY.MM.DD') }}
                </time>
              </span>

              <template v-if="0 < post.postCategory.length">
                <span class="post__box__item post__box__item--category"
                      v-for="(category,j) in post.postCategory" :key="j">
                  <span class="sr-only">카테고리</span> {{ category.category.nm }}
                </span>
              </template>

              <span class="post__box__item post__box__item--like-count">
                <i class="xi-heart-o" aria-hidden="true"></i>
                <span class="sr-only">추천수</span> {{ post.likeCnt }}
              </span>

              <span class="post__box__item post__box__item--comment-count">
                <i class="xi-speech-o" aria-hidden="true"></i>
                <span class="sr-only">댓글수</span> {{ post.replyCnt }}
              </span>
            </div>
          </article>
        </li>
      </ul>
    </ui-form>

    <slot></slot>
  </div>
</template>

<script>
import UiForm from '@/components/shared/form/UiForm.vue';
import UiCheckbox from '@/components/shared/form/UiCheckbox.vue';

export default {
  name: 'app-post-list',
  components: {
    UiForm,
    UiCheckbox,
  },
  props: {
    // main: 메인, search: 검색
    type: String,
    // 현재 페이지 번호
    page: Number,
    // 포스트 목록
    postList: Array,
  },
  data() {
    return {
      initList: [],
      checkList: [],
    }
  },
  mounted() {

  },
  computed: {
    checkAll: {
      get() {
        return this.postList ? this.postList.length === this.checkList.length : false;
      },
      set(v) {
        this.checkList = [];
        
        if ('Y' === v) {
          this.postList.map(d => {
            this.checkList.push(d.id);
          });
        }
      }
    },
  },
  methods: {
    onSubmit(values) {
      // console.log(values);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/views/post.scss';
</style>