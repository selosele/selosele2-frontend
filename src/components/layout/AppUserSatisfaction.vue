<template>
  <div class="satisfaction__wrapper">
    <h2 class="sr-only">만족도조사</h2>

    <p class="satisfaction__title">
      <i class="xi-message" aria-hidden="true"></i> 이 페이지에서 제공하는 정보가 유익하셨나요?
    </p>

    <ui-form :class="'satisfaction__frm'" :name="'satisForm'" @onSubmit="onSubmit">
      <input type="hidden" name="pagePath" value="" />

      <div class="satisfaction__field">
        <ui-radio v-for="(item,i) in satisArr"
                  :key="i"
                  :id="`score${item.value}`"
                  :name="'score'"
                  :checked="(item.value === this.satisArr[2].value)"
                  :label="item.text"
                  v-model="item.value">
        </ui-radio>
      </div>

      <div class="satisfaction__field">
        <div class="satisfaction__field__inner">
          <ui-text-field :type="'text'"
                         :name="'comment'"
                         :id="'comment'"
                         :className="'satisfaction__radio'"
                         :title="'의견'"
                         :placeholder="'의견을 입력하세요.'"
                         v-model="comment">
          </ui-text-field>
          
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
import UiTextField from '@/components/shared/form/UiTextField.vue';
import UiRadio from '@/components/shared/form/UiRadio.vue';
import messageUtil from '@/utils/ui/MessageUtil';
import { isIn } from '@/utils/util';

export default {
  name: 'app-user-satisfaction',
  components: {
    UiForm,
    UiTextField,
    UiRadio,
  },
  data() {
    return {
      satisArr: [],
      comment: '',
    }
  },
  created() {
    // 만족도조사 코드 세팅
    this.$store.state.code.map(d => {
      if ('B01' === d.prefix) {
        let obj = {
          value: d.val,
          text: d.nm,
        };
        this.satisArr.push(obj);
      }
    });
  },
  methods: {
    async onSubmit(values) {
      values.pagePath = decodeURIComponent(this.$route.path);
      
      const confirm = await messageUtil.confirmSuccess('제출하시겠습니까?');
      if (!confirm) return;

      this.$http.post('/satisfaction', values)
        .then(res => {
          messageUtil.toastSuccess('참여해주셔서 감사합니다.');
        }).catch(error => {
          if (isIn(error.response.status, 403, 400)) {
            messageUtil.toastError(error.response.data.message);
            return;
          }
        });
    },
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/components/satisfaction.scss';
</style>