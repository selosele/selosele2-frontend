<template>
  <div class="guestbook__reply__wrapper">
    <ui-form :name="`guestbookReplyForm${idx}`">
      <ui-textarea :name="'cont'"
                   :id="`guestbookReplyCont${idx}`"
                   :class="'guestbook__reply__cont guestbook__textarea'"
                   :title="'댓글 입력'"
                   :placeholder="'댓글을 남겨주세요.'"
                   :cols="'30'"
                   :rows="'3'"
                   :rules="'required'">
      </ui-textarea>

      <div class="guestbook__reply__btns">
        <div class="guestbook__reply__btns-inner">
          <label :for="`guestbookReplyAuthor${idx}`" class="pt--5">닉네임</label>
          <ui-text-field :type="'text'"
                         :name="'author'"
                         :id="`guestbookReplyAuthor${idx}`"
                         :class="'guestbook__input'"
                         :rules="'required|max:20'">
          </ui-text-field>

          <label :for="`guestbookReplyPw${idx}`" class="pt--5">비밀번호</label>
          <ui-text-field :type="'password'"
                         :name="'authorPw'"
                         :id="`guestbookReplyPw${idx}`"
                         :class="'guestbook__input'"
                         :rules="'required|min:8|max:15'">
          </ui-text-field>
        </div>

        <ui-button :type="'submit'"
                   :color="'primary'"
                   :class="'guestbook__btn guestbook__btn--reply-write'">저장
        </ui-button>
      </div>
    </ui-form>
  </div>
</template>

<script>
export default {
  name: 'app-guestbook-reply',
  props: {
    /** 방명록 index */
    idx: Number,
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/views/guestbook.scss';
</style>