<template>
  <div class="widget__wrapper">
    <div class="widget__config">
      <ui-button
        :text="'위젯관리'"
        :class="'widget__btn widget__btn--config'"
        @click="toggleList"
      />

      <ui-button
        :text="'저장'"
        :class="'widget__btn widget__btn--save'"
        @click="updateWidget"
        v-if="listActive"
      />
  
      <div class="widget__list" v-if="listActive && 0 < noUseWidgetList.length">
        <h2>미사용 위젯</h2>

        <ui-form :name="'updateWidgetUseYnForm'" @onsubmit="updateWidgetUseYn">
          <ui-checkbox
            v-for="(widget,i) in noUseWidgetList" :key="i"
            :name="'id'"
            :id="`id${i}`"
            :label="widget.title"
            :value="widget.id"
          />

          <ui-button
            :type="'submit'"
            :color="'primary'"
            :text="'사용 여부 저장'"
            :block="true"
            :class="'mt--5'"
          />
        </ui-form>
      </div>
    </div>
  </div>
</template>

<script>
import { messageUtil, isNotEmpty, isArray, isBlank, deepCopy } from '@/utils';

export default {
  name: 'AppWidgetConfig',
  data() {
    return {
      /** 미사용 위젯 목록 */
      noUseWidgetList: [],
      /** 저장 버튼, 미사용 위젯 toggle용 변수 */
      listActive: false,
    }
  },
  created() {
    this.listWidgetUseN();
  },
  computed: {
    /** 위젯 값 */
    widgetValue: {
      get() {
        return this.$store.state.Layout.sidebar.widget;
      },
      set(v) {}
    },
    /** 위젯 값 */
    changeWidgetValue: {
      get() {
        return this.$store.state.Layout.changeWidget;
      },
      set(v) {}
    }
  },
  methods: {
    /** 초기 세팅 */
    init() {
      this.listWidget();
      this.listWidgetUseN();
      this.toggleList();
    },
    /** 미사용 위젯 목록 조회 */
    listWidgetUseN() {
      const listWidgetDto = {
        useYn: 'N',
      };

      return this.$http.get('/widget', { params: listWidgetDto })
      .then(resp => {
        this.noUseWidgetList = [...resp.data];
      });
    },
    /** 위젯 목록 조회 및 store 업데이트 */
    listWidget() {
      return this.$store.dispatch('Layout/LIST_WIDGET', {
        params: {
          useYn: 'Y',
        },
      }).then(data => {
        /**
         * 2023.10.14.
         * 위젯 변경사항 저장 후, 위젯관리 버튼을 두번 클릭하면 변경사항이 저장되지 않은 상태의 위젯이 표출되는 현상 수정
         * 위젯 목록을 조회한다음 store의 원본 사이드바에 현재 사이드바를 저장한다.
         */
        this.$store.dispatch('Layout/FETCH_ORIGINAL_SIDEBAR', this.$store.state.Layout.sidebar);
      });
    },
    /** 저장 버튼 클릭 시 */
    async updateWidget() {
      const isValid = this.validationCheck();
      if (!isValid) return;

      const confirm = await messageUtil.confirmSuccess('저장하시겠습니까?');
      if (!confirm) return;

      this.$http.put('/widget', this.widgetValue)
      .then(resp => {
        messageUtil.toastSuccess('저장되었습니다.');
        this.init();
      });
    },
    /** 사용 여부 저장 버튼 클릭 시 */
    async updateWidgetUseYn(values) {
      const body = this.useWidgetIds(values);

      if (0 === body.length || 0 === body?.id.length) {
        messageUtil.toastWarning('사용할 위젯을 선택하세요.');
        return;
      }

      const confirm = await messageUtil.confirmSuccess('저장하시겠습니까?');
      if (!confirm) return;

      this.$http.put('/widget/use', body)
      .then(resp => {
        messageUtil.toastSuccess('저장되었습니다.');
        this.init();
      });
    },
    /** 위젯 저장 유효성 검사 */
    validationCheck() {
      for (const widget of this.changeWidgetValue) {
        if (isBlank(widget.title)) {
          messageUtil.toastWarning('위젯 명을 입력하세요.');
          return false;
        }

        if (30 < widget.title.length) {
          messageUtil.toastWarning('위젯 명을 30자 이하로 입력하세요.');
          return false;
        }

        if (isBlank(widget.icon)) {
          messageUtil.toastWarning('위젯 아이콘 클래스명을 입력하세요.');
          return false;
        }
      }

      return true;
    },
    /** 사용 선택한 위젯의 아이디 배열 반환 */
    useWidgetIds(values) {
      let body = [];

      if (!isArray(values.id)) {
        if (isNotEmpty(values.id) && 'number' === typeof(Object.values(values)[0])) {
          body = { id: [values.id] };
        }
      } else {
        body = values;
      }

      return body;
    },
    /** 위젯관리 버튼 클릭 시 */
    toggleList() {
      this.listActive = !this.listActive;
      
      this.$store.dispatch('Layout/FETCH_IS_ACTIVE', this.listActive);
      this.$store.dispatch('Layout/FETCH_CHANGE_WIDGET', this.$store.state.Layout.sidebar.widget);

      if (!this.listActive) {

        // 위젯관리 버튼을 다시 클릭할 경우, 저장하지 않은 변경사항 초기화
        this.$store.dispatch('Layout/FETCH_SIDEBAR', deepCopy(this.$store.state.Layout.originalSidebar));
        this.$store.dispatch('Layout/FETCH_CHANGE_WIDGET', {});
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/widget.scss';
</style>
