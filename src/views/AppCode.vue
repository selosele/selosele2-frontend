<template>
  <app-content-wrapper :pageTitle="pageTitle">
    <template v-if="!dataLoaded">
      <ui-skeletor :height="'1.3rem'"></ui-skeletor>
      <ui-skeletor :height="'1.3rem'"></ui-skeletor>
      <ui-skeletor :height="'1.3rem'"></ui-skeletor>
    </template>

    <template v-else>
      <div class="d-flex flex--right gap--10 mb--15">
        <ui-button :type="'button'"
                   :color="'primary'"
                   @click="addCode">추가
        </ui-button>

        <ui-button :type="'button'"
                   :color="'dark'"
                   @click="removeCode">삭제
        </ui-button>
      </div>

      <ui-split-pane>
        <ui-pane>
          <ui-grid
            :defaultColDef="defaultColDef"
            :columnDefs="columnDefs"
            :rowData="rowData"
            :checkboxIndex="0"
            :pagination="true"
            @onGridReady="onGridReady"
            @rowClicked="rowClicked"
          >
          </ui-grid>
        </ui-pane>
        
        <ui-pane v-if="isSplitterActive">
          <app-save-code
            :code="code"
            :key="code.id"
            @onSaveCode="onSaveCode"
          >
          </app-save-code>
        </ui-pane>
      </ui-split-pane>
    </template>
  </app-content-wrapper>
</template>

<script>
import UiSkeletor from '@/components/shared/skeletor/UiSkeletor.vue';
import UiGrid from '@/components/shared/grid/UiGrid.vue';
import UiSplitPane from '@/components/shared/splitter/UiSplitPane.vue';
import UiPane from '@/components/shared/splitter/UiPane.vue';
import AppSaveCode from '@/components/views/code/AppSaveCode.vue';
import messageUtil from '@/utils/ui/MessageUtil';
import breadcrumbService from '@/services/breadcrumb/BreadcrumbService';

export default {
  name: 'app-code',
  components: {
    UiSkeletor,
    UiGrid,
    UiSplitPane,
    UiPane,
    AppSaveCode,
  },
  data() {
    return {
      pageTitle: '공통코드 관리',
      columnDefs: [
        { }, // 체크박스
        { headerName: '코드 ID', field: 'id', width: 130 },
        { headerName: '코드 접두어', field: 'prefix', width: 130 },
        { headerName: '코드 값', field: 'val', width: 130 },
        { headerName: '코드 명', field: 'nm' },
        { headerName: '코드 설명', field: 'desc' },
        { headerName: '코드 등록일시', field: 'regDate' },
        { headerName: '코드 사용여부', field: 'useYn', width: 150, align: 'center' },
      ],
      rowData: [],
      code: null,
      gridApi: null,
      dataLoaded: false,
    }
  },
  async created() {
    // 페이지 타이틀 세팅
    breadcrumbService.setPageTitle(this.pageTitle);

    await this.listCode();
    this.dataLoading();
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params;
    },
    rowClicked(params) {
      this.$http.get(`/code/${params.data.id}`)
        .then(res => {
          this.code = { ...res.data };
          this.$store.commit('Splitter/TOGGLE', true);
        });
    },
    // 공통코드 목록 조회
    listCode() {
      return this.$http.get('/code')
        .then(res => {
          res.data.map(d => {
            d.regDate = this.$moment(d.regDate).format('YYYY-MM-DD HH:mm:ss');
            d.useYn = this.getUseYn(d.useYn);
          });

          this.rowData = [...res.data];
          this.dataLoading();
        });
    },
    // 공통코드 추가
    addCode() {
      this.code = {};
      this.code.id = null;
      this.$store.commit('Splitter/TOGGLE', true);
    },
    // 공통코드 삭제
    async removeCode() {
      const rows = this.gridApi.getSelectedRows();
      if (0 === rows.length) {
        messageUtil.toastWarning('삭제할 항목을 선택하세요.');
        return;
      }

      const confirm = await messageUtil.confirmQuestion('삭제하시겠습니까?');
      if (!confirm) return;

      let removeCodeDto = [];

      rows.forEach((d,i) => {
        removeCodeDto.push({
          id: d.id,
        });
      });

      this.$http.delete('/code', { data: removeCodeDto })
        .then(res => {
          this.gridApi.removeSelectedRows();
          messageUtil.toastSuccess('삭제되었습니다.');

          this.$store.commit('Splitter/TOGGLE', false);
          this.$store.dispatch('Code/FETCH_CODE', this.gridApi.getRowNodes());
        });
    },
    // 그리드 갱신
    async onSaveCode() {
      await this.listCode();
      this.$store.dispatch('Code/FETCH_CODE', this.rowData);
    },
    // 코드 사용여부 가공
    getUseYn(useYn) {
      switch (useYn) {
        case 'Y':
          return '사용';
        case 'N':
          return '미사용';
      }
    },
    // 데이타 로딩
    dataLoading() {
      if (0 < this.rowData.length) {
        this.dataLoaded = true;
      }
    },
  },
}
</script>

<style lang="scss" scoped>

</style>