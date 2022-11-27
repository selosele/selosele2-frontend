<template>
  <ui-modal :title="'방명록 삭제'" :name="this.$options.name">
    <ui-form :name="'removeGuestbookForm'" @onSubmit="onSubmit">
      <input type="hidden" name="id" :value="id">

      <div class="d-flex-w gap--10">
        <div>
          <ui-text-field :type="'password'"
                         :name="'authorPw'"
                         :id="'guestbookRemovePw'"
                         :title="'비밀번호 입력'"
                         :placeholder="'비밀번호 입력'"
                         :readonly="isLogin"
                         :rules="!isLogin ? 'required|minLength:8|maxLength:15' : ''">
          </ui-text-field>
        </div>

        <ui-button :type="'submit'"
                   :color="'primary'">삭제
        </ui-button>
      </div>
    </ui-form>
  </ui-modal>
</template>

<script>
import UiForm from '@/components/shared/form/UiForm.vue';
import UiTextField from '@/components/shared/form/UiTextField.vue';
import messageUtil from '@/utils/ui/MessageUtil';

export default {
  name: 'app-remove-guestbook-modal',
  props: {
    // 방명록 ID
    id: String,
  },
  components: {
    UiForm,
    UiTextField,
  },
  methods: {
    async onSubmit(values) {
      const confirm = await messageUtil.confirmSuccess('방명록을 삭제하시겠습니까?');
      if (!confirm) return;
      
      this.$http.delete(`/guestbook/${values.id}`, { data: values })
        .then(res => {
          messageUtil.toastSuccess('방명록이 삭제되었습니다.');
          this.$modal.hide(this.$options.name);
          this.$store.dispatch('FETCH_REMOVED_GUESTBOOK', values);
        }).catch(error => {
          messageUtil.toastError(error.response.data.message);
        });
    },
  },
}
</script>

<style lang="scss" scoped>

</style>