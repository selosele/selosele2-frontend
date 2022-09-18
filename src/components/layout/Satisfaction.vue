<template>
  <div class="satisfaction__wrapper">
    <h2 class="sr-only">만족도조사</h2>

    <p class="satisfaction__title">
      <i class="xi-message" aria-hidden="true"></i> 이 페이지에서 제공하는 정보가 유익하셨나요?
    </p>

    <form action="/satisfaction" method="post" class="satisfaction__frm">
      <input type="hidden" name="_csrf" value="" />
      <input type="hidden" name="page_path" value="" />

      <div class="satisfaction__field">
        <template v-for="item in satisArr" :key="item.val">
          <input type="radio" :id="`score${item.val}`" name="score" :value=item.val />
          <label :for="`score${item.val}`">{{ item.txt }}</label>
        </template>
      </div>

      <div class="satisfaction__field">
        <div class="satisfaction__field__inner">
          <input type="text" name="satisfaction_comment" id="satisfaction_comment" title="의견" placeholder="의견을 입력하세요." />
          <button type="button" class="btn satisfaction__btn">
            <i class="xi-check-min" aria-hidden="true"></i>
            <span class="sr-only">제출</span>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Satisfaction',
  data() {
    return {
      satisArr: [
        { val: 5, txt: '매우 만족' },
        { val: 4, txt: '만족' },
        { val: 3, txt: '보통' },
        { val: 2, txt: '불만족' },
        { val: 1, txt: '매우 불만족' },
      ]
    }
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/components/satisfaction.scss';
</style>