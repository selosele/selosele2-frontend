<template>
  <app-content-wrapper :pageTitle="pageTitle">
    <div class="post-view__wrapper">
      <template v-if="!dataLoaded">
        <ui-skeletor :height="'1.3rem'"></ui-skeletor>
        <ui-skeletor :height="'1.3rem'"></ui-skeletor>
        <ui-skeletor :height="'1.3rem'"></ui-skeletor>
      </template>
  
      <template v-if="dataLoaded && null !== post">
        <ui-form :name="'postForm'" @onsubmit="onSubmit">
          <ui-hidden-field :name="'id'" :value="post.id">
          </ui-hidden-field>
    
          <meta property="og:title" :content="post.title">
          <meta property="og:url" :content="$nowUrl">
          <meta property="og:description" :content="post.title">
          <meta property="og:image" :content="post.ogImgUrl">
    
          <!-- START : 콘텐츠 내용 영역 -->
          <div class="post__contents__body line-numbers">
            <Markdown :source="post.cont" :plugins="plugins"></Markdown>
          </div>
          <!-- END : 콘텐츠 내용 영역 -->
    
          <div class="post__contents__like-wrapper">
            <ui-button :class="'post__contents__like-btn'"
                       :title="isPostLiked ? '포스트 추천 해제하기' : '포스트 추천하기'"
                       @click="savePostLike(post.id)">
              <i class="xi-heart" aria-hidden="true" v-if="isPostLiked"></i>
              <i class="xi-heart-o" aria-hidden="true" v-if="!isPostLiked"></i>
              <span class="sr-only">추천수</span>
              <span id="like_cnt" class="post__contents__like-cnt">{{ postLikeCnt }}</span>
            </ui-button>
          </div>
    
          <div class="post__contents__date-wrapper">
            <span class="post__contents__date post__contents__date--create-at">
              <strong>
                <i class="xi-time-o" aria-hidden="true"></i> 등록일
              </strong>
              <time :datetime="post.regDate">{{ post.regDate }}</time>
            </span>
    
            <span class="post__contents__date post__contents__date--modified-at" v-if="post.modDate">
              <strong>
                <i class="xi-time" aria-hidden="true"></i> 수정일
              </strong>
              <time :datetime="post.modDate">{{ post.modDate }}</time>
            </span>
          </div>
    
          <div class="post__contents__info-wrapper">
            <template v-if="0 < post.postCategory.length">
              <router-link v-for="(category,i) in post.postCategory" :key="i"
                          :to="`/category/${category.category.id}`" 
                          class="btn post__contents__info post__contents__info--category">
                <span class="sr-only">카테고리</span>
                <i class="xi-folder-open" aria-hidden="true"></i> {{ category.category.nm }}
              </router-link>
            </template>
            
            <template v-if="0 < post.postTag.length">
              <router-link v-for="(tag,i) in post.postTag" :key="i"
                          :to="`/tag/${tag.tag.id}`" 
                          class="btn post__contents__info post__contents__info--tag">
                <span class="sr-only">태그</span>
                <i class="xi-tags" aria-hidden="true"></i> {{ tag.tag.nm }}
              </router-link>
            </template>
          </div>
    
          <div class="post__contents__btns">
            <ui-button :class="'post__contents__btn post__contents__btn--list'"
                       @click="goToList">
              <i class="xi-backspace" aria-hidden="true"></i>
              <span class="sr-only">목록으로</span>
            </ui-button>
    
            <ui-button :class="'post__contents__btn post__contents__btn--copy'"
                       @click="copyPostUrl">
              <i class="xi-link" aria-hidden="true"></i>
              <span class="sr-only">URL 복사</span>
            </ui-button>
            
            <a :href="`https://twitter.com/intent/tweet?text=${encodeURI(post.title)}%20${encodeURI($nowUrl)}`"
              target="_blank"
              title="새창"
              rel="noopener noreferrer nofollow"
              class="btn post__contents__sns post__contents__sns--twitter">
                <i class="xi-twitter" aria-hidden="true"></i>
                <span class="sr-only">트위터 공유</span>
            </a>
    
            <a :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURI($nowUrl)}`"
              target="_blank"
              title="새창"
              rel="noopener noreferrer nofollow"
              class="btn post__contents__sns post__contents__sns--facebook">
                <i class="xi-facebook-official" aria-hidden="true"></i>
                <span class="sr-only">페이스북 공유</span>
            </a>
    
            <template v-if="isLogin">
              <ui-button :routerLink="'/add-post'"
                        :class="'post__contents__btn post__contents__btn--write'">
                <i class="xi-pen" aria-hidden="true"></i> 포스트 작성
              </ui-button>
    
              <ui-button :routerLink="'/edit-post/14'"
                        :class="'post__contents__btn post__contents__btn--edit'">
                <i class="xi-pen" aria-hidden="true"></i> 포스트 수정
              </ui-button>
    
              <ui-button :type="'submit'"
                        :class="'post__contents__btn post__contents__btn--delete'">
                <i class="xi-trash" aria-hidden="true"></i> 포스트 삭제
              </ui-button>
            </template>
          </div>
    
          <nav class="post__contents__paginations">
            <h2 class="sr-only">이전/다음 포스트</h2>
    
            <router-link v-if="null !== prevPost"
                        :to="`/post/${prevPost.id}`" 
                        rel="prev"
                        title="이전 포스트"
                        class="post__contents__pagination post__contents__pagination--prev">
              <strong>{{ prevPost.title }}</strong>
            </router-link>
    
            <router-link v-if="null !== nextPost"
                        :to="`/post/${nextPost.id}`" 
                        rel="next"
                        title="다음 포스트"
                        class="post__contents__pagination post__contents__pagination--next">
              <strong>{{ nextPost.title }}</strong>
            </router-link>
          </nav>
    
          <div class="post__reply__wrapper">
            <h2>댓글 남기기</h2>
    
            <form :name="'replyForm'" class="post__reply__write-frm">
              <textarea name="post_reply_write_cont" id="post_reply_write_cont" title="댓글 내용 입력" placeholder="하고싶은 말을 남겨주세요." cols="30" rows="4"></textarea>
    
              <div class="post__reply__write__inputs">
                <label for="post_reply_write_author">닉네임
                  <input type="text" name="post_reply_write_author" id="post_reply_write_author" class="post__reply__input" maxlength="20">
                </label>
            
                <label for="post_reply_write_pw">비밀번호
                  <input type="password" name="post_reply_write_pw" id="post_reply_write_pw" class="post__reply__input" minlength="8" maxlength="15">
                </label>
            
                <div class="post__reply__write__btns">
                  <button type="button" data-depth="1" class="btn post__reply__btn--reset">다시 작성</button>
                  <button type="button" data-depth="1" class="btn post__reply__btn--write">등록</button>
                </div>
              </div>
            </form>
          
            <p class="post__reply__no-data">댓글이 없습니다. 제일 먼저 댓글을 작성해보세요.</p>
          </div>
        </ui-form>
      </template>
    </div>
  </app-content-wrapper>
</template>

<script>
import Markdown from 'vue3-markdown-it';
import MarkdownItFootnote from 'markdown-it-footnote';
import { messageUtil, isNotBlank, isNotEmpty } from '@/utils';
import { breadcrumbService } from '@/services/breadcrumb/breadcrumbService';

/**
 * hightlight 테마
 * https://highlightjs.org/static/demo/
 * https://github.com/highlightjs/highlight.js/tree/main/src/styles
 */
import 'highlight.js/styles/stackoverflow-dark.css';

export default {
  name: 'app-post-view',
  components: {
    Markdown,
  },
  data() {
    return {
      plugins: [
        // { plugin: MarkdownItFootnote },
      ],
      pageTitle: '',
      page: this.$route.query.page,
      post: null,
      prevPost: null,
      nextPost: null,
      postUrl: null,
      postLikeCnt: 0,
      isPostLiked: false,
      snsCodeList: [],
      dataLoaded: false,
    }
  },
  created() {
    this.init(this.$route.params.id);
  },
  watch: {
    '$route.params.id'(id) {
      this.init(id);
    }
  },
  methods: {
    /** 초기 세팅 */
    async init(id) {
      this.dataLoaded = false;
      this.post = null;
      this.prevPost = null;
      this.nextPost = null;
      this.postUrl = null;

      await Promise.all([
        this.getPost(id),
        this.getPostLike(id),
        this.listPrevAndNextPost(id),
      ]);

      this.dataLoading();

      this.postUrl = this.$nowUrl;
      this.postLikeCnt = this.post.postLike.length;
      this.snsCodeList = this.$store.state.Code.data
        .filter(d => 'C01' === d.prefix);
    },
    /** 포스트 조회 */
    getPost(id) {
      return this.$http.get(`/post/${id}`)
        .then(res => {
          this.post = { ...res.data };
          this.post.regDate = this.$moment(this.post.regDate).format('YYYY-MM-DD HH:mm:ss');

          if (isNotBlank(this.post.modDate)) {
            this.post.modDate = this.$moment(this.post.modDate).format('YYYY-MM-DD HH:mm:ss');
          }

          // 페이지 타이틀 세팅
          this.pageTitle = this.post.title;
          breadcrumbService.setPageTitle(this.pageTitle);
        });
    },
    /** 이전/다음 포스트 조회 */
    listPrevAndNextPost(id) {
      return this.$http.get(`/post/prevnext/${id}`)
        .then(res => {
          const [prev, next] = res.data;
          this.prevPost = prev || null;
          this.nextPost = next || null;
        });
    },
    /** 포스트 추천 정보 조회 */
    getPostLike(id) {
      return this.$http.get(`/post/like/${id}`)
        .then(res => {
          if (isNotEmpty(res.data)) {
            this.isPostLiked = true;
          } else {
            this.isPostLiked = false;
          }
        });
    },
    /** 포스트 추천/추천 해제 */
    savePostLike(id) {
      return this.$http.post(`/post/like/${id}`)
        .then(res => {
          if (0 === this.postLikeCnt && -1 === res.data) return;
          this.getPostLike(id);
          this.postLikeCnt += res.data;
        });
    },
    /** 포스트 삭제 */
    async onSubmit(values) {
      const confirm = await messageUtil.confirmSuccess('포스트를 삭제하시겠습니까?');
      if (!confirm) return;

      this.$http.delete(`/post/${values.id}`)
        .then(res => {
          messageUtil.toastSuccess('삭제되었습니다.');
          this.goToList();
        });
    },
    /** 목록으로 돌아가기 */
    goToList() {
      this.$router.push({
        path: '/',
        query: {
          page: this.page,
        },
      });
    },
    /** 포스트 URL 복사 */
    copyPostUrl() {
      navigator.clipboard.writeText(this.postUrl);
      messageUtil.toastSuccess('URL이 복사되었습니다.');
    },
    /** 데이타 로딩 */
    dataLoading() {
      if (isNotEmpty(this.post)) {
        this.dataLoaded = true;
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/views/view.scss';
</style>