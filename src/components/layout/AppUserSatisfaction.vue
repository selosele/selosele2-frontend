<template>
  <div class="satisfaction__wrapper">
    <h2 class="sr-only">만족도 조사</h2>

    <p class="satisfaction__title">
      <i class="xi-message" aria-hidden="true"></i> 이 페이지에서 제공하는 정보가 유익하셨나요?
    </p>

    <ui-form :class="'satisfaction__frm'" :name="'satisForm'" @onsubmit="onSubmit">
      <ui-hidden-field :name="'pagePath'" :value="''" />
      <ui-hidden-field :name="'pageTitle'" :value="''" />

      <div class="satisfaction__field">
        <ui-radio
          v-for="(item,i) in $store.state.Satisfaction.code.filter(d => d.prefix === 'B01')" :key="i"
          :id="`score${item.val}`"
          :name="'score'"
          :label="item.nm"
          :rules="'required'"
          :value="item.val"
          v-model="score"
          @onchange="setCommentList"
        />
      </div>

      <div class="satisfaction__field">
        <div class="satisfaction__field__inner">
          <ui-text-field
            :name="'comment'"
            :id="'comment'"
            :clazz="['satisfaction__comment']"
            :title="'의견'"
            :placeholder="'의견을 입력하세요.'"
            :rules="'max:1000'"
            v-model="comment"
          />
  
          <ui-select
            :name="'commentTypeCd'"
            :id="'commentTypeCd'"
            :clazz="['satisfaction__comment-type-cd']"
            :title="'의견 선택'"
            :defaultValue="'직접 입력'"
            :data="commentList"
            v-model="commentTypeCd"
            @onchange="setComment"
          />

          <ui-icon-button
            :type="'submit'"
            :icon="'xi-check-min'"
            :text="'제출'"
            :class="'satisfaction__btn'"
          />
        </div>
      </div>
    </ui-form>
  </div>
</template>

<script>
import { isBlank, messageUtil } from '@/utils';

export default {
  name: 'AppUserSatisfaction',
  data() {
    return {
      /** 만족도조사 점수 값 */
      score: '',
      /** 만족도조사 의견 */
      comment: '',
      /** 만족도조사 의견 목록 */
      commentList: [],
      /** 만족도 의견 유형 코드 */
      commentTypeCd: '',
    }
  },
  created() {
    this.setDefaultData('003');
    this.setCommentList('003');
  },
  watch: {
    '$route'() {
      this.setDefaultData('003');
      this.setCommentList('003');
    },
  },
  methods: {
    /** 만족도조사 초기 값 세팅 */
    setDefaultData(score, comment = '') {
      this.score = score;
      this.comment = comment;
    },
    /** 만족도조사 의견 자동 입력 */
    setComment(value) {

      // '직접 입력'의 경우에는 의견을 빈 값으로 세팅
      if (isBlank(value)) {
        this.comment = '';
        return;
      }

      this.comment = this.commentList.find(d => d.value === value).text;
    },
    /** 만족도조사 의견 목록 세팅 */
    setCommentList(value) {
      this.commentTypeCd = '';
      this.commentList = this.$store.state.Satisfaction.code.filter(d => {

        // 점수 - 매우 불만족, 불만족
        if (('001' === value || '002' === value) && 'B02' === d.prefix) {
          return true;
        }
        // 점수 - 보통
        else if ('003' === value && ('B02' === d.prefix || 'B03' === d.prefix)) {
          return true;
        }
        // 점수 - 매우 만족, 만족
        else if (('004' === value || '005' === value) && 'B03' === d.prefix) {
          return true;
        }

        return false;
      })
      .map(d => ({
        value: d.id,
        text: d.nm,
      }));
    },
    /** 만족도조사 제출 */
    async onSubmit(values) {
      const confirm = await messageUtil.confirmSuccess('제출하시겠습니까?');
      if (!confirm) return;

      values.pagePath = decodeURIComponent(this.$route.path);
      values.pageTitle = this.$store.state.Breadcrumb.pageTitle;

      this.$http.post('/satisfaction', values)
      .then(resp => {
        messageUtil.toastSuccess('참여해주셔서 감사합니다.');
      });
    },
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/satisfaction.scss';
</style>