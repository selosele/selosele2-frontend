<template>
  <app-content-wrapper :pageTitle="pageTitle">
    <template v-if="!dataLoaded">
      <ui-skeletor :height="'1.3rem'"></ui-skeletor>
      <ui-skeletor :height="'1.3rem'"></ui-skeletor>
      <ui-skeletor :height="'1.3rem'"></ui-skeletor>
    </template>

    <template v-else>
      <div class="d-flex flex--right gap--10 mb--15">
        <ui-icon-button :routerLink="'/add-content'"
                        :color="'primary'"
                        :icon="'xi-pen'"
                        :class="'content__create'">콘텐츠 생성
        </ui-icon-button>

        <ui-icon-button :color="'dark'"
                        :icon="'xi-trash'"
                        :class="'content__delete'"
                        @click="removeContent">콘텐츠 삭제
        </ui-icon-button>
      </div>

      <ui-grid
        :columnDefs="columnDefs"
        :rowData="rowData"
        :checkboxIndex="0"
        :pagination="true"
        @gridready="onGridReady"
        @celldoubleclicked="onCellDoubleClicked"
      >
      </ui-grid>
    </template>
  </app-content-wrapper>
</template>

<script>
import { messageUtil } from '@/utils';
import { breadcrumbService } from '@/services/breadcrumb/breadcrumbService';

export default {
  name: 'app-content',
  data() {
    return {
      pageTitle: '콘텐츠 관리',
      columnDefs: [
        { }, // 체크박스
        { headerName: '콘텐츠 URL', field: 'link' },
        { headerName: '콘텐츠 제목', field: 'title' },
        { headerName: '콘텐츠 등록일시', field: 'regDate', width: 150 },
        { headerName: '콘텐츠 수정일시', field: 'modDate', width: 150  },
      ],
      rowData: [],
      gridApi: null,
      dataLoaded: false,
    }
  },
  async created() {
    // 페이지 타이틀 세팅
    breadcrumbService.setPageTitle(this.pageTitle);

    await this.listContent();
    this.dataLoading();
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params;
    },
    onCellDoubleClicked(params) {
      this.$router.push('/content' + params.data['link']);
    },
    /** 콘텐츠 목록 조회 */
    listContent() {
      return this.$http.get('/content')
      .then(res => {
        this.rowData = [];

        res.data.map(d => {
          d.regDate = this.$moment(d.regDate).format('YYYY-MM-DD HH:mm:ss');
          d.modDate = this.$moment(d.modDate).format('YYYY-MM-DD HH:mm:ss');

          this.rowData.push(d);
        });
      });
    },
    /** 콘텐츠 삭제 */
    async removeContent() {
      const rows = this.gridApi.getSelectedRows();
      if (0 === rows.length) {
        messageUtil.toastWarning('삭제할 콘텐츠를 선택하세요.');
        return;
      }

      const confirm = await messageUtil.confirmQuestion('삭제하시겠습니까?');
      if (!confirm) return;

      let removeContentDto = [];

      rows.forEach((d,i) => {
        removeContentDto.push({
          id: d.id,
        });
      });

      this.$http.delete('/content', { data: removeContentDto })
      .then(res => {
        this.gridApi.removeSelectedRows();
        messageUtil.toastSuccess('삭제되었습니다.');
      });
    },
    /** 데이타 로딩 */
    dataLoading() {
      if (0 < this.rowData.length) {
        this.dataLoaded = true;
      }
    },
  },
}
</script>

<style lang="scss" scoped>

</style>