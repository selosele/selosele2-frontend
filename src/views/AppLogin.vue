<template>
  <div class="login__wrapper">
    <div class="login__inner">
      <ui-form autocomplete="off" class="login__frm" name="loginForm" @onSubmit="onSubmit">
        <ui-form-field type="text" name="userId" title="아이디 입력" placeholder="아이디" 
                       v-model="userId" 
                       rules="required|maxLength:10" />
        
        <!-- 운영모드일 때 비밀번호 input에 minlength="8" maxlength="15" 속성 필요 -->
        <ui-form-field type="password" name="userPw" title="비밀번호 입력" placeholder="비밀번호" 
                       v-model="userPw" 
                       rules="required" />
        
        <button type="submit"
                class="login__btn login__btn--submit">로그인</button>

        <button type="button"
                class="login__btn login__btn--add"
                @click="addUser"
                v-if="isDevelopment">사용자 생성</button>
      </ui-form>
    </div>
  </div>
</template>

<script>
import UiForm from '@/components/shared/form/UiForm.vue';
import UiFormField from '@/components/shared/form/UiFormField.vue';
import dialog from '@/utils/ui/Dialog';
import snackbar from '@/utils/ui/Snackbar';

export default {
  name: 'app-login',
  components: {
    UiForm,
    UiFormField,
  },
  data() {
    return {
      userId: '',
      userPw: '',
    }
  },
  methods: {
    onSubmit(values) {
      this.$store.dispatch('LOGIN', values)
        .then(res => {
          if (res === 'no') {
            snackbar.error('로그인에 실패했습니다.');
            return;
          }
          this.$router.push('/');
        });
    },
    async addUser() {
      const user = {
        userId: this.userId,
        userPw: this.userPw,
        roleId: '',
      };

      if (!user.userId.trim()) {
        snackbar.warning('아이디를 입력하세요.');
        return;
      }
      if (!user.userPw.trim()) {
        snackbar.warning('비밀번호를 입력하세요.');
        return;
      }

      const confirm = await dialog.confirm('사용자를 생성하시겠습니까?', '');
      if (!confirm) {
        return;
      }

      this.$http.post('/auth/signup', user)
        .then(res => {
          snackbar.success('사용자 생성에 성공했습니다.');
        }).catch(error => {
          snackbar.error('오류가 발생했습니다.');
        });
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/views/login.scss';
</style>
