<template>
  <app-content-wrapper :pageTitle="pageTitle">
    <div class="login__wrapper">
      <div class="login__inner">
        <ui-form :autocomplete="'off'"
                 :class="'login__frm'"
                 :name="'loginForm'"
                 :ref="'loginForm'"
                 @onsubmit="onSubmit"
                 @copy.prevent
                 @paste.prevent
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
                         :rules="'required|min:8|max:15'"
                         v-model="userPw">
          </ui-text-field>
          
          <ui-button :type="'submit'"
                     :color="'primary'"
                     :class="'mt--15'"
                     :block="true">로그인
          </ui-button>

          <ui-button :type="'button'"
                     :color="'secondary'"
                     :class="'mt--15'"
                     :block="true"
                     @click="addUser"
                     v-if="isDevelopment">사용자 생성
          </ui-button>
        </ui-form>
      </div>
    </div>
  </app-content-wrapper>
</template>

<script>
import { messageUtil } from '@/utils';
import { breadcrumbService } from '@/services/breadcrumb/breadcrumbService';

export default {
  name: 'app-login',
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
  methods: {
    /** 로그인 */
    async onSubmit(values) {
      const res = await this.$http.post('/auth/signin', values);
      const accessToken = res.data?.accessToken;
      
      if (accessToken) {
        this.$http.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        const loginRes = await this.$store.dispatch('Auth/LOGIN', accessToken);
        
        if ('ok' === loginRes) {
          this.$router.push('/');
        }
      }
    },
    /** 사용자 생성 */
    async addUser() {
      const addUserDto = {
        userId: this.userId,
        userPw: this.userPw,
        roleId: '',
      };

      const isValid = await this.validationCheck();
      if (!isValid) return;

      const confirm = await messageUtil.confirmSuccess('사용자를 생성하시겠습니까?');
      if (!confirm) return;

      this.$http.post('/auth/user', addUserDto)
      .then(res => {
        messageUtil.toastSuccess('사용자가 생성되었습니다.');
      });
    },
    /** 유효성 검사 */
    async validationCheck() {
      const runValidate = await this.$refs['loginForm'].validateAll();
      return runValidate.valid;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/views/login.scss';
</style>
