<template>
  <ui-modal
    :title="getModalTitle()"
    :name="this.$options.name"
    :full="true"
    class="program-modal__wrapper"
  >
  <ui-form :name="'programForm'" @onsubmit="onSubmit">
    <ui-hidden-field :name="'id'" :value="program.id" />

    <div class="program__write__inputs">
      <div class="program__write__input-box">
        <label for="programNm" class="program__write__label">프로그램 그룹 명</label>
        <ui-text-field
          :name="'programNm'"
          :id="'programNm'"
          :rules="'required|max:50'"
          :value="program.nm"
        />
      </div>

      <div class="program__write__btns">
        <ui-button
          :type="'submit'"
          :color="'primary'"
          :text="'저장'"
          :class="'program__btn program__btn--write'"
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
          
        </ui-pane>
      </ui-split-pane>
    </ui-form>
  </ui-modal>
</template>

<script>
import { messageUtil } from '@/utils';
import { isNotEmpty } from '../../../utils';

export default {
  name: 'AppProgramModal',
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
      
    },
    /** Modal 타이틀 반환 */
    getModalTitle() {
      switch (this.crudType) {
        case 'E01001': return '프로그램 그룹 등록';
        case 'E01002':return this.program.nm;
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
      const confirm = await messageUtil.confirmSuccess('저장하시겠습니까?');
      if (!confirm) return;

      this.$http.put('/program', values)
      .then(resp => {
        messageUtil.toastSuccess('저장되었습니다.');

        this.$modal.hide(this.$options.name);
      });
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/views/program-modal.scss';
</style>