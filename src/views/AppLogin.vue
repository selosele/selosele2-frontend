<template>
  <div class="login__wrapper">
    <div class="login__inner">
      <form method="post" action="/a/goto" autocomplete="off" class="login__frm">
        <input type="text" name="user_id" id="user_id" title="아이디 입력" placeholder="아이디" maxlength="10" />
        <!-- 운영모드일 때 비밀번호 input에 minlength="8" maxlength="15" 속성 필요 -->
        <input type="password" name="user_pw" id="user_pw" title="비밀번호 입력" placeholder="비밀번호" />
        <input type="hidden" name="_csrf" value="" />

        <button type="button" class="login__btn--submit" @click="login">로그인</button>
      </form>
    </div>
  </div>
</template>

<script>
import snackbar from '../utils/ui/Snackbar';

export default {
  name: 'AppLogin',
  methods: {
    login() {
      snackbar.warning('TEST');
    }
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/views/login.scss';
</style>
