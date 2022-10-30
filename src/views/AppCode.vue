<template>
  <template v-if="!dataLoaded">
    <ui-skeletor height="1.3rem" />
    <ui-skeletor height="1.3rem" />
    <ui-skeletor height="1.3rem" />
  </template>

  <ui-grid v-else
    :defaultColDef="defaultColDef"
    :columnDefs="columnDefs"
    :rowData="rowData"
    :pagination="true"
  >
  </ui-grid>
</template>

<script>
import UiGrid from '@/components/shared/grid/UiGrid.vue';
import snackbar from '@/utils/ui/Snackbar';

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
        { headerName: '코드 ID', field: 'id', width: 150,
          headerCheckboxSelection: true,
          checkboxSelection: true,
        },
        { headerName: '코드 접두어', field: 'prefix', width: 130, },
        { headerName: '코드 값', field: 'val', width: 130, },
        { headerName: '코드 명', field: 'nm', },
        { headerName: '코드 설명', field: 'desc', },
        { headerName: '코드 등록일시', field: 'regDate', },
        { headerName: '코드 사용여부', field: 'useYn', width: 150, },
      ],
      rowData: [],
      dataLoaded: false,
    }
  },
  async created() {
    await this.dataLoading();
    await this.listCode();
  },
  methods: {
    // 공통코드 목록 조회
    listCode() {
      return this.$http.get('/code/list')
        .then(res => {
          res.data.map(d => {
            d.regDate = this.$moment(d.regDate).format('YYYY-MM-DD HH:mm:ss');
            this.rowData.push(d);
          });
          this.dataLoading();
        }).catch(error => {
          snackbar.error('오류가 발생했습니다.');
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