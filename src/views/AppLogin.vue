<template>
  <app-content-wrapper :pageTitle="pageTitle">
    <div class="login__wrapper">
      <div class="login__inner">
        <ui-form autocomplete="off" :class="'login__frm'" :name="'loginForm'" @onSubmit="onSubmit">
          <ui-text-field :type="'text'" :name="'userId'" :title="'아이디 입력'" :placeholder="'아이디'" 
                        v-model="userId" 
                        :rules="'required|maxLength:10'" />
          
          <!-- 운영모드일 때 비밀번호 input에 minlength="8" maxlength="15" 속성 필요 -->
          <ui-text-field :type="'password'" :name="'userPw'" :title="'비밀번호 입력'" :placeholder="'비밀번호'" 
                        v-model="userPw" 
                        :rules="'required'" />
          
          <button type="submit"
                  class="login__btn login__btn--submit">로그인</button>

          <button type="button"
                  class="login__btn login__btn--add"
                  @click="addUser"
                  v-if="isDevelopment">사용자 생성</button>
        </ui-form>
      </div>
    </div>
  </app-content-wrapper>
</template>

<script>
import UiForm from '@/components/shared/form/UiForm.vue';
import UiTextField from '@/components/shared/form/UiTextField.vue';
import confirmUtil from '@/utils/ui/Confirm';
import snackbar from '@/utils/ui/Snackbar';
import breadCrumbService from '@/services/breadcrumb/breadcrumbService';

export default {
  name: 'app-login',
  components: {
    UiForm,
    UiTextField,
  },
  data() {
    return {
      pageTitle: '로그인',
      userId: '',
      userPw: '',
    }
  },
  created() {
    // 페이지 타이틀 세팅
    breadCrumbService.setPageTitle(this.pageTitle);
  },
  methods: {
    async onSubmit(values) {
      try {
        let res = await this.$http.post('/auth/signin', values);
        const token = res.data.accessToken;
        
        if (token) {
          this.$http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const loginRes = await this.$store.dispatch('LOGIN', token);
          
          if ('ok' === loginRes) {
            this.$router.push('/');
          }
        }
      } catch(error) {
        snackbar.error(error.response.data.message);
      }
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

      const confirm = await confirmUtil.success('사용자를 생성하시겠습니까?');
      if (!confirm) {
        return;
      }

      this.$http.post('/auth/signup', user)
        .then(res => {
          snackbar.success('사용자 생성에 성공했습니다.');
        });
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/views/login.scss';
</style>
