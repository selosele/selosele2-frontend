<template>
  <app-content-wrapper>
    <div class="d-flex-w flex--right flex--middle gap--20 mb--15">
      <p class="mt--0 mb--0" v-if="autoSaveDate">
        최근 자동 색인 실행 일시: {{ autoSaveDate }}
      </p>

      <ui-button
        :color="'primary'"
        :text="'색인'"
        @click="saveIndexSearch"
      />
    </div>

    <ui-grid
      :columnDefs="columnDefs"
      :rowData="rowData"
      :rowNumIndex="0"
      :pagination="true"
      @gridready="onGridReady"
    />
  </app-content-wrapper>
</template>

<script>
import moment from 'moment';
import { messageUtil } from '@/utils';

export default {
  name: 'AppAdminSearch',
  data() {
    return {
      columnDefs: [
        { }, // rownum
        { headerName: '유형', field: 'typeCdNm', width: 50 },
        { headerName: '자동 색인 여부', field: 'autoYnNm', width: 100 },
        { headerName: '색인 건수', field: 'cnt', width: 150 },
        { headerName: '색인 시작일시', field: 'startDate', width: 100 },
        { headerName: '색인 종료일시', field: 'endDate', width: 100 },
      ],
      rowData: [],
      gridApi: null,
      autoSaveDate: null,
    }
  },
  async created() {
    // 페이지 타이틀 세팅
    this.$store.dispatch('Breadcrumb/FETCH_PAGE_TITLE', '검색 관리');

    await this.listIndexSearchLog();
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params;
    },
    /** 검색 색인 로그 목록 조회 */
    async listIndexSearchLog() {
      return this.$http.get('/indexsearchlog')
      .then(resp => {
        this.rowData = [];

        resp.data.forEach(d => {
          d.startDate = moment(d.startDate).format('YYYY-MM-DD HH:mm:ss');
          d.endDate = moment(d.endDate).format('YYYY-MM-DD HH:mm:ss');
          d.autoYnNm = this.getAutoYn(d.autoYn);
          d.typeCdNm = this.$store.state.Search.code
            .filter(v => v.prefix === 'D03')
            .find(v => v.id === d.typeCd).nm;
          
          this.rowData.push(d);
        });

        const autoY = this.rowData.filter(d => d.autoYn === 'Y');
        if (0 < autoY.length) {
          this.autoSaveDate = autoY[0].endDate;
        }
      });
    },
    /** 자동 색인 여부 반환 */
    getAutoYn(autoYn) {
      switch (autoYn) {
        case 'Y': return '자동';
        case 'N': return '수동';
      }
    },
    /** 검색 데이터 저장 */
    async saveIndexSearch() {
      const confirm = await messageUtil.confirmSuccess('데이터를 색인하시겠습니까?');
      if (!confirm) return;

      this.$http.post('/indexsearch')
      .then(async resp => {
        messageUtil.toastSuccess('색인 작업이 완료되었습니다.');

        await this.listIndexSearchLog();
      });
    },
  },
}
</script>

<style lang="scss" scoped>

</style>