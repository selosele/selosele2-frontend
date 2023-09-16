<template>
  <app-content-wrapper>
    <div class="d-flex flex--right gap--10 mb--15">
      <ui-button :color="'primary'"
                 @click="addCode">추가
      </ui-button>

      <ui-button :color="'dark'"
                 @click="removeCode">삭제
      </ui-button>
    </div>

    <ui-split-pane>
      <ui-pane>
        <ui-grid
          :columnDefs="columnDefs"
          :rowData="rowData"
          :checkboxIndex="0"
          :pagination="true"
          @gridready="onGridReady"
          @cellclicked="onCellClicked"
        >
        </ui-grid>
      </ui-pane>
      
      <ui-pane v-if="isSplitterActive">
        <app-save-code
          :code="code"
          :key="code.id"
          @saveCode="onSaveCode"
        >
        </app-save-code>
      </ui-pane>
    </ui-split-pane>
  </app-content-wrapper>
</template>

<script>
import AppSaveCode from '@/components/views/code/AppSaveCode.vue';
import { messageUtil } from '@/utils';

export default {
  name: 'app-admin-code',
  components: {
    AppSaveCode,
  },
  data() {
    return {
      columnDefs: [
        { pinned: 'left' }, // 체크박스
        { headerName: '코드 ID', field: 'id', width: 130 },
        { headerName: '코드 접두어', field: 'prefix', width: 130 },
        { headerName: '코드 값', field: 'val', width: 130 },
        { headerName: '코드 명', field: 'nm' },
        { headerName: '코드 설명', field: 'desc' },
        { headerName: '코드 등록일시', field: 'regDate' },
        { headerName: '코드 사용 여부', field: 'useYn', width: 150, align: 'center' },
      ],
      rowData: [],
      code: null,
      gridApi: null,
    }
  },
  async created() {
    
    // 페이지 타이틀 세팅
    this.$store.dispatch('Breadcrumb/FETCH_PAGE_TITLE', '공통코드 관리');

    await this.listCode();
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params;
    },
    /** 공통코드 조회 */
    onCellClicked(params) {
      this.$store.commit('Loading/SET_USE_LOADING', false);

      this.$http.get(`/code/${params.data.id}`)
      .then(resp => {
        this.code = { ...resp.data };
        this.$store.commit('Splitter/TOGGLE', true);
        this.$store.commit('Loading/SET_USE_LOADING', true);
      });
    },
    /** 공통코드 목록 조회 */
    listCode() {
      return this.$http.get('/code')
      .then(resp => {
        resp.data.map(d => {
          d.regDate = this.$moment(d.regDate).format('YYYY-MM-DD HH:mm:ss');
          d.useYn = this.getUseYn(d.useYn);
        });

        this.rowData = [...resp.data];
      });
    },
    /** 공통코드 등록 */
    addCode() {
      this.code = {};
      this.code.id = null;
      this.$store.commit('Splitter/TOGGLE', true);
    },
    /** 공통코드 삭제 */
    async removeCode() {
      const rows = this.gridApi.getSelectedRows();

      if (0 === rows.length) {
        messageUtil.toastWarning('삭제할 코드를 선택하세요.');
        return;
      }

      const confirm = await messageUtil.confirmQuestion('삭제하시겠습니까?');
      if (!confirm) return;

      let removeCodeDto = [];

      rows.forEach(d => {
        removeCodeDto.push({
          id: d.id,
        });
      });

      this.$http.post('/code/remove', removeCodeDto)
      .then(resp => {
        this.gridApi.removeSelectedRows();
        messageUtil.toastSuccess('삭제되었습니다.');

        this.$store.commit('Splitter/TOGGLE', false);
        this.$store.dispatch('Code/FETCH_CODE', this.gridApi.getRowNodes());
      });
    },
    /** 그리드 갱신 */
    async onSaveCode() {
      await this.listCode();
      this.$store.dispatch('Code/FETCH_CODE', this.rowData);
    },
    /** 코드 사용 여부 반환 */
    getUseYn(useYn) {
      switch (useYn) {
        case 'Y': return '사용';
        case 'N': return '미사용';
      }
    },
  },
}
</script>

<style lang="scss" scoped>

</style>