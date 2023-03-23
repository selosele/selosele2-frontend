<template>
  <ui-modal :title="'방명록 수정'" :name="this.$options.name">
    <ui-form :name="'removeGuestbookForm'" @onsubmit="onSubmit">
      <ui-hidden-field :name="'id'" :value="guestbook.id"></ui-hidden-field>

      <ui-textarea :name="'cont'"
                   :id="'updateGuestbookCont'"
                   :title="'방명록 내용 입력'"
                   :placeholder="'하고싶은 말을 남겨주세요.'"
                   :cols="'30'"
                   :rows="'4'"
                   :resize="'vertical'"
                   :rules="'required|max:1000'"
                   :value="replacedCont">
      </ui-textarea>

      <div class="d-flex-w gap--15 mt--20">
        <label for="updateGuestbookAuthor" class="pt--5">닉네임</label>
        <ui-text-field :type="'text'"
                       :name="'author'"
                       :id="'updateGuestbookAuthor'"
                       :rules="'required|max:20'"
                       :readonly="'Y' === guestbook.adminYn"
                       :value="guestbook.author">
        </ui-text-field>

        <label for="updateGuestbookPw" class="pt--5">비밀번호</label>
        <ui-text-field :type="'password'"
                       :name="'authorPw'"
                       :id="'updateGuestbookPw'"
                       :rules="'required|min:8|max:15'">
        </ui-text-field>

        <ui-button :type="'submit'"
                   :color="'primary'">저장
        </ui-button>
      </div>
    </ui-form>
  </ui-modal>
</template>

<script>
import { messageUtil } from '@/utils';

export default {
  name: 'app-update-guestbook-modal',
  props: {
    /** 방명록 */
    guestbook: Object,
  },
  data() {
    return {
      /** br태그가 치환된 방명록 내용 */
      replacedCont: '',
    }
  },
  created() {
    this.replacedCont = this.guestbook.cont.replaceAll('<br>', '\r\n');
  },
  methods: {
    /** 방명록 수정 */
    async onSubmit(values) {
      const confirm = await messageUtil.confirmSuccess('저장하시겠습니까?');
      if (!confirm) return;

      this.$http.put('/guestbook', values)
      .then(res => {
        messageUtil.toastSuccess('저장되었습니다.');

        this.$modal.hide(this.$options.name);
        this.$store.dispatch('Guestbook/FETCH_UPDATED_GUESTBOOK', res.data);
      });
    },
  },
}
</script>

<style lang="scss" scoped>

</style>