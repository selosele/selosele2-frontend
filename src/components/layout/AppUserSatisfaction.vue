<template>
  <div class="satisfaction__wrapper">
    <h2 class="sr-only">만족도조사</h2>

    <p class="satisfaction__title">
      <i class="xi-message" aria-hidden="true"></i> 이 페이지에서 제공하는 정보가 유익하셨나요?
    </p>

    <ui-form :class="'satisfaction__frm'" :name="'satisForm'" @onsubmit="onSubmit">
      <ui-hidden-field :name="'pagePath'" :value="''" />
      <ui-hidden-field :name="'pageTitle'" :value="''" />

      <div class="satisfaction__field">
        <ui-radio v-for="(item,i) in $store.state.Satisfaction.code" :key="i"
                  :id="`score${item.val}`"
                  :name="'score'"
                  :label="item.nm"
                  :rules="'required'"
                  :value="item.val"
                  v-model="defaultScore">
        </ui-radio>
      </div>

      <div class="satisfaction__field">
        <div class="satisfaction__field__inner">
          <ui-text-field :type="'text'"
                         :name="'comment'"
                         :id="'comment'"
                         :clazz="['satisfaction__comment']"
                         :title="'의견'"
                         :placeholder="'의견을 입력하세요.'"
                         :rules="'max:1000'"
                         v-model="comment">
          </ui-text-field>

          <ui-icon-button :type="'submit'"
                          :icon="'xi-check-min'"
                          :text="'제출'"
                          :class="'satisfaction__btn'">
          </ui-icon-button>
        </div>
      </div>
    </ui-form>
  </div>
</template>

<script>
import { messageUtil } from '@/utils';

export default {
  name: 'app-user-satisfaction',
  data() {
    return {
      /** 만족도조사 기본 점수 값 */
      defaultScore: '',
      /** 만족도조사 의견 */
      comment: '',
    }
  },
  created() {
    this.setDefaultData('003');
  },
  watch: {
    '$route'() {
      this.setDefaultData('003');
    }
  },
  methods: {
    /** 만족도조사 초기 값 세팅 */
    setDefaultData(score, comment = '') {
      this.defaultScore = score;
      this.comment = comment;
    },
    /** 만족도조사 제출 */
    async onSubmit(values) {
      values.pagePath = decodeURIComponent(this.$route.path);
      values.pageTitle = this.$store.state.Breadcrumb.pageTitle;
      
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