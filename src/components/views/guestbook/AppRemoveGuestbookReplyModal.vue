<template>
  <ui-modal :title="'방명록 댓글 삭제'" :name="this.$options.name" class="guestbook-modal__wrapper">
    <ui-form :name="'removeGuestbookReplyForm'" @onsubmit="onSubmit">
      <ui-hidden-field :name="'id'" :value="id" />

      <div class="guestbook__write__input-box no-width">
        <ui-text-field :type="'password'"
                       :name="'authorPw'"
                       :id="'removeGuestbookReplyPw'"
                       :clazz="['guestbook__input']"
                       :title="'비밀번호 입력'"
                       :placeholder="'비밀번호 입력'"
                       :disabled="isLogin"
                       :rules="!isLogin ? 'required|min:8|max:15' : ''">
        </ui-text-field>

        <div class="guestbook__write__btns">
          <ui-button :type="'submit'"
                     :color="'primary'"
                     :class="'guestbook__btn guestbook__btn--write'">삭제
          </ui-button>
        </div>
      </div>
    </ui-form>
  </ui-modal>
</template>

<script>
import { messageUtil } from '@/utils';

export default {
  name: 'app-remove-guestbook-reply-modal',
  props: {
    /** 방명록 댓글 ID */
    id: String,
  },
  methods: {
    /** 방명록 댓글 삭제 */
    async onSubmit(values) {
      const confirm = await messageUtil.confirmSuccess('삭제하시겠습니까?');
      if (!confirm) return;
      
      this.$http.post('/guestbookreply/remove', values)
      .then(res => {
        messageUtil.toastSuccess('삭제되었습니다.');
        
        this.$modal.hide(this.$options.name);
        this.$store.dispatch('Guestbook/FETCH_REMOVED_GUESTBOOK_REPLY', values);
      });
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/views/guestbook-modal.scss';
</style>