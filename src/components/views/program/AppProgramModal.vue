<template>
  <ui-modal
    :title="program ? programNm : '프로그램 그룹 등록'"
    :name="this.$options.name"
    :full="true"
    class="program-modal__wrapper"
  >
  <ui-form :name="'programForm'" @onsubmit="onSubmit">
    <ui-hidden-field v-if="program" :name="'id'" :value="program.id" />

    <div class="program__write__inputs">
      <div class="program__write__input-box">
        <label for="programNm" class="program__write__label">프로그램 그룹 명</label>
        <ui-text-field
          :name="'nm'"
          :id="'programNm'"
          :rules="'required|max:50'"
          :value="program?.nm"
          v-model="programNm"
        />
      </div>

      <div class="program__write__btns">
        <ui-button
          :type="'submit'"
          :color="'primary'"
          :text="'저장'"
          :class="'program__btn program__btn--write'"
        />

        <ui-button
          v-if="program"
          :type="'button'"
          :color="'dark'"
          :text="'삭제'"
          :class="'program__btn program__btn--write'"
          @click="removePost(program.id)"
        />
      </div>
    </div>

      <p v-if="'E01002' === crudType">
        총 {{ this.rowData.length }}개의 하위 프로그램
      </p>

      <ui-split-pane>
        <ui-pane>
          <ui-grid
            :columnDefs="columnDefs"
            :rowData="rowData"
            :checkboxIndex="0"
            :pagination="true"
            @gridready="onGridReady"
            @cellclicked="onCellClicked"
          />
        </ui-pane>

        <ui-pane v-if="isSplitterActive">
          <app-save-program-detail
            :programDetail="programDetail"
            :key="programDetail.id"
          />
        </ui-pane>
      </ui-split-pane>
    </ui-form>
  </ui-modal>
</template>

<script>
import { messageUtil } from '@/utils';
import { isNotEmpty } from '../../../utils';
import AppSaveProgramDetail from '@/components/views/program/AppSaveProgramDetail.vue';

export default {
  name: 'AppProgramModal',
  components: {
    AppSaveProgramDetail,
  },
  props: {
    /** CRUD 유형 */
    crudType: String,
    /** 프로그램 */
    program: Object,
  },
  data() {
    return {
      columnDefs: [
        { }, // checkbox
        { headerName: '프로그램 명', field: 'nm' },
        { headerName: '요청 메소드', field: 'method', width: 80 },
        { headerName: 'ROUTE PATH', field: 'routePath' },
        { headerName: '사용 여부', field: 'useYnNm', width: 80 },
        { headerName: '등록일시', field: 'regDate', width: 100 },
      ],
      rowData: [],
      gridApi: null,
      programNm: '',
      programDetail: {},
    }
  },
  created() {
    if (isNotEmpty(this.program)) {
      this.program.programDetail.forEach(d => {
        d.useYnNm = this.getUseYn(d.useYn);
        d.regDate = this.$moment(d.regDate).format('YYYY-MM-DD HH:mm:ss');
  
        this.rowData.push(d);
      });
    }
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params;
    },
    onCellClicked(params) {
      this.programDetail = this.program.programDetail.find(d => d.id === params.data.id);
      this.$store.commit('Splitter/TOGGLE', true);
    },
    /** Modal 타이틀 반환 */
    getModalTitle() {
      switch (this.crudType) {
        case 'E01001': return '프로그램 그룹 등록';
        case 'E01002': return this.programNm;
      }
    },
    /** 코드 사용 여부 반환 */
    getUseYn(useYn) {
      switch (useYn) {
        case 'Y': return '사용';
        case 'N': return '미사용';
      }
    },
    /** 프로그램 그룹 저장 */
    async onSubmit(values) {
      const confirm = await messageUtil.confirmSuccess('그룹을 저장하시겠습니까?');
      if (!confirm) return;

      // 등록, 조회(수정)
      if ('E01001' === this.crudType || 'E01002' === this.crudType) {
        this.$http.post('/program', values)
        .then(resp => {
          messageUtil.toastSuccess('저장되었습니다.');
  
          this.$modal.hide(this.$options.name);
          this.$store.dispatch('Program/FETCH_SAVED_PROGRAM', resp.data);
        });
      }
    },
    /** 프로그램 그룹 삭제 */
    async removePost(id) {
      const confirm = await messageUtil.confirmSuccess('그룹을 삭제하시겠습니까?');
      if (!confirm) return;

      this.$http.delete(`/program/${id}`)
      .then(resp => {
        messageUtil.toastSuccess('삭제되었습니다.');

        this.$modal.hide(this.$options.name);
        this.$store.dispatch('Program/FETCH_REMOVED_PROGRAM', resp.data);
      });
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/views/program-modal.scss';
</style>