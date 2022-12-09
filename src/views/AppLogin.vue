<template>
  <app-content-wrapper :pageTitle="pageTitle">
    <div class="login__wrapper">
      <div class="login__inner">
        <ui-form :autocomplete="'off'"
                 :class="'login__frm'"
                 :name="'loginForm'"
                 :ref="'loginForm'"
                 @onSubmit="onSubmit"
        >
          <ui-text-field :type="'text'"
                         :name="'userId'"
                         :title="'아이디 입력'"
                         :placeholder="'아이디'"
                         :rules="'required|max:10'"
                         v-model="userId">
          </ui-text-field>
          
          <ui-text-field :type="'password'"
                         :name="'userPw'"
                         :title="'비밀번호 입력'"
                         :placeholder="'비밀번호'"
                         :rules="userPwRules"
                         v-model="userPw">
          </ui-text-field>
          
          <button type="submit" class="login__btn login__btn--submit">로그인</button>

          <button type="button"
                  class="login__btn login__btn--add"
                  @click="addUser"
                  v-if="isDevelopment">사용자 생성
          </button>
        </ui-form>
      </div>
    </div>
  </app-content-wrapper>
</template>

<script>
import UiForm from '@/components/shared/form/UiForm.vue';
import UiTextField from '@/components/shared/form/UiTextField.vue';
import messageUtil from '@/utils/ui/MessageUtil';
import breadcrumbService from '@/services/breadcrumb/BreadcrumbService';

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
    breadcrumbService.setPageTitle(this.pageTitle);
  },
  computed: {
    // 비밀번호 유효성 검증 rules
    userPwRules() {
      if ('production' === process.env.NODE_ENV) {
        return 'required|min:8|max:15';
      }
      return 'required';
    },
  },
  methods: {
    async onSubmit(values) {
      let res = await this.$http.post('/auth/signin', values);
      const token = res.data.accessToken;
      
      if (token) {
        this.$http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const loginRes = await this.$store.dispatch('Auth/LOGIN', token);
        
        if ('ok' === loginRes) {
          this.$router.push('/');
        }
      }
    },
    async addUser() {
      const addUserDto = {
        userId: this.userId,
        userPw: this.userPw,
        roleId: '',
      };

      const runValidate = await this.$refs['loginForm'].validateAll();
      if (!runValidate.valid) {
        return;
      }

      const confirm = await messageUtil.confirmSuccess('사용자를 생성하시겠습니까?');
      if (!confirm) {
        return;
      }

      this.$http.post('/auth/user', addUserDto)
        .then(res => {
          messageUtil.toastSuccess('사용자 생성에 성공했습니다.');
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/views/login.scss';
</style>
