<template>
  <app-content-wrapper :pageTitle="pageTitle">
    <template v-if="!dataLoaded">
      <ui-skeletor :height="'1.3rem'"></ui-skeletor>
      <ui-skeletor :height="'1.3rem'"></ui-skeletor>
      <ui-skeletor :height="'1.3rem'"></ui-skeletor>
    </template>

    <template v-if="dataLoaded && 0 < fileList.length">
      <ui-file-upload-field></ui-file-upload-field>

      <ui-file-list :value="fileList"
                    :float="false"
                    :height="'26rem'"
                    @clickFile="onClickFile">
      </ui-file-list>
    </template>
  </app-content-wrapper>
</template>

<script>
import { messageUtil } from '@/utils';
import { breadcrumbService } from '@/services/breadcrumb/breadcrumbService';

export default {
  name: 'app-file-upload',
  data() {
    return {
      pageTitle: '이미지 업로드',
      fileList: [],
      dataLoaded: false,
    }
  },
  async created() {
    // 페이지 타이틀 세팅
    breadcrumbService.setPageTitle(this.pageTitle);

    await this.listFile();
    this.dataLoading();
  },
  methods: {
    /** cloudinary 파일 목록 조회 */
    listFile() {
      return this.$http.get('/file')
        .then(res => {
          this.fileList = [...res.data];
        });
    },
    /** cloudinary 파일 클릭 시 */
    onClickFile(file) {

    },
    /** 데이타 로딩 */
    dataLoading() {
      if (0 < this.fileList.length) {
        this.dataLoaded = true;
      }
    },
  },
}
</script>

<style lang="scss" scoped>

</style>