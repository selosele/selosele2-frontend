<template>
  <app-content-wrapper>
    <div class="d-flex flex--right gap--10 mb--15">
      <ui-icon-button
        :color="'primary'"
        :icon="'xi-pen'"
        :text="'그룹 생성'"
        :showText="true"
        @click="openModal('E01001')"
      />

      <ui-icon-button
        :color="'dark'"
        :icon="'xi-trash'"
        :text="'그룹 삭제'"
        :showText="true"
        @click="removePrograms"
      />
    </div>

    <ui-grid
      :columnDefs="columnDefs"
      :rowData="rowData"
      :checkboxIndex="0"
      :rowNumIndex="1"
      :pagination="true"
      @gridready="onGridReady"
      @cellclicked="onCellClicked"
    />
  </app-content-wrapper>
</template>

<script>
import moment from 'moment';
import { isNotBlank, messageUtil } from '@/utils';
import AppProgramModal from '@/components/views/program/AppProgramModal.vue';

export default {
  name: 'AppAdminProgram',
  components: {
    AppProgramModal,
  },
  data() {
    return {
      columnDefs: [
        { }, // checkbox
        { }, // rownum
        { headerName: '프로그램 그룹 명', field: 'nm' },
        { headerName: '등록일시', field: 'regDate', width: 100 },
        { headerName: '수정일시', field: 'modDate', width: 100 },
      ],
      rowData: [],
      gridApi: null,
    }
  },
  async created() {
    // 페이지 타이틀 세팅
    this.$store.dispatch('Breadcrumb/FETCH_PAGE_TITLE', '프로그램 관리');

    await this.listProgram();
  },
  watch: {
    // 프로그램이 등록/수정되고 Modal이 close됐을 때 실행됨
    async '$store.state.Program.savedProgram'(removedProgram) {
      if (0 < Object.values(removedProgram).length) {
        await this.listProgram();
        this.$store.dispatch('Program/FETCH_SAVED_PROGRAM', {});
      }
    },
    // 프로그램이 삭제되고 Modal이 close됐을 때 실행됨
    async '$store.state.Program.removedProgram'(removedProgram) {
      if (0 < Object.values(removedProgram).length) {
        await this.listProgram();
        this.$store.dispatch('Program/FETCH_REMOVED_PROGRAM', {});
      }
    },
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params;
    },
    onCellClicked(params) {
      this.$http.get(`/program/${params.data.id}`)
      .then(resp => {
        resp.data.regDate = moment(resp.data.regDate).format('YYYY-MM-DD HH:mm:ss');

        if (isNotBlank(resp.data.modDate)) {
          resp.data.modDate = moment(resp.data.modDate).format('YYYY-MM-DD HH:mm:ss');
        }
        this.openModal('E01002', resp.data);
      });
    },
    /** 프로그램 그룹 목록 조회 */
    listProgram() {
      return this.$http.get('/program')
      .then(resp => {
        resp.data.forEach(d => {
          d.regDate = moment(d.regDate).format('YYYY-MM-DD HH:mm:ss');

          if (isNotBlank(d.modDate)) {
            d.modDate = moment(d.modDate).format('YYYY-MM-DD HH:mm:ss');
          }
        });
        this.rowData = [...resp.data];
      });
    },
    /** 프로그램 그룹 생성/조회 Modal */
    openModal(crudType, program = null) {
      this.$store.commit('Splitter/TOGGLE', false);

      // 생성
      if ('E01001' === crudType) {
        this.$modal.show({
          component: AppProgramModal,
          bind: { crudType }
        });
      }
      // 조회
      else if ('E01002' === crudType) {
        this.$modal.show({
          component: AppProgramModal,
          bind: { crudType, program },
        });
      }
    },
    /** 프로그램 그룹 삭제 */
    async removePrograms() {
      const rows = this.gridApi.getSelectedRows();
      if (0 === rows.length) {
        messageUtil.toastWarning('삭제할 그룹을 선택하세요.');
        return;
      }

      const confirm = await messageUtil.confirmQuestion('하위 프로그램도 삭제됩니다. 계속하시겠습니까?');
      if (!confirm) return;

      let removeProgramDto = [];

      rows.forEach(d => {
        removeProgramDto.push({
          id: d.id,
        });
      });

      this.$http.post('/program/remove', removeProgramDto)
      .then(resp => {
        this.gridApi.removeSelectedRows();
        messageUtil.toastSuccess('삭제되었습니다.');
      });
    }
  }
}
</script>

<style lang="scss" scoped>

</style>