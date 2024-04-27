<template>
  <app-content-wrapper>
    <ui-split-pane>
      <ui-pane>
        <ui-grid
          :columnDefs="columnDefs"
          :rowData="rowData"
          :rowNumIndex="0"
          :pagination="true"
          @gridready="onGridReady"
          @cellclicked="onCellClicked"
        />
      </ui-pane>
      
      <ui-pane v-if="isSplitterActive">
        <app-save-code
          :code="code"
          :key="code.id"
        />
      </ui-pane>
    </ui-split-pane>
  </app-content-wrapper>
</template>

<script>
import AppSaveCode from '@/components/views/code/AppSaveCode.vue';
import { startLoading, stopLoading } from '@/utils';

export default {
  name: 'AppAdminCode',
  components: {
    AppSaveCode,
  },
  data() {
    return {
      columnDefs: [
        { width: 80 }, // rownum
        { headerName: '코드 ID', field: 'id', width: 100 },
        { headerName: '코드 접두어', field: 'prefix', width: 100 },
        { headerName: '코드 값', field: 'val', width: 100 },
        { headerName: '코드 명', field: 'nm' },
        { headerName: '코드 설명', field: 'desc' },
        { headerName: '코드 사용 여부', field: 'useYn', width: 130, align: 'center' },
      ],
      rowData: [],
      code: null,
      gridApi: null,
    }
  },
  async created() {
    // 페이지 타이틀 세팅
    this.$store.dispatch('Breadcrumb/FETCH_PAGE_TITLE', '공통코드 관리');

    await this.listCode();
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params;
    },
    /** 공통코드 조회 */
    onCellClicked(params) {
      stopLoading();

      this.$http.get(`/code/${params.data.id}`)
      .then(resp => {
        this.code = { ...resp.data };
        this.$store.commit('Splitter/TOGGLE', true);
        startLoading();
      });
    },
    /** 공통코드 목록 조회 */
    listCode() {
      return this.$store.dispatch('Code/LIST_CODE')
      .then(data => {
        data.forEach(d => {
          d.useYn = this.getUseYn(d.useYn);
        });

        this.rowData = [...data];
      });
    },
    /** 코드 사용 여부 반환 */
    getUseYn(useYn) {
      switch (useYn) {
        case 'Y': return '사용';
        case 'N': return '미사용';
      }
    },
  },
}
</script>

<style lang="scss" scoped>

</style>