<template>
  <div class="satisfaction__wrapper">
    <h2 class="sr-only">만족도조사</h2>

    <p class="satisfaction__title">
      <i class="xi-message" aria-hidden="true"></i> 이 페이지에서 제공하는 정보가 유익하셨나요?
    </p>

    <ui-form :class="'satisfaction__frm'" :name="'satisForm'" @onSubmit="onSubmit">
      <ui-hidden-field :name="'pagePath'" :value="''">
      </ui-hidden-field>

      <div class="satisfaction__field">
        <ui-radio v-for="(item,i) in satisArr"
                  :key="i"
                  :id="`score${item.value}`"
                  :name="'score'"
                  :label="item.text"
                  :value="item.value"
                  v-model="defaultScore">
        </ui-radio>
      </div>

      <div class="satisfaction__field">
        <div class="satisfaction__field__inner">
          <ui-text-field :type="'text'"
                         :name="'comment'"
                         :id="'comment'"
                         :class="'satisfaction__comment'"
                         :title="'의견'"
                         :placeholder="'의견을 입력하세요.'"
                         v-model="comment">
          </ui-text-field>

          <ui-button :type="'submit'"
                     :class="'satisfaction__btn'">
            <i class="xi-check-min" aria-hidden="true"></i>
            <span class="sr-only">제출</span>
          </ui-button>
        </div>
      </div>
    </ui-form>
  </div>
</template>

<script>
import { messageUtil } from '@/utils/ui/messageUtil';

export default {
  name: 'app-user-satisfaction',
  data() {
    return {
      satisArr: [],
      defaultScore: '',
      comment: '',
    }
  },
  created() {
    // 만족도조사 코드 세팅
    this.$store.state.Code.data.map(d => {
      if ('B01' === d.prefix) {
        this.satisArr.push({
          value: d.val,
          text: d.nm,
        });
      }
    });

    this.defaultScore = this.satisArr[2].value;
  },
  methods: {
    /** 만족도조사 제출 */
    async onSubmit(values) {
      values.pagePath = decodeURIComponent(this.$route.path);
      
      const confirm = await messageUtil.confirmSuccess('제출하시겠습니까?');
      if (!confirm) return;

      this.$http.post('/satisfaction', values)
        .then(res => {
          messageUtil.toastSuccess('참여해주셔서 감사합니다.');
        });
    },
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/satisfaction.scss';
</style>