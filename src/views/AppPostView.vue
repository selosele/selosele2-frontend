<template>
  <app-content-wrapper :pageTitle="pageTitle">
    <div class="post-view__wrapper">
      <template v-if="!dataLoaded">
        <ui-skeletor :height="'1.3rem'"></ui-skeletor>
        <ui-skeletor :height="'1.3rem'"></ui-skeletor>
        <ui-skeletor :height="'1.3rem'"></ui-skeletor>
      </template>
  
      <template v-if="dataLoaded">
        <ui-form :name="'postForm'" @onsubmit="onSubmit">
          <ui-hidden-field :name="'id'" :value="post?.id"></ui-hidden-field>
    
          <!-- START : 내용 영역 -->
          <div class="post__contents__body line-numbers" v-html="post?.cont"></div>
          <!-- END : 내용 영역 -->
    
          <div class="post__contents__like-wrapper">
            <ui-icon-button :icon="isPostLiked ? 'xi-heart' : 'xi-heart-o'"
                            :text="'추천수'"
                            :class="'post__contents__like-btn'"
                            :title="isPostLiked ? '포스트 추천 해제하기' : '포스트 추천하기'"
                            @click="savePostLike(post?.id)">
              <span class="post__contents__like-cnt">{{ postLikeCnt }}</span>
            </ui-icon-button>
          </div>
    
          <div class="post__contents__date-wrapper">
            <span class="post__contents__date post__contents__date--create-at">
              <strong>
                <i class="xi-time-o" aria-hidden="true"></i> 등록일
              </strong>
              <time :datetime="post?.regDate">{{ post?.regDate }}</time>
            </span>
    
            <span class="post__contents__date post__contents__date--modified-at" v-if="post?.modDate">
              <strong>
                <i class="xi-time" aria-hidden="true"></i> 수정일
              </strong>
              <time :datetime="post?.modDate">{{ post?.modDate }}</time>
            </span>
          </div>
    
          <div class="post__contents__info-wrapper">
            <template v-if="0 < post?.postCategory.length">
              <ui-icon-button v-for="(category,i) in post?.postCategory" :key="i"
                              :routerLink="`/category/${category.category.id}`"
                              :icon="'xi-folder-open'"
                              :text="'카테고리'"
                              :class="'post__contents__info post__contents__info--category'">{{ category.category.nm }}
              </ui-icon-button>
            </template>
            
            <template v-if="0 < post?.postTag.length">
              <ui-icon-button v-for="(tag,i) in post?.postTag" :key="i"
                              :routerLink="`/tag/${tag.tag.id}`"
                              :icon="'xi-tags'"
                              :text="'태그'"
                              :class="'post__contents__info post__contents__info--tag'">{{ tag.tag.nm }}
              </ui-icon-button>
            </template>
          </div>
    
          <div class="post__contents__btns">
            <ui-icon-button :icon="'xi-backspace'"
                            :color="'secondary'"
                            :text="'목록으로'"
                            :class="'post__contents__btn post__contents__btn--list'"
                            @click="goToList">
            </ui-icon-button>
    
            <ui-icon-button :icon="'xi-link'"
                            :color="'dark'"
                            :text="'URL 복사'"
                            :class="'post__contents__btn post__contents__btn--copy'"
                            @click="copyPostUrl">
            </ui-icon-button>
            
            <ui-icon-button :href="`https://twitter.com/intent/tweet?text=${encodeURI(post?.title)}%20${encodeURI($nowUrl)}`"
                            :target="'_blank'"
                            :title="'새창'"
                            :rel="'noopener noreferrer nofollow'"
                            :type="'link'"
                            :color="'twitter'"
                            :icon="'xi-twitter'"
                            :text="'트위터 공유'"
                            :class="'post__contents__sns'">
            </ui-icon-button>
    
            <ui-icon-button :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURI($nowUrl)}`"
                            :target="'_blank'"
                            :title="'새창'"
                            :rel="'noopener noreferrer nofollow'"
                            :type="'link'"
                            :color="'facebook'"
                            :icon="'xi-facebook-official'"
                            :text="'페이스북 공유'"
                            :class="'post__contents__sns'">
            </ui-icon-button>
    
            <template v-if="isLogin">
              <ui-icon-button :routerLink="'/add-post'"
                              :color="'primary'"
                              :icon="'xi-pen'"
                              :class="'post__contents__btn'">포스트 작성
              </ui-icon-button>
    
              <ui-icon-button :routerLink="`/edit-post/${post?.id}`"
                              :color="'success'"
                              :icon="'xi-pen'"
                              :class="'post__contents__btn'">포스트 수정
              </ui-icon-button>
    
              <ui-icon-button :type="'submit'"
                              :color="'dark'"
                              :icon="'xi-trash'"
                              :class="'post__contents__btn'">포스트 삭제
              </ui-icon-button>
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
    
          <app-add-post-reply :id="post?.id"></app-add-post-reply>
        </ui-form>
      </template>
    </div>
  </app-content-wrapper>
</template>

<script>
import { messageUtil, isNotBlank, isNotEmpty } from '@/utils';
import { breadcrumbService } from '@/services/breadcrumb/breadcrumbService';
import AppAddPostReply from '@/components/views/post/AppAddPostReply.vue';

/**
 * hightlight 테마
 * https://highlightjs.org/static/demo/
 * https://github.com/highlightjs/highlight.js/tree/main/src/styles
 */
import 'highlight.js/styles/stackoverflow-dark.css';

export default {
  name: 'app-post-view',
  components: {
    AppAddPostReply,
  },
  data() {
    return {
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
      this.snsCodeList = this.$store.state.Code.data.filter(d => d.prefix === 'C01');
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
      return this.$http.get(`/postlike/${id}`)
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
      return this.$http.post(`/postlike/${id}`)
      .then(res => {
        if (0 === this.postLikeCnt && -1 === res.data) return;

        this.getPostLike(id);
        this.postLikeCnt += res.data;
      });
    },
    /** 포스트 삭제 */
    async onSubmit(values) {
      const confirm = await messageUtil.confirmSuccess('삭제하시겠습니까?');
      if (!confirm) return;

      this.$http.delete(`/post/${values.id}`)
      .then(async res => {
        messageUtil.toastSuccess('삭제되었습니다.');
        this.goToList();
      });
    },
    /** 목록으로 돌아가기 */
    goToList() {
      this.$store.dispatch('Post/FETCH_MAIN_POSTLIST', {});
      this.$store.dispatch('Layout/FETCH_SIDEBAR', {});

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