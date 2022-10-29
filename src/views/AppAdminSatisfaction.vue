<template>
  <template v-if="!dataLoaded">
    <ui-skeletor height="1.3rem" />
    <ui-skeletor height="1.3rem" />
    <ui-skeletor height="1.3rem" />
  </template>

  <ui-grid v-else
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
  name: 'app-admin-satisfaction',
  components: {
    UiGrid,
  },
  data() {
    return {
      columnDefs: [
        { headerName: '페이지 URL', field: 'pagePath', width: 130, },
        { headerName: '만족도 점수', field: 'score', width: 80, },
        { headerName: '만족도 의견', field: 'comment', },
        { headerName: '참여일시', field: 'regDate', width: 100, },
      ],
      rowData: [],
      dataLoaded: false,
    }
  },
  created() {
    this.listSatisfaction();
  },
  methods: {
    // 만족도조사 목록 조회
    listSatisfaction() {
      this.$http.get('/satisfaction/list')
        .then(res => {
          res.data.map(d => {
            d.regDate = this.$moment(d.regDate).format('YYYY-MM-DD HH:mm:ss');
            d.score = this.getScore(d.score);

            this.rowData.push(d);
            this.dataLoading();
          });
        }).catch(error => {
          snackbar.error('오류가 발생했습니다.');
        });
    },
    // 만족도조사 점수 가공
    getScore(score) {
      switch (score) {
        case '005':
          return '매우 만족';
        case '004':
          return '만족';
        case '003':
          return '보통';
        case '002':
          return '불만족';
        case '001':
          return '매우 불만족';
      }
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