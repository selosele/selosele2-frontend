<template>
  <button :type="type"
          :class="`btn ${btnColor}${btnBlock}`"
          v-bind="$attrs"
          @click="listFile">
    <slot></slot>
  </button>

  <ui-file-list :value="fileList"
                @clickFile="onClickFile"
                v-if="0 < fileList.length">
  </ui-file-list>
</template>

<script>
import UiButton from './UiButton.vue';
import { messageUtil } from '@/utils';

export default {
  name: 'ui-file-button',
  extends: UiButton,
  props: {
    /** 버튼 여러 개 있을 경우 파일 목록 구분을 위한 key */
    listKey: String,
  },
  data() {
    return {
      /** 파일 목록 */
      fileList: [],
    }
  },
  methods: {
    /** cloudinary 파일 목록 조회 */
    async listFile() {
      if (0 < this.fileList.length) {
        this.fileList = [];
        return;
      }

      await (() => {
        return this.$http.get('/file')
        .then(res => {
          if (0 === res.data.length) {
            messageUtil.toastWarning('파일이 존재하지 않습니다.');
            return;
          }

          this.fileList = [...res.data];

          this.$emit('listFile', this.fileList, this.listKey);
        });
      })();
    },
    /** Cloudinary 파일 클릭 시 */
    onClickFile(file) {
      this.$emit('clickFile', file, this.listKey);
    },
  },
}
</script>

<style lang="scss" scoped>

</style>