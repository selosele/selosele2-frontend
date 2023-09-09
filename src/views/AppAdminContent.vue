<template>
  <app-content-wrapper>
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
  </app-content-wrapper>
</template>

<script>
import { isNotEmpty, messageUtil } from '@/utils';

export default {
  name: 'app-admin-content',
  data() {
    return {
      columnDefs: [
        { }, // 체크박스
        { headerName: '콘텐츠 URL', field: 'link', width: 100 },
        { headerName: '콘텐츠 제목', field: 'title' },
        { headerName: '콘텐츠 등록일시', field: 'regDate', width: 100 },
        { headerName: '콘텐츠 수정일시', field: 'modDate', width: 100  },
      ],
      rowData: [],
      gridApi: null,
    }
  },
  async created() {
    // 페이지 타이틀 세팅
    this.$store.dispatch('Breadcrumb/FETCH_PAGE_TITLE', '콘텐츠 관리');

    await this.listContent();
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params;
    },
    onCellDoubleClicked(params) {
      this.$router.push(`/content${params.data['link']}`);
    },
    /** 콘텐츠 목록 조회 */
    listContent() {
      return this.$http.get('/content')
      .then(resp => {
        this.rowData = [];

        resp.data[0].map(d => {
          d.regDate = this.$moment(d.regDate).format('YYYY-MM-DD HH:mm:ss');

          if (isNotEmpty(d.modDate)) {
            d.modDate = this.$moment(d.modDate).format('YYYY-MM-DD HH:mm:ss');
          }

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

      this.$http.post('/content/remove', removeContentDto)
      .then(resp => {
        this.gridApi.removeSelectedRows();
        messageUtil.toastSuccess('삭제되었습니다.');
      });
    },
  },
}
</script>

<style lang="scss" scoped>

</style>