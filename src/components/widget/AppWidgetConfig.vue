<template>
  <div class="widget__wrapper">
    <div class="widget__config">
      <ui-button :class="'widget__btn widget__btn--config'"
                 @click="toggleList">위젯관리
      </ui-button>

      <ui-button :type="'submit'"
                 :class="'widget__btn widget__btn--save'"
                 v-if="!listHidden">저장
      </ui-button>
  
      <div class="widget__list" v-if="!listHidden && 0 < noUseWidgetList.length">
        <h2>미사용 위젯</h2>

        <ui-form :name="'widgetConfigForm'" @onsubmit="updateWidgetUseYn">
          <ui-checkbox v-for="(widget,i) in noUseWidgetList" :key="i"
                       :name="'useWidgetId'"
                       :id="`useWidgetId${i}`"
                       :label="widget.title"
                       :value="widget.id">
          </ui-checkbox>

          <ui-button :type="'submit'"
                     :color="'primary'">사용여부 저장
          </ui-button>
        </ui-form>
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
  computed: {
    /** 변경 사이드바 값 */
    sidebarValue: {
      get() {
        return this.$store.state.Layout.sidebar.widget;
      },
      set(v) {}
    }
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
    async onSubmit(values) {
      // const confirm = await messageUtil.confirmSuccess('저장하시겠습니까?');
      // if (!confirm) return;

      console.log(this.sidebarValue);

      // this.$http.put('/widget', this.sidebarValue)
      //   .then(res => {
      //     messageUtil.toastSuccess('저장되었습니다.');
      //   });
    },
    /** 사용여부 저장 버튼 클릭 시 */
    async updateWidgetUseYn(values) {
      if (0 === values.useWidgetId.length) {
        messageUtil.toastWarning('사용할 위젯을 선택하세요.');
        return;
      }

      const confirm = await messageUtil.confirmSuccess('사용여부를 저장하시겠습니까?');
      if (!confirm) return;

      this.$http.put('/widget/use', values)
        .then(res => {
          messageUtil.toastSuccess('저장되었습니다.');
        });
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
