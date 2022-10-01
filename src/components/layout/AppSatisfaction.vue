<template>
  <div class="satisfaction__wrapper">
    <h2 class="sr-only">만족도조사</h2>

    <p class="satisfaction__title">
      <i class="xi-message" aria-hidden="true"></i> 이 페이지에서 제공하는 정보가 유익하셨나요?
    </p>

    <ui-form class="satisfaction__frm" @onSubmit="onSubmit">
      <input type="hidden" name="_csrf" value="" />
      <input type="hidden" name="pagePath" value="" />

      <div class="satisfaction__field">
        <ui-radio v-for="item in satisArr"
                  :key="item.value"
                  :id="`score${item.value}`"
                  name="score"
                  :checked="(item.value === this.satisArr[2].value)"
                  :label="item.text"
                  v-model="item.value" />
      </div>

      <div class="satisfaction__field">
        <div class="satisfaction__field__inner">
          <ui-form-field type="text"
                         name="satisfactionComment"
                         id="satisfactionComment"
                         className="satisfaction__radio"
                         title="의견"
                         placeholder="의견을 입력하세요."
                         v-model="satisfactionComment" />
          
          <button type="submit" class="btn satisfaction__btn">
            <i class="xi-check-min" aria-hidden="true"></i>
            <span class="sr-only">제출</span>
          </button>
        </div>
      </div>
    </ui-form>
  </div>
</template>

<script>
import UiForm from '@/components/shared/form/UiForm.vue';
import UiFormField from '@/components/shared/form/UiFormField.vue';
import UiRadio from '@/components/shared/form/UiRadio.vue';
import dialog from '@/utils/ui/Dialog';
import snackbar from '@/utils/ui/Snackbar';

export default {
  name: 'AppSatisfaction',
  components: {
    UiForm,
    UiFormField,
    UiRadio,
  },
  data() {
    return {
      satisArr: [],
      satisfactionComment: '',
    }
  },
  created() {
    // 만족도조사 코드 세팅
    this.$store.state.satisCode.forEach((item, idx) => {
      let obj = {
        value: item.val,
        text: item.nm,
      };
      this.satisArr.push(obj);
    });
  },
  methods: {
    async onSubmit(values) {
      console.log('satis values >>>', values);

      const confirm = await dialog.confirm('제출하시겠습니까?', '');
      if (!confirm) {
        return;
      }
      snackbar.success('제출되었습니다.');
    },
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/components/satisfaction.scss';
</style>