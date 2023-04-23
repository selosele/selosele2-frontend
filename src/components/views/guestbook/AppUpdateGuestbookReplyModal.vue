<template>
  <ui-modal :title="'방명록 댓글 수정'" :name="this.$options.name" class="guestbook-modal__wrapper">
    <ui-form :name="'removeGuestbookReplyForm'" @onsubmit="onSubmit">
      <ui-hidden-field :name="'id'" :value="guestbookReply.id"></ui-hidden-field>

      <ui-textarea :name="'cont'"
                   :id="'updateGuestbookReplyCont'"
                   :clazz="['guestbook__textarea']"
                   :title="'방명록 내용 입력'"
                   :placeholder="'하고싶은 말을 남겨주세요.'"
                   :cols="'30'"
                   :rows="'4'"
                   :resize="'vertical'"
                   :rules="'required|max:1000'"
                   :value="replacedCont">
      </ui-textarea>

      <div class="guestbook__write__inputs">
        <div class="guestbook__write__input-box">
          <label for="updateGuestbookReplyAuthor" class="guestbook__write__label">닉네임</label>
          <ui-text-field :type="'text'"
                         :name="'author'"
                         :id="'updateGuestbookReplyAuthor'"
                         :clazz="['guestbook__input']"
                         :rules="'required|max:20'"
                         :readonly="'Y' === guestbookReply.adminYn"
                         :value="guestbookReply.author">
          </ui-text-field>
        </div>

        <div class="guestbook__write__input-box">
          <label for="updateGuestbookReplyPw" class="guestbook__write__label">비밀번호</label>
          <ui-text-field :type="'password'"
                         :name="'authorPw'"
                         :id="'updateGuestbookReplyPw'"
                         :clazz="['guestbook__input']"
                         :rules="'required|min:8|max:15'">
          </ui-text-field>
        </div>

        <div class="guestbook__write__btns">
          <ui-button :type="'submit'"
                     :color="'primary'"
                     :class="'guestbook__btn guestbook__btn--write'">저장
          </ui-button>
        </div>
      </div>
    </ui-form>
  </ui-modal>
</template>

<script>
import { messageUtil } from '@/utils';

export default {
  name: 'app-update-guestbook-reply-modal',
  props: {
    /** 방명록 댓글 */
    guestbookReply: Object,
  },
  data() {
    return {
      /** br태그가 치환된 방명록 댓글 내용 */
      replacedCont: '',
    }
  },
  created() {
    this.replacedCont = this.guestbookReply.cont.replaceAll('<br>', '\r\n');
  },
  methods: {
    /** 방명록 댓글 수정 */
    async onSubmit(values) {
      const confirm = await messageUtil.confirmSuccess('저장하시겠습니까?');
      if (!confirm) return;
      
      this.$http.put('/guestbookreply', values)
      .then(res => {
        messageUtil.toastSuccess('저장되었습니다.');

        this.$modal.hide(this.$options.name);
        this.$store.dispatch('Guestbook/FETCH_UPDATED_GUESTBOOK_REPLY', res.data);
      });
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/views/guestbook-modal.scss';
</style>