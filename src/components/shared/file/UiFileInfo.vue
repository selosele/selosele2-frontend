<template>
  <div class="file-info__wrapper d-flex-w gap--10 mt--10">
    <span class="file-info__text">
      {{ imgName }} (용량 : {{ getFileSize(imgSize) }})
    </span>

    <slot />
  </div>
</template>

<script>
import { getFileSize } from '@/utils';

export default {
  name: 'UiFileInfo',
  props: {
    /** 이미지명 */
    imgName: String,
    /** 이미지 용량 */
    imgSize: [Number, String],
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