<template>
  <template v-if="!dataLoaded">
    <ui-skeletor height="1.3rem" />
    <ui-skeletor height="1.3rem" />
    <ui-skeletor height="1.3rem" />
  </template>

  <template v-else>
    <div class="d-flex justify-content--right gap--10 mb--15">
      <ui-datepicker
        v-model="regDate"
        @onClear="onClear"
        @update:modelValue="listByRegDate"
      >
      </ui-datepicker>

      <button
        type="button"
        class="btn btn--secondary"
        @click="listByAllDate">전체
      </button>

      <button
        type="button"
        class="btn btn--dark"
        @click="listByNowDate">Today
      </button>
    </div>

    <ui-grid
      :columnDefs="columnDefs"
      :rowData="rowData"
      :rowNumIndex="0"
      :pagination="true"
      @onGridReady="onGridReady"
      @cellDoubleClicked="cellDoubleClicked"
    >
    </ui-grid>
  </template>
</template>

<script>
import UiSkeletor from '@/components/shared/skeletor/UiSkeletor.vue';
import UiGrid from '@/components/shared/grid/UiGrid.vue';
import UiDatepicker from '@/components/shared/form/UiDatepicker.vue';

export default {
  name: 'app-admin-satisfaction',
  components: {
    UiSkeletor,
    UiGrid,
    UiDatepicker,
  },
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
      dataLoaded: false,
    }
  },
  async created() {
    await this.listSatisfaction({
      isToday: 'N',
    });
    this.dataLoading();
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params;
    },
    cellDoubleClicked(params) {
      this.$router.push(params.data['pagePath']);
    },
    // 만족도조사 목록 조회
    listSatisfaction(searchSatisfactiontDto) {
      return this.$http.get('/satisfaction/list', { params: searchSatisfactiontDto })
        .then(res => {
          this.rowData = [];

          res.data.map(d => {
            d.regDate = this.$moment(d.regDate).format('YYYY-MM-DD HH:mm:ss');
            d.score = this.$store.state.code
              .filter(v => 'B01' === v.prefix && (v.val === d.score))
              .map(v => v.nm);

            this.rowData.push(d);
          });
        });
    },
    // Datepicker clear 버튼을 눌렀을 때
    onClear() {
      this.listByAllDate();
    },
    // 날짜별 조회
    async listByRegDate() {
      await this.listSatisfaction({
        isToday: 'N',
        regDate: this.$moment(this.regDate).format('YYYY-MM-DD'),
      });
      this.gridApi.setRowData(this.rowData);
    },
    // 오늘 날짜 조회
    async listByNowDate() {
      await this.listSatisfaction({
        isToday: 'Y',
      });
      this.gridApi.setRowData(this.rowData);
    },
    // 전체 날짜 조회
    async listByAllDate() {
      await this.listSatisfaction({
        isToday: 'N',
      });
      this.gridApi.setRowData(this.rowData);
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

<style lang="scss">

</style>