<template>
  <div class="login__wrapper">
    <div class="login__inner">
      <Form method="post" action="/a/goto" autocomplete="off" class="login__frm" 
            @submit.prevent="login"
            :validation-schema="schema"
            v-slot="{ errors }">
        <Field type="text" v-model="userId" name="userId" title="아이디 입력" placeholder="아이디" />
        <p v-if="errors.userId">{{ errors.userId }}</p>
        
        <!-- 운영모드일 때 비밀번호 input에 minlength="8" maxlength="15" 속성 필요 -->
        <Field type="password" v-model="userPw" name="userPw" title="비밀번호 입력" placeholder="비밀번호" />
        <p v-if="errors.userPw">{{ errors.userPw }}</p>
        
        <!-- <input type="hidden" name="_csrf" value="" /> -->

        <button type="submit" class="login__btn--submit">로그인</button>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { Form, Field } from 'vee-validate';

const schema = {
  userId: 'required|maxLength:10',
  userPw: 'required',
};
</script>

<script>
export default {
  name: 'AppLogin',
  data() {
    return {
      userId: '',
      userPw: '',
    }
  },
  methods: {
    login() {
      alert(11);
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/views/login.scss';
</style>
