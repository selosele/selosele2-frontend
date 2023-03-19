<template>
  <ag-grid-vue
    class="ag-theme-alpine"
    :style="{ width, height }"
    :defaultColDef="newDefaultColDef"
    :columnDefs="columnDefs"
    :overlayLoadingTemplate="overlayLoadingTemplate"
    :overlayNoRowsTemplate="overlayNoRowsTemplate"
    :rowData="rowData"
    :rowSelection="rowSelection"
    :pagination="pagination"
    :paginationPageSize="paginationPageSize"
    @gridReady="onGridReady"
    @cellClicked="onCellClicked"
    @cellDoubleClicked="onCellDoubleClicked"
    @rowDataUpdated="onRowDataUpdated"
  >
  </ag-grid-vue>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue3';

export default {
  name: 'ui-grid',
  components: {
    AgGridVue,
  },
  props: {
    /** Grid Width값 */
    width: {
      type: String,
      default: '100%',
    },
    /** Grid Height값 */
    height: {
      type: String,
      default: '500px',
    },
    /** 기본 Column 설정 */
    defaultColDef: {
      type: Object,
      default: () => ({}),
    },
    /** Column 설정 */
    columnDefs: {
      type: Array,
    },
    /** 로딩 템플릿 */
    overlayLoadingTemplate: {
      type: String,
      default: `<span class="ag-overlay-loading-center">Loading...</span>`,
    },
    /** row 없을 때 템플릿 */
    overlayNoRowsTemplate: {
      type: String,
      default: `<span>조회 결과가 없습니다.</span>`,
    },
    /** rowData */
    rowData: {
      type: Array,
    },
    /** rowNum 표출 Index */
    rowNumIndex: Number,
    /** 체크박스 표출 Index */
    checkboxIndex: Number,
    /** rowSelection 모드 (multiple: 여러개 선택) */
    rowSelection: {
      type: String,
      default: 'multiple',
    },
    /** Pagination 활성화 여부 */
    pagination: {
      type: Boolean,
      default: false,
    },
    /** 한 페이지당 row 표출 개수 */
    paginationPageSize: {
      type: Number,
      default: 20,
    },
  },
  data() {
    return {
      gridApi: null,
      newDefaultColDef: {},
      originDefaultColDef: {
        editable: false,
        sortable: true,
        resizable: true,
        filter: true,
      },
    }
  },
  beforeMount() {
    // defaultColDef 옵션
    Object.assign(this.newDefaultColDef, this.originDefaultColDef, this.defaultColDef);

    // columnDefs 세팅
    this.setColumnDefs();

    // columnDefs 정렬 기능
    Object.values(this.columnDefs)
      .filter(v => v.align)
      .map(v => {
        switch (v.align) {
          case 'left':
            v.cellClass = 'grid-cell-left';
            break;
          case 'center':
            v.cellClass = 'grid-cell-center';
            break;
          case 'right':
            v.cellClass = 'grid-cell-right';
            break;
        }
        delete v.align;
      });
  },
  methods: {
    /** grid ready 이벤트 */
    onGridReady(params) {
      this.gridApi = params.api;

      setTimeout(() => {
        this.gridApi.sizeColumnsToFit();
      }, 50);

      const newGridApi = Object.assign(this.gridApi, {
        getRowDatas: () => this.getRowDatas(),
        getRowNodes: () => this.getRowNodes(),
        removeSelectedRows: () => this.removeSelectedRows(),
      });

      this.$emit('gridready', newGridApi);
    },
    /** row를 클릭했을 때 */
    onCellClicked(params) {
      this.$emit('cellclicked', params);
    },
    /** row를 더블클릭했을 때 */
    onCellDoubleClicked(params) {
      this.$emit('celldoubleclicked', params);
    },
    /** 선택된 rows 제거 */
    removeSelectedRows() {
      const rows = this.gridApi.getSelectedRows();
      return this.gridApi.updateRowData({ remove: rows });
    },
    /** row datas 가져오기 */
    getRowDatas() {
      return this.rowData;
    },
    /** row nodes 가져오기 */
    getRowNodes() {
      let rowData = [];
      this.gridApi.forEachNode(node => rowData.push(node.data));
      return rowData;
    },
    /** rowData 속성이 변경되었을 때 */
    onRowDataUpdated() {
      this.setColumnDefs();
    },
    /** columnDefs 세팅 */
    setColumnDefs() {
      this.columnDefs.map((c,i) => {
        if (null !== this.rowNumIndex && i === this.rowNumIndex) {
          c.field = 'No';
          c.width = c.width || 15;
          this.rowData.map((r,j) => r.No = j+1);
        }
        
        if (null !== this.checkboxIndex && i === this.checkboxIndex) {
          c.field = '';
          c.width = 50;
          c.headerCheckboxSelection = true;
          c.checkboxSelection = true;
        }
      });
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'ag-grid-community/styles//ag-grid.css';
@import 'ag-grid-community/styles//ag-theme-alpine.css';

.ag-theme-alpine {
  --ag-font-family: $default-font03;
}
</style>