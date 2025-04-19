<template>
  <app-content-wrapper>
    <div class="login__wrapper">
      <div class="login__inner">
        <ui-form
          :autocomplete="'off'"
          :class="'login__frm'"
          :name="'loginForm'"
          :ref="'loginForm'"
          @onsubmit="onSubmit"
          @copy.prevent
          @paste.prevent
        >
          <ui-text-field
            :name="'userId'"
            :title="'아이디 입력'"
            :placeholder="'아이디'"
            :autocomplete="'username'"
            :rules="'required|max:10'"
            v-model="userId"
          />
          
          <ui-text-field
            :type="'password'"
            :name="'userPw'"
            :title="'비밀번호 입력'"
            :placeholder="'비밀번호'"
            :autocomplete="'current-password'"
            :rules="'required|min:8|max:15'"
            v-model="userPw"
          />
          
          <ui-button
            :type="'submit'"
            :color="'primary'"
            :text="'로그인'"
            :block="true"
            :class="'mt--15'"
          />

          <ui-button
            :color="'secondary'"
            :class="'mt--15'"
            :text="'사용자 생성'"
            :block="true"
            @click="addUser"
            v-if="isDevelopment"
          />
        </ui-form>
      </div>
    </div>
  </app-content-wrapper>
</template>

<script>
import { messageUtil } from '@/utils';

export default {
  name: 'AppLogin',
  data() {
    return {
      userId: '',
      userPw: '',
    }
  },
  created() {
    // 페이지 타이틀 세팅
    this.$store.dispatch('Breadcrumb/FETCH_PAGE_TITLE', '로그인');
  },
  methods: {
    /** 로그인 */
    async onSubmit(values) {
      const { data } = await this.$http.post('/auth/signin', values);
      const accessToken = data?.accessToken;
      
      if (accessToken) {
        this.$http.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        const loginRes = await this.$store.dispatch('Auth/LOGIN', accessToken);
        
        if ('OK' === loginRes) {
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
      .then(resp => {
        messageUtil.toastSuccess('사용자가 생성되었습니다.');
      });
    },
    /** 유효성 검사 */
    async validationCheck() {
      const runValidate = await this.$refs['loginForm'].validateAll();
      return runValidate.valid;
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/views/login.scss';
</style>
