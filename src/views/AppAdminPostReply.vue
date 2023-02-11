<template>
  <app-content-wrapper :pageTitle="pageTitle">
    <template v-if="!dataLoaded">
      <ui-skeletor :height="'1.3rem'"></ui-skeletor>
      <ui-skeletor :height="'1.3rem'"></ui-skeletor>
      <ui-skeletor :height="'1.3rem'"></ui-skeletor>
    </template>

    <template v-else>
      <div class="d-flex flex--right gap--10 mb--15">
        <ui-select :name="'option'"
                   :id="'listPostReplyAllOption'"
                   :title="'댓글 조회 옵션 선택'"
                   :data="optionList"
                   v-model="option"
                   @onchange="listPostReplyAll">
        </ui-select>

        <ui-button :type="'button'"
                   :color="'primary'"
                   @click="restorePostReply"
                   v-if="'delYn' === option">복구
        </ui-button>
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
import { breadcrumbService } from '@/services/breadcrumb/breadcrumbService';
import { isNotBlank, isNotEmpty, messageUtil } from '@/utils';

export default {
  name: 'app-admin-post-reply',
  data() {
    return {
      pageTitle: '포스트 댓글 관리',
      columnDefs: [
        { }, // 체크박스
        { headerName: '댓글 URL', field: 'link', width: 80 },
        { headerName: '댓글 내용', field: 'cont' },
        { headerName: '댓글 등록일시', field: 'regDate', width: 100 },
        { headerName: '댓글 수정일시', field: 'modDate', width: 100 },
      ],
      rowData: [],
      optionList: [],
      option: '',
      gridApi: null,
      dataLoaded: false,
    }
  },
  async created() {
    // 페이지 타이틀 세팅
    breadcrumbService.setPageTitle(this.pageTitle);

    this.optionList = [
      { value: '', text: '전체' },  
      { value: 'adminYn', text: '관리자 작성 댓글' },
      { value: 'delYn', text: '삭제된 댓글' },
    ];

    await this.listPostReplyAll();
    this.dataLoading();
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params;
    },
    onCellDoubleClicked(params) {
      this.$router.push(params.data['link']);
    },
    /** 포스트 댓글 목록 조회 */
    listPostReplyAll() {
      let listPostReplyDto = {};

      // 삭제된 댓글 선택 시
      if (isNotBlank(this.option)) {
        listPostReplyDto[this.option] = 'Y';
      }

      return this.$http.get('/postreply', { params: listPostReplyDto })
      .then(res => {
        this.rowData = [];

        res.data.map(d => {
          d.link = `/post/${d.parentId}`;
          d.regDate = this.$moment(d.regDate).format('YYYY-MM-DD HH:mm:ss');

          if (isNotEmpty(d.modDate)) {
            d.modDate = this.$moment(d.modDate).format('YYYY-MM-DD HH:mm:ss');
          }

          this.rowData.push(d);
        });
      });
    },
    /** 삭제된 포스트 댓글 복구 */
    async restorePostReply() {
      const rows = this.gridApi.getSelectedRows();

      if (0 === rows.length) {
        messageUtil.toastWarning('항목을 선택하세요.');
        return;
      }

      const confirm = await messageUtil.confirmSuccess('복구하시겠습니까?');
      if (!confirm) return;

      this.$http.put('/postreply/restore', rows)
      .then(res => {
        messageUtil.toastSuccess('복구되었습니다.');
        this.gridApi.removeSelectedRows();
      });
    },
    /** 데이타 로딩 */
    dataLoading() {

      // 데이타가 없어도 로딩이 완료되어야 함
      this.dataLoaded = true;
    },
  },
}
</script>

<style lang="scss" scoped>

</style>