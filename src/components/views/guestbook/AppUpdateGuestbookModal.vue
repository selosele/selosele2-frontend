<template>
  <ui-modal :title="'방명록 수정'" :name="this.$options.name">
    <ui-form :name="'removeGuestbookForm'" @onSubmit="onSubmit">
      <ui-hidden-field :name="'id'" :value="guestbook.id">
      </ui-hidden-field>

      <ui-textarea :name="'cont'"
                   :id="'guestbookUpdateCont'"
                   :class="'resize--vertical'"
                   :title="'방명록 내용 입력'"
                   :placeholder="'하고싶은 말을 남겨주세요.'"
                   :cols="'30'"
                   :rows="'4'"
                   :rules="'required'"
                   :value="guestbook.cont">
      </ui-textarea>

      <div class="d-flex-w gap--15 mt--20">
        <label for="guestbookUpdateAuthor">닉네임
            <ui-text-field :type="'text'"
                            :name="'author'"
                            :id="'guestbookUpdateAuthor'"
                            :class="'guestbook__input'"
                            :rules="'required|maxLength:20'"
                            :value="guestbook.author">
            </ui-text-field>
        </label>

        <label for="guestbookUpdatePw">비밀번호
          <ui-text-field :type="'password'"
                          :name="'authorPw'"
                          :id="'guestbookUpdatePw'"
                          :class="'guestbook__input'"
                          :rules="'required|minLength:8|maxLength:15'">
          </ui-text-field>
        </label>

        <ui-button :type="'submit'"
                  :color="'primary'">수정
        </ui-button>
      </div>
    </ui-form>
  </ui-modal>
</template>

<script>
import UiForm from '@/components/shared/form/UiForm.vue';
import UiTextField from '@/components/shared/form/UiTextField.vue';
import UiTextarea from '@/components/shared/form/UiTextarea.vue';
import messageUtil from '@/utils/ui/MessageUtil';

export default {
  name: 'app-update-guestbook-modal',
  props: {
    // 방명록
    guestbook: Object,
  },
  components: {
    UiForm,
    UiTextField,
    UiTextarea,
  },
  methods: {
    async onSubmit(values) {
      const confirm = await messageUtil.confirmSuccess('방명록을 수정하시겠습니까?');
      if (!confirm) return;
      
      this.$http.put(`/guestbook/${values.id}`, values)
        .then(res => {
          messageUtil.toastSuccess('방명록이 수정되었습니다.');
          this.$modal.hide(this.$options.name);
          this.$store.dispatch('Guestbook/FETCH_UPDATED_GUESTBOOK', res.data);
        }).catch(error => {
          messageUtil.toastError(error.response.data.message);
        });
    },
  },
}
</script>

<style lang="scss" scoped>

</style>