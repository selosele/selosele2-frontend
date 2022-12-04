<template>
  <div class="guestbook__reply__wrapper">
    <ui-form :name="`guestbookReplyForm${idx}`">
      <ui-textarea :name="'cont'"
                   :id="`replyCont${idx}`"
                   :class="'guestbook__reply__cont guestbook__textarea'"
                   :title="'댓글 입력'"
                   :placeholder="'댓글을 남겨주세요.'"
                   :cols="'30'"
                   :rows="'3'"
                   :rules="'required'">
      </ui-textarea>

      <div class="guestbook__reply__btns">
        <div class="guestbook__reply__btns-inner">
          <label :for="`replyAuthor${idx}`">닉네임
            <ui-text-field :type="'text'"
                           :name="'author'"
                           :id="`replyAuthor${idx}`"
                           :class="'guestbook__input'"
                           :rules="'required|maxLength:20'">
            </ui-text-field>
          </label>

          <label :for="`replyPw${idx}`">비밀번호
            <ui-text-field :type="'password'"
                           :name="'authorPw'"
                           :id="`replyPw${idx}`"
                           :class="'guestbook__input'"
                           :rules="'required|minLength:8|maxLength:15'">
            </ui-text-field>
          </label>
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
import UiForm from '@/components/shared/form/UiForm.vue';
import UiTextField from '@/components/shared/form/UiTextField.vue';
import UiTextarea from '@/components/shared/form/UiTextarea.vue';
import UiSkeletor from '@/components/shared/skeletor/UiSkeletor.vue';

export default {
  name: 'app-guestbook-reply',
  props: {
    // 방명록 index
    idx: Number,
  },
  components: {
    UiForm,
    UiTextField,
    UiTextarea,
    UiSkeletor,
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/views/guestbook.scss';
</style>