<template>
  <ul :class="['post__wrapper', { 'search__results': 'search' === type }]">
    <li class="post__wrapper__list" v-for="(post,i) in postList" :key="i">
      <div :class="['post__wrapper__list__item', 
                  { 'post__wrapper__list__item--logined': isLogin && 'main' === type },
                  { 'post__wrapper__list__item--pin': 'Y' === post.pinYn && 'main' === type },
                  { 'post__wrapper__list__item--secret': 'Y' === post.secretYn },
        ]">
        <span class="post__check only-input" v-if="isLogin && 'main' === type">
          <ui-checkbox :name="`checkPost${post.id}`"
                        :id="`checkPost${post.id}`"
                        :class="'post__checkbox'"
                        :label="'포스트 삭제'"
                        :labelHidden="true"
                        :values="`${post.id},N`">
                        <!-- v-model="checkList[i]" -->
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
            <router-link :to="{ path: `/post/${post.id}`, query: { page } }" v-if="'main' === type">
              {{ post.title }}
            </router-link>
  
            <router-link :to="`/post/${post.id}`" @click="saveToStorage" v-else>{{ post.title }}</router-link>
          </h2>
  
          <p class="post__og-image" v-if="post.ogImgUrl">
            <span class="post__og-image__box">
              <img :src="post.ogImgUrl" alt="">
            </span>
          </p>
  
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
  
            <span class="post__box__item post__box__item--like-count" v-if="'main' === type">
              <i class="xi-heart-o" aria-hidden="true"></i>
              <span class="sr-only">추천수</span> {{ post.likeCnt }}
            </span>
  
            <span class="post__box__item post__box__item--comment-count" v-if="'main' === type">
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
import UiCheckbox from '@/components/shared/form/UiCheckbox.vue';

export default {
  name: 'app-post-list-detail',
  props: {
    // main: 메인, search: 검색
    type: String,
    // 현재 페이지 번호
    page: Number,
    // 포스트 목록
    postList: Array,
    // 체크박스 삭제용 배열
    checkList: Array,
  },
  components: {
    UiCheckbox,
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/post-list-detail.scss';
</style>