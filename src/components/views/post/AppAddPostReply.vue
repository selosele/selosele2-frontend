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
                     :class="'post__reply__btn--reset'">다시 작성
          </ui-button>

          <ui-button :type="'submit'"
                     :class="'post__reply__btn--write'">저장
          </ui-button>
        </div>
      </div>
    </ui-form>
  
    <p class="post__reply__no-data">댓글이 없습니다. 제일 먼저 댓글을 작성해보세요.</p>
  </div>
</template>

<script>
export default {
  name: 'app-add-post-reply',
  props: {
    /** 포스트 ID */
    id: Number,
  },
  methods: {
    /** 포스트 댓글 저장 */
    onSubmit(values) {
      console.log(values);
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/post-reply-list.scss';
</style>