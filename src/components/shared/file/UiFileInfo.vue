<template>
  <div class="file-info__wrapper mt--10">
    <span class="file-info__txt">
      {{ imgName }} (용량 : {{ getFileSize(imgSize) }})
    </span>

    <slot></slot>
  </div>
</template>

<script>
import { getFileSize } from '@/utils';

export default {
  name: 'ui-file-info',
  props: {
    /** 이미지명 */
    imgName: String,
    /** 이미지 용량 */
    imgSize: String,
  },
  data() {
    return {
      getFileSize,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/file-info.scss';
</style>