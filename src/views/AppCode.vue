<template>
  <template v-if="!dataLoaded">
    <ui-skeletor height="1.3rem" />
    <ui-skeletor height="1.3rem" />
    <ui-skeletor height="1.3rem" />
  </template>

  <template v-else>
    <div class="d-flex justify-content--right gap--10 mb--15">
      <button
        type="button"
        class="btn btn--primary"
        @click="addCode">추가
      </button>

      <button
        type="button"
        class="btn btn--dark"
        @click="removeCode">삭제
      </button>
    </div>

    <ui-grid
      :defaultColDef="defaultColDef"
      :columnDefs="columnDefs"
      :pagination="true"
      @onGridReady="onGridReady"
    >
    </ui-grid>
  </template>
</template>

<script>
import UiGrid from '@/components/shared/grid/UiGrid.vue';
import snackbar from '@/utils/ui/Snackbar';
import confirmUtil from '@/utils/ui/Confirm';

export default {
  name: 'app-code',
  components: {
    UiGrid,
  },
  data() {
    return {
      defaultColDef: {
        editable: true,
      },
      columnDefs: [
        { field: '_checked', },
        { headerName: '코드 ID', field: 'id', width: 130, },
        { headerName: '코드 접두어', field: 'prefix', width: 130, },
        { headerName: '코드 값', field: 'val', width: 130, },
        { headerName: '코드 명', field: 'nm', },
        { headerName: '코드 설명', field: 'desc', },
        { headerName: '코드 등록일시', field: 'regDate', },
        { headerName: '코드 사용여부', field: 'useYn', width: 150, },
      ],
      rowData: [],
      gridApi: null,
      dataLoaded: false,
    }
  },
  async created() {
    await this.dataLoading();
    await this.listCode();
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridApi.setRowData(this.rowData);
    },
    removeSelectedRows() {
      const selectedRows = this.gridApi.getSelectedRows();
      const newRowData = this.rowData.filter(row => !selectedRows.includes(row));
      this.gridApi.setRowData(newRowData);
    },
    // 공통코드 목록 조회
    listCode() {
      return this.$http.get('/code/list')
        .then(res => {
          res.data.map(d => {
            d.regDate = this.$moment(d.regDate).format('YYYY-MM-DD HH:mm:ss');
            this.rowData.push(d);
          });
          this.dataLoading();
        });
    },
    // 공통코드 추가
    addCode() {

    },
    // 공통코드 삭제
    async removeCode() {
      const rows = this.gridApi.getSelectedRows();
      if (0 === rows.length) {
        snackbar.warning('삭제할 항목을 선택하세요.');
        return;
      }

      // 테스트
      this.removeSelectedRows();

      const confirm = await confirmUtil.question('삭제하시겠습니까?');
      if (!confirm) return;

      let removeCodeDto = [];

      rows.forEach((item,idx) => {
        removeCodeDto.push({
          id: item.id,
        });
      });

      this.$http.delete('/code/remove', { data: removeCodeDto })
        .then(res => {
          //this.gridApi.removeSelectedRows();
        });
    },
    // 데이타 로딩
    dataLoading() {
      return Promise.resolve(
        setTimeout(() => {
          this.dataLoaded = true;
        }, 500)
      );
    },
  },
}
</script>

<style lang="scss">

</style>