<template>
  <ui-modal :title="'방명록 수정'" :name="this.$options.name" class="guestbook-modal__wrapper">
    <ui-form :name="'removeGuestbookForm'" @onsubmit="onSubmit">
      <ui-hidden-field :name="'id'" :value="guestbook.id" />

      <ui-textarea
        :name="'cont'"
        :id="'updateGuestbookCont'"
        :clazz="['guestbook__textarea']"
        :title="'방명록 내용 입력'"
        :placeholder="'하고싶은 말을 남겨주세요.'"
        :cols="'30'"
        :rows="'4'"
        :resize="'vertical'"
        :rules="'required|max:1000'"
        :value="replacedCont"
      />

      <div class="guestbook__write__inputs">
        <div class="guestbook__write__input-box">
          <label for="updateGuestbookAuthor" class="guestbook__write__label">닉네임</label>
          <ui-text-field
            :name="'author'"
            :id="'updateGuestbookAuthor'"
            :clazz="['guestbook__input']"
            :rules="'required|max:20'"
            :readonly="('Y' === guestbook.adminYn)"
            :value="guestbook.author"
          />
        </div>

        <div class="guestbook__write__input-box">
          <label for="updateGuestbookPw" class="guestbook__write__label">비밀번호</label>
          <ui-text-field
            :type="'password'"
            :name="'authorPw'"
            :id="'updateGuestbookPw'"
            :clazz="['guestbook__input']"
            :rules="'required|min:8|max:15'"
            :readonly="('Y' === guestbook.adminYn)"
            :value="('Y' === guestbook.adminYn ? passwordCode : '')"
          />
        </div>

        <div class="guestbook__write__btns">
          <ui-button
            :type="'submit'"
            :color="'primary'"
            :text="'저장'"
            :class="'guestbook__btn guestbook__btn--write'"
          />
        </div>
      </div>
    </ui-form>
  </ui-modal>
</template>

<script>
import { messageUtil } from '@/utils';

export default {
  name: 'AppUpdateGuestbookModal',
  props: {
    /** 방명록 */
    guestbook: Object,
  },
  data() {
    return {
      /** br태그가 치환된 방명록 내용 */
      replacedCont: '',
      /** 비밀번호 코드 */
      passwordCode: '',
    }
  },
  created() {
    this.replacedCont = this.guestbook.cont.replaceAll('<br>', '\r\n');
    this.passwordCode = this.$store.state.Code.data.find(d => d.id === 'I01001')?.nm;
  },
  methods: {
    /** 방명록 수정 */
    async onSubmit(values) {
      const confirm = await messageUtil.confirmSuccess('저장하시겠습니까?');
      if (!confirm) return;

      this.$http.put('/guestbook', values)
      .then(resp => {
        messageUtil.toastSuccess('저장되었습니다.');

        this.$modal.hide(this.$options.name);
        this.$store.dispatch('Guestbook/FETCH_UPDATED_GUESTBOOK', resp.data);
      });
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/views/guestbook-modal.scss';
</style>