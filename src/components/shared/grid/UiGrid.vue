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
    @grid-ready="onGridReady"
    @cell-doubleclicked="cellDoubleClicked"
  >
  </ag-grid-vue>
</template>

<script>
import { AgGridVue } from "ag-grid-vue3";

export default {
  name: 'ui-grid',
  components: {
    AgGridVue,
  },
  props: {
    // Grid Width값
    width: {
      type: String,
      default: '100%',
    },
    // Grid Height값
    height: {
      type: String,
      default: '500px',
    },
    // 기본 Column 설정
    defaultColDef: {
      type: Object,
      default: () => ({}),
    },
    // Column 설정
    columnDefs: {
      type: Array,
    },
    // 로딩 템플릿
    overlayLoadingTemplate: {
      type: String,
      default: `<span class="ag-overlay-loading-center">Loading...</span>`,
    },
    // row 없을 때 템플릿
    overlayNoRowsTemplate: {
      type: String,
      default: `<span>조회 결과가 없습니다.</span>`,
    },
    // rowData
    rowData: {
      type: Array,
    },
    // rowSelection 모드 (multiple: 여러개 선택)
    rowSelection: {
      type: String,
      default: 'multiple',
    },
    // Pagination 활성화 여부
    pagination: {
      type: Boolean,
      default: false,
    },
    // 한 페이지당 row 표출 개수
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

    // columnDefs checkbox 기능
    this.columnDefs.map(v => {
      if ('_checked' === v.field) {
        v.field = '';
        v.width = 50;
        v.headerCheckboxSelection = true;
        v.checkboxSelection = true;
      }
    });
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridApi.sizeColumnsToFit();
      this.$emit('onGridReady', params);
    },
    cellDoubleClicked(params) {
      this.$emit('cellDoubleClicked', params);
    },
    removeSelectedRows() {
      const selectedRows = this.gridApi.getSelectedRows();
      const newRowData = this.rowData.filter(row => !selectedRows.includes(row));
      this.gridApi.setRowData(newRowData);
      this.$emit('removeSelectedRows');
    },
  },
}
</script>

<style lang="scss">
@import 'ag-grid-community/styles//ag-grid.css';
@import 'ag-grid-community/styles//ag-theme-alpine.css';

.ag-theme-alpine {
  --ag-font-family: $default-font03;
}
</style>