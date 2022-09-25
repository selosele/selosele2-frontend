<template>
  <div class="satisfaction__wrapper">
    <h2 class="sr-only">만족도조사</h2>

    <p class="satisfaction__title">
      <i class="xi-message" aria-hidden="true"></i> 이 페이지에서 제공하는 정보가 유익하셨나요?
    </p>

    <ui-form class="satisfaction__frm"
             @onSubmit="onSubmit">
      <input type="hidden" name="_csrf" value="" />
      <input type="hidden" name="page_path" value="" />

      <div class="satisfaction__field">
        <ui-radio v-for="item in satisArr"
                  :key="item.value"
                  :id="`score${item.value}`"
                  name="score"
                  :checked="(item.value === '3')"
                  :label="item.text"
                  v-model=item.value />
      </div>

      <div class="satisfaction__field">
        <div class="satisfaction__field__inner">
          <ui-form-field type="text" name="satisfactionComment" id="satisfactionComment" title="의견" placeholder="의견을 입력하세요." />
          
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

export default {
  name: 'AppSatisfaction',
  components: {
    UiForm,
    UiFormField,
    UiRadio,
  },
  data() {
    return {
      satisArr: [
        { value: '5', text: '매우 만족' },
        { value: '4', text: '만족' },
        { value: '3', text: '보통' },
        { value: '2', text: '불만족' },
        { value: '1', text: '매우 불만족' },
      ]
    }
  },
  methods: {
    onSubmit() {
      alert('ㅇㅇ');
    },
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/components/satisfaction.scss';
</style>