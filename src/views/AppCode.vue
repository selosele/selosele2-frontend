<template>
  <ag-grid-vue
    style="height: 500px"
    class="ag-theme-alpine"
    :defaultColDef="defaultColDef"
    :columnDefs="columnDefs"
    :rowData="rowData"
  >
  </ag-grid-vue>
</template>

<script>
import { AgGridVue } from "ag-grid-vue3";
import snackbar from '@/utils/ui/Snackbar';

export default {
  name: 'app-code',
  components: {
    AgGridVue,
  },
  data() {
    return {  
      defaultColDef: {
        sortable: true,
      },
      columnDefs: [
        { headerName: '코드 ID', field: 'id', width: '150px', },
        { headerName: '코드 접두어', field: 'prefix', width: '100px', },
        { headerName: '코드 값', field: 'val', width: '100px', },
        { headerName: '코드 명', field: 'nm', width: '150px', },
        { headerName: '코드 설명', field: 'desc', width: '150px', },
        { headerName: '코드 등록일시', field: 'regDate', width: '150px', },
        { headerName: '코드 수정일시', field: 'modDate', width: '150px', },
        { headerName: '코드 사용여부', field: 'useYn', width: 'auto', },
      ],
      rowData: [],
    }
  },
  created() {
    this.listCode();
  },
  methods: {
    listCode() {
      this.$http.get('/code/list')
        .then(res => {
          res.data.map(d => {
            d.regDate = this.$moment(d.regDate).format('YYYY-MM-DD HH:mm');
            this.rowData.push(d);
          });
        }).catch(error => {
          snackbar.error('오류가 발생했습니다.');
        });
    }
  },
}
</script>

<style lang="scss">

</style>