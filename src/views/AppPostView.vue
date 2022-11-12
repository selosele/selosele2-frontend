<template>
  <template v-if="null !== post">
    <!-- START : 콘텐츠 내용 영역 -->
    <div class="post__contents__body line-numbers">
      <Markdown :source="post.cont" />
    </div>
    <!-- END : 콘텐츠 내용 영역 -->

    <div class="post__contents__like-wrapper">
      <button type="button" class="btn post__contents__like-btn" title="포스트 추천하기">
        <i class="xi-heart-o" aria-hidden="true"></i>
        <span class="sr-only">추천수</span>
        <span id="like_cnt" class="post__contents__like-cnt">{{ post.likeCnt }}</span>
      </button>
    </div>

    <div class="post__contents__date-wrapper">
      <span class="post__contents__date post__contents__date--create-at">
        <strong>
          <i class="xi-time-o" aria-hidden="true"></i> 등록일
        </strong>
        <time :datetime="post.regDate">{{ post.regDate }}</time>
      </span>

      <span class="post__contents__date post__contents__date--modified-at">
        <strong>
          <i class="xi-time" aria-hidden="true"></i> 수정일
        </strong>
        <time :datetime="post.modDate">{{ post.modDate }}</time>
      </span>
    </div>

    <div class="post__contents__info-wrapper">
      <router-link to="/category/개발노트/2" class="btn post__contents__info post__contents__info--category">
        <span class="sr-only">카테고리</span>
        <i class="xi-folder-open" aria-hidden="true"></i> 개발노트
      </router-link>
      <router-link to="/tag/SQL/9" class="btn post__contents__info post__contents__info--tag">
        <span class="sr-only">태그</span>
        <i class="xi-tags" aria-hidden="true"></i> SQL
      </router-link>
    </div>

    <div class="post__contents__btns">
      <button type="button" class="btn post__contents__btn post__contents__btn--list">
        <i class="xi-backspace" aria-hidden="true"></i>
        <span class="sr-only">목록으로</span>
      </button>

      <button type="button" class="btn post__contents__btn post__contents__btn--copy">
        <i class="xi-link" aria-hidden="true"></i>
        <span class="sr-only">포스트 URL 복사</span>
      </button>
      
      <a href="https://twitter.com/intent/tweet?text=Heroku%EC%97%90%EC%84%9C%20MySQL%20auto_increment%20%EB%B9%84%EC%A0%95%EC%83%81%EC%A0%81%EC%9D%B8%20%EC%A6%9D%EA%B0%80%20%EB%AC%B8%EC%A0%9C%20%ED%95%B4%EA%B2%B0%20https%3A%2F%2Fselosele.herokuapp.com%2Fpost%2F3" title="새창" rel="noopener noreferrer nofollow" class="btn post__contents__sns post__contents__sns--twitter">
        <i class="xi-twitter" aria-hidden="true"></i>
        <span class="sr-only">트위터 공유</span>
      </a>

      <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fselosele.herokuapp.com%2Fpost%2F3" title="새창" rel="noopener noreferrer nofollow" class="btn post__contents__sns post__contents__sns--facebook">
        <i class="xi-facebook-official" aria-hidden="true"></i>
        <span class="sr-only">페이스북 공유</span>
      </a>
    </div>

    <nav class="post__contents__paginations">
      <h2 class="sr-only">이전/다음 포스트</h2>

      <router-link to="/post/2" title="이전 포스트" class="post__contents__pagination post__contents__pagination--prev">
        <strong>Programmers SQL 문제풀이 - 없어진 기록 찾기</strong>
      </router-link>
      <router-link to="/post/4" title="다음 포스트" class="post__contents__pagination post__contents__pagination--next">
        <strong>Programmers SQL 문제풀이 - 입양 시각 구하기(2)</strong>
      </router-link>
    </nav>
  </template>

  <div class="post__reply__wrapper">
    <h2>댓글 남기기</h2>

    <form action="/post/reply/write" method="post" class="post__reply__write-frm">
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
</template>

<script>
import Markdown from 'vue3-markdown-it';
import 'highlight.js/styles/monokai.css';

export default {
  name: 'app-post-view',
  components: {
    Markdown,
  },
  data() {
    return {
      id: this.$route.params.id,
      post: null,
    }
  },
  created() {
    this.getPost(this.id);
  },
  methods: {
    // 포스트 조회
    getPost(id) {
      return this.$http.get(`/post/${id}`)
        .then(res => {
          this.post = { ...res.data };
          this.post.regDate = this.$moment(this.post.regDate).format('YYYY-MM-DD HH:mm:ss');
          this.post.modDate = this.$moment(this.post.modDate).format('YYYY-MM-DD HH:mm:ss');
        });
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/views/view.scss';
</style>