<template>
  <div class="post__reply__wrapper">
    <h2>댓글 남기기</h2>

    <ui-form :name="'addReplyForm'" :class="'post__reply__write-frm'" @onsubmit="onSubmit">
      <ui-hidden-field :name="'parentId'" :id="'parentId'" :value="id"></ui-hidden-field>

      <ui-textarea :name="'cont'"
                   :id="'addReplyCont'"
                   :title="'댓글 내용 입력'"
                   :placeholder="'하고싶은 말을 남겨주세요.'"
                   :cols="'30'"
                   :rows="'4'"
                   :resize="'vertical'"
                   :rules="'required'">
      </ui-textarea>

      <div class="post__reply__write__inputs">
        <ui-text-field :type="'text'"
                       :name="'author'"
                       :id="'addPostReplyAuthor'"
                       :class="'post__reply__input'"
                       :label="'닉네임'"
                       :rules="'required|max:20'">
        </ui-text-field>
    
        <ui-text-field :type="'password'"
                       :name="'authorPw'"
                       :id="'addPostReplyAuthorPw'"
                       :class="'post__reply__input'"
                       :label="'비밀번호'"
                       :rules="'required|min:8|max:15'">
        </ui-text-field>
    
        <div class="post__reply__write__btns">
          <ui-button :type="'reset'"
                     :class="'post__reply__btn--reset'">다시작성
          </ui-button>

          <ui-button :type="'submit'"
                     :class="'post__reply__btn--write'">저장
          </ui-button>
        </div>
      </div>
    </ui-form>
  
    <p class="post__reply__no-data" v-if="0 === replyList.length">댓글이 없습니다. 제일 먼저 댓글을 작성해보세요.</p>

    <app-post-reply-list v-else
                         :replyList="replyList"
                         :realReplyList="realReplyList"
                         @refreshList="onRefreshList">
    </app-post-reply-list>
  </div>
</template>

<script>
import AppPostReplyList from './AppPostReplyList.vue';

export default {
  name: 'app-add-post-reply',
  components: {
    AppPostReplyList,
  },
  props: {
    /** 포스트 ID */
    id: Number,
  },
  data() {
    return {
      /** 포스트 댓글 목록 */
      replyList: Array,
      /** 삭제되지 않은 포스트 댓글 목록 */
      realReplyList: Array,
    }
  },
  created() {
    this.listPostReply();
  },
  methods: {
    /** 포스트 댓글 저장 */
    onSubmit(values) {
      console.log(values);
    },
    /** 포스트 댓글 목록 조회 */
    listPostReply() {
      return this.$http.get(`/postreply/list/${this.id}`)
      .then(res => {
        res.data[0].map(d => {
          d.regDate = this.$moment(d.regDate).format('YYYY-MM-DD HH:mm:ss');
        });

        this.replyList = [...res.data[0]];
        this.realReplyList = this.replyList.filter(d => d.delYn === 'N');
      });
    },
    /** 댓글 목록 새로고침 */
    onRefreshList() {
      this.listPostReply();
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/post-reply-list.scss';
</style>