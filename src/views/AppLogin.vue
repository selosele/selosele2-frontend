<template>
  <div class="login__wrapper">
    <div class="login__inner">
      <ui-form autocomplete="off" class="login__frm" @onSubmit="onSubmit">
        <!-- <input type="hidden" name="_csrf" value="" /> -->

        <ui-form-field type="text" name="userId" title="아이디 입력" placeholder="아이디" 
                       v-model="userId" 
                       rules="required|maxLength:10" />
        
        <!-- 운영모드일 때 비밀번호 input에 minlength="8" maxlength="15" 속성 필요 -->
        <ui-form-field type="password" name="userPw" title="비밀번호 입력" placeholder="비밀번호" 
                       v-model="userPw" 
                       rules="required" />
        
        <button type="submit" class="login__btn--submit">로그인</button>
      </ui-form>
    </div>
  </div>
</template>

<script>
import UiForm from '@/components/shared/form/UiForm.vue';
import UiFormField from '@/components/shared/form/UiFormField.vue';

export default {
  name: 'AppLogin',
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
    onSubmit() {
      console.log('userId >>>', this.userId);
      console.log('userPw >>>', this.userPw);
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/views/login.scss';
</style>
