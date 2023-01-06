<template>
  <div class="widget__wrapper">
    <div class="widget__config">
      <ui-button :class="'widget__btn widget__btn--config'"
                 @click="toggleList">위젯관리
      </ui-button>

      <ui-button :class="'widget__btn widget__btn--save'"
                 @click="onSubmit"
                 v-if="!listHidden">저장
      </ui-button>
  
      <div class="widget__list" v-if="!listHidden">
        <h2>미사용 위젯</h2>

        <template v-for="(widget,i) in noUseWidgetList" :key="i">
          <ui-checkbox :name="'useYn'"
                       :id="`useYn${i}`"
                       :label="widget.title"
                       :values="'Y,N'">
          </ui-checkbox>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { messageUtil } from '@/utils';

export default {
  name: 'app-widget-config',
  data() {
    return {
      /** 미사용 위젯 목록 */
      noUseWidgetList: [],
      /** 저장 버튼, 미사용 위젯 toggle용 변수 */
      listHidden: true,
    }
  },
  created() {
    this.listWidget();
  },
  methods: {
    /** 미사용 위젯 목록 조회 */
    listWidget() {
      const listWidgetDto = {
        useYn: 'N',
      };

      return this.$http.get('/widget', { params: listWidgetDto })
        .then(res => {
          this.noUseWidgetList = [...res.data];
        });
    },
    /** 저장 버튼 클릭 시 */
    async onSubmit() {
      const confirm = await messageUtil.confirmSuccess('저장하시겠습니까?');
      if (!confirm) return;
    },
    /** 위젯관리 버튼 클릭 시 */
    toggleList() {
      this.listHidden = !this.listHidden;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/widget.scss';
</style>
