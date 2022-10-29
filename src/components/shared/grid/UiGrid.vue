<template>
  <ag-grid-vue
    class="ag-theme-alpine"
    :style="{ width: width, height: height }"
    :defaultColDef="newDefaultColDef"
    :columnDefs="columnDefs"
    :rowData="rowData"
    :pagination="pagination"
    :paginationPageSize="paginationPageSize"
    @grid-ready="onGridReady"
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
    // rowData
    rowData: {
      type: Array,
    },
    // Pagination 활성화 여부
    pagination: {
      type: Boolean,
      default: false,
    },
    // 한 페이지당 표출 row 개수
    paginationPageSize: {
      type: Number,
      default: 20,
    },
  },
  data() {
    return {
      newDefaultColDef: {},
      OriginDefaultColDef: {
        filter: true,
        editable: false,
        sortable: true,
        resizable: true,
      },
    }
  },
  mounted() {
    Object.assign(this.newDefaultColDef, this.OriginDefaultColDef, this.defaultColDef);
  },
  methods: {
    onGridReady(params) {
      params.api.sizeColumnsToFit();
    },
  },
}
</script>

<style lang="scss">
.ag-theme-alpine {
  --ag-font-family: $default-font03;
}
</style>