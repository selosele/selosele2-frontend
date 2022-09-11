<template>
  <div class="satisfaction__wrapper">
    <h2 class="sr-only">만족도조사</h2>

    <p class="satisfaction__title"><i class="xi-message" aria-hidden="true"></i> 이 페이지에서 제공하는 정보가 유익하셨나요?</p>

    <form action="/satisfaction" method="post" class="satisfaction__frm">
      <input type="hidden" name="_csrf" value="" />
      <input type="hidden" name="page_path" value="" />

      <div class="satisfaction__field">
        <input type="radio" id="score5" name="score" value="5" />
        <label for="score5">매우 만족</label>

        <input type="radio" id="score4" name="score" value="4" />
        <label for="score4">만족</label>

        <input type="radio" id="score3" name="score" value="3" />
        <label for="score3">보통</label>

        <input type="radio" id="score2" name="score" value="2" />
        <label for="score2">불만족</label>

        <input type="radio" id="score1" name="score" value="1" />
        <label for="score1">매우 불만족</label>
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
};
</script>

<style lang="scss">
@import '@/assets/scss/components/satisfaction.scss';
</style>
