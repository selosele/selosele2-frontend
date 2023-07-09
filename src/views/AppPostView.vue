<template>
  <app-content-wrapper :pageTitle="pageTitle">
    <div class="post-view__wrapper">
      <template v-if="dataLoaded">
        <ui-form :name="'postForm'" @onsubmit="onSubmit">
          <ui-hidden-field :name="'id'" :value="post?.id" />
    
          <!-- START : 내용 영역 -->
          <div class="post__contents__body line-numbers" v-html="post?.cont"></div>
          <!-- END : 내용 영역 -->
    
          <div class="post__contents__like-wrapper" v-if="isPostPage">
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
          </div>
    
          <div class="post__contents__info-wrapper" v-if="isPostPage">
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
                            @click="goToList"
                            v-if="isPostPage">
            </ui-icon-button>
    
            <ui-icon-button :icon="'xi-link'"
                            :color="'dark'"
                            :text="'URL 복사'"
                            :class="'post__contents__btn post__contents__btn--copy'"
                            @click="copyPostUrl">
            </ui-icon-button>
            
            <ui-icon-button :href="`https://twitter.com/intent/tweet?text=${encodeURI(post?.title)}%20${encodeURI(postUrl)}`"
                            :target="'_blank'"
                            :title="'새창'"
                            :rel="'noopener noreferrer nofollow'"
                            :type="'link'"
                            :color="'twitter'"
                            :icon="'xi-twitter'"
                            :text="'트위터 공유'"
                            :class="'post__contents__sns'">
            </ui-icon-button>
    
            <ui-icon-button :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURI(postUrl)}`"
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
              <ui-icon-button :routerLink="isPostPage ? '/add-post' : '/add-content'"
                              :color="'primary'"
                              :icon="'xi-pen'"
                              :class="'post__contents__btn'">{{ isPostPage ? '포스트' : '콘텐츠' }} 작성
              </ui-icon-button>
    
              <ui-icon-button :routerLink="isPostPage ? `/edit-post/${post?.id}` : `/edit-content${post?.link}`"
                              :color="'success'"
                              :icon="'xi-pen'"
                              :class="'post__contents__btn'">{{ isPostPage ? '포스트' : '콘텐츠' }} 수정
              </ui-icon-button>
    
              <ui-icon-button :type="'submit'"
                              :color="'dark'"
                              :icon="'xi-trash'"
                              :class="'post__contents__btn'">{{ isPostPage ? '포스트' : '콘텐츠' }} 삭제
              </ui-icon-button>
            </template>
          </div>
    
          <nav class="post__contents__paginations" v-if="isPostPage">
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
    
          <app-add-post-reply :id="post?.id"
                              v-if="isPostPage">
          </app-add-post-reply>
        </ui-form>
      </template>
    </div>
  </app-content-wrapper>
</template>

<script>
import { messageUtil, isNotBlank, isNotEmpty } from '@/utils';
import { BreadcrumbService } from '@/services/breadcrumb/breadcrumbService';
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
      postUrl: '',
      postLikeCnt: 0,
      isPostLiked: false,
      snsCodeList: [],
      breadcrumbService: null,
      dataLoaded: false,
    }
  },
  created() {
    this.init(this.$route.params.id);
    this.breadcrumbService = new BreadcrumbService();
  },
  watch: {
    '$route.params.id'(id) {
      this.init(id);
    }
  },
  computed: {
    /** 포스트 페이지인지 확인 */
    isPostPage: {
      get() {
        return 'D01002' === this.$route.meta.pageType;
      },
      set(v) {}
    },
    /** 콘텐츠 페이지인지 확인 */
    isContentPage: {
      get() {
        return 'D01003' === this.$route.meta.pageType;
      },
      set(v) {}
    },
  },
  methods: {
    /** 초기 세팅 */
    async init(id) {
      this.post = null;
      this.prevPost = null;
      this.nextPost = null;
      this.postUrl = location.href;

      if (this.isPostPage) {
        await Promise.all([
          this.getPost(id),
          this.getPostLike(id),
          this.listPrevAndNextPost(id),
        ]);

        this.postLikeCnt = this.post.postLike.length;
      } else if (this.isContentPage) {
        await this.getPost(id);
      }

      this.snsCodeList = this.$store.state.Code.data.filter(d => d.prefix === 'C01');
    },
    /** 포스트 조회 */
    getPost(id) {
      let url = this.isPostPage ? `/post/${id}` : `/content/${id}`;

      return this.$http.get(url)
      .then(res => {
        this.dataLoaded = true;
        this.post = { ...res.data };
        this.post.regDate = this.$moment(this.post.regDate).format('YYYY-MM-DD HH:mm:ss');

        if (isNotBlank(this.post.modDate)) {
          this.post.modDate = this.$moment(this.post.modDate).format('YYYY-MM-DD HH:mm:ss');
        }

        // 페이지 타이틀 세팅
        this.pageTitle = this.post.title;
        this.breadcrumbService.setPageTitle(this.pageTitle);
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
      const savePostLikeDto = {
        postId: id,
        title: this.breadcrumbService.getPageTitle(),
      };

      this.$store.commit('Loading/SET_USE_LOADING', false);

      return this.$http.post('/postlike', savePostLikeDto)
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

      let url = this.isPostPage ? `/post/${values.id}` : `/content/${values.id}`;

      this.$http.delete(url)
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
      navigator.clipboard.writeText(location.href);
      messageUtil.toastSuccess(`${this.isPostPage ? '포스트' : '콘텐츠'} URL이 복사되었습니다.`);
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/views/view.scss';
</style>