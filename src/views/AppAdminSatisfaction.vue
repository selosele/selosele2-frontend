<template>
  <app-content-wrapper>
    <div class="d-flex flex--right gap--10 mb--15">
      <ui-datepicker
        v-model="regDate"
        @clear="onClear"
        @update:modelValue="listByRegDate"
      >
      </ui-datepicker>

      <ui-button :color="'secondary'"
                 @click="listByAllDate">전체
      </ui-button>

      <ui-button :color="'dark'"
                 @click="listByNowDate">Today
      </ui-button>
    </div>

    <ui-grid
      :columnDefs="columnDefs"
      :rowData="rowData"
      :rowNumIndex="0"
      :pagination="true"
      @gridready="onGridReady"
      @celldoubleclicked="onCellDoubleClicked"
    >
    </ui-grid>
  </app-content-wrapper>
</template>

<script>
export default {
  name: 'app-admin-satisfaction',
  data() {
    return {
      columnDefs: [
        { }, // rowNum
        { headerName: '페이지 URL', field: 'pagePath', width: 100 },
        { headerName: '만족도 점수', field: 'score', width: 80 },
        { headerName: '만족도 의견', field: 'comment' },
        { headerName: '참여일시', field: 'regDate', width: 100 },
      ],
      rowData: [],
      regDate: null,
      gridApi: null,
    }
  },
  async created() {
    // 페이지 타이틀 세팅
    this.$store.dispatch('Breadcrumb/FETCH_PAGE_TITLE', '만족도조사 관리');

    await this.listSatisfaction({
      isToday: 'N',
    });
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params;
    },
    onCellDoubleClicked(params) {
      this.$router.push(params.data['pagePath']);
    },
    /** 만족도조사 목록 조회 */
    listSatisfaction(searchSatisfactiontDto) {
      return this.$http.get('/satisfaction', { params: searchSatisfactiontDto })
      .then(resp => {
        this.rowData = [];

        resp.data.forEach(d => {
          d.regDate = this.$moment(d.regDate).format('YYYY-MM-DD HH:mm:ss');
          d.score = this.$store.state.Satisfaction.code
            .filter(v => v.prefix === 'B01' && (v.val === d.score))
            .map(v => v.nm);

          this.rowData.push(d);
        });
      });
    },
    /** Datepicker clear 버튼을 눌렀을 때 */
    onClear() {
      this.listByAllDate();
    },
    /** 날짜별 조회 */
    async listByRegDate() {
      await this.listSatisfaction({
        isToday: 'N',
        regDate: this.$moment(this.regDate).format('YYYY-MM-DD'),
      });
      this.gridApi.setRowData(this.rowData);
    },
    /** 오늘 날짜 조회 */
    async listByNowDate() {
      await this.listSatisfaction({
        isToday: 'Y',
      });
      this.gridApi.setRowData(this.rowData);
    },
    /** 전체 날짜 조회 */
    async listByAllDate() {
      await this.listSatisfaction({
        isToday: 'N',
      });
      this.gridApi.setRowData(this.rowData);
    },
  },
}
</script>

<style lang="scss" scoped>

</style>