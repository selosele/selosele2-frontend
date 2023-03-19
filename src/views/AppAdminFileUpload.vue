<template>
  <app-content-wrapper :pageTitle="pageTitle">
    <template v-if="0 < fileList.length">
      <ui-file-upload-field @upload="onUpload">
      </ui-file-upload-field>

      <ui-file-list :value="fileList"
                    :key="fileList"
                    :float="false"
                    :height="'26rem'"
                    @clickFile="onClickFile">
      </ui-file-list>
    </template>
  </app-content-wrapper>
</template>

<script>
import { BreadcrumbService } from '@/services/breadcrumb/breadcrumbService';

export default {
  name: 'app-admin-file-upload',
  data() {
    return {
      pageTitle: '이미지 업로드',
      fileList: [],
    }
  },
  async created() {
    // 페이지 타이틀 세팅
    new BreadcrumbService().setPageTitle(this.pageTitle);

    this.init();
  },
  methods: {
    /** 초기 세팅 */
    async init() {
      await this.listFile();
    },
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
    /** cloudinary 파일 업로드 전송 완료 시 */
    onUpload() {
      setTimeout(async () => {
        await this.listFile();
      }, 1000);
    },
  },
}
</script>

<style lang="scss" scoped>

</style>