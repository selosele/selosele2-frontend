<template>
  <div class="file-upload__wrapper">
    <ui-file-field
      :name="'uploadFiles'"
      :id="'uploadFiles'"
      :title="'이미지 파일 선택'"
      :accept="'image/*'" multiple
      :hidden="true"
      @onchange="onChange"
    />

    <div :class="{
      'file-upload__list': true,
      'upload-list': true,
      'file-upload__list--active': isDragged
    }"
      @dragenter="onDragEnter"
      @dragover="onDragOver"
      @dragleave="onDragLeave"
      @drop="onDrop"
    >
      <div class="file-upload__list__inner">
        <label for="uploadFiles" class="file-upload--attach">
          <strong>여기에 드래그 &amp; 드롭으로 이미지를 첨부할 수 있습니다.</strong>
        </label>

        <ul>
          <li v-for="(file,i) in fileList" :key="i">
            <span
              class="file-upload__list__file-name"
              @mouseenter="toggleImage(i)"
              @mouseleave="hideImage(i)"
            >{{ file.name }}

              <span class="file-upload__list__file-info" v-show="i === activeIndex">
                <img :src="file.src" :alt="file.name">
              </span>
            </span>
            
            <ui-icon-button
              :icon="'xi-close'"
              :text="'이미지 삭제'"
              :class="'file-upload--remove'"
              @click="onRemove(i)"
            />
          </li>
        </ul>
      </div>

      <div class="file-upload__btns">
        <ui-button
          :color="'secondary'"
          :text="'초기화'"
          :class="'file-upload__btn file-upload__btn--reset'"
          @click.stop="onReset"
        />
  
        <ui-button
          :color="'primary'"
          :text="'업로드'"
          :class="'file-upload__btn file-upload__btn--submit'"
          @click.stop="onSubmit"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { messageUtil } from '@/utils';

export default {
  name: 'UiFileUploadField',
  data() {
    return {
      /** 파일 목록 */
      fileList: [],
      /** 파일 드래그 완료 상태 */
      isDragged: false,
      /** 파일 미리보기 활성화 index */
      activeIndex: -1,
    }
  },
  methods: {
    onDragEnter() {
      this.isDragged = true;
    },
    onDragLeave() {
      this.isDragged = false;
    },
    onDragOver(e) {
      e.preventDefault();
    },
    onDrop(e) {
      e.preventDefault();

      this.isDragged = false;
      const files = e.dataTransfer.files;
      this.addFiles(files);
    },
    /** 파일 input 값 변경 시 */
    onChange(files) {
      this.addFiles([files]);
    },
    /** 파일 등록 */
    async addFiles(files) {
      for (const file of files) {
        const isValid = this.addFileValidationCheck(file);
        if (!isValid) return;

        const src = await this.readFiles(file);
        file.src = src;
        
        this.fileList.push(file);
      }
    },
    /** 파일 읽기 */
    async readFiles(files) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve(e.target.result);
        }
        reader.readAsDataURL(files);
      });
    },
    /** 파일 삭제 */
    onRemove(idx) {
      this.fileList.splice(idx, 1);
    },
    /** 파일 업로드 초기화 */
    onReset() {
      this.fileList = [];
    },
    /** 파일 미리보기 */
    toggleImage(idx) {
      if (idx === this.activeIndex) {
        this.activeIndex = -1;
        return;
      }
      
      this.activeIndex = idx;
    },
    /** 파일 미리보기 숨김처리 */
    hideImage(idx) {
      if (idx === this.activeIndex) {
        this.activeIndex = -1;
      }
    },
    /** 파일 업로드 전송 */
    async onSubmit() {
      const isValid = this.submitValidationCheck();
      if (!isValid) return;

      const confirm = await messageUtil.confirmSuccess('전송하시겠습니까?');
      if (!confirm) return;

      for (const file of this.fileList) {
        // 이미지 파일의 src 속성 값이 너무 길고 불필요하므로 삭제한다.
        delete file.src;
      }

      const headers = { 'Content-Type': 'multipart/form-data' };

      this.$http.post('/file', this.fileList, { headers })
      .then(resp => {
        messageUtil.toastSuccess('전송되었습니다.');

        this.onReset();
        this.$emit('upload');
      });
    },
    /** 파일 등록 유효성 검사 */
    addFileValidationCheck(file) {
      if (!file.name.match(/(.*?)\.(jpg|jpeg|png)$/)) {
        messageUtil.toastWarning('jpg, jpeg, png 파일만 업로드 가능합니다.');
        return false;
      }

      return true;
    },
    /** 파일 업로드 전송 유효성 검사 */
    submitValidationCheck() {
      if (0 === this.fileList.length) {
        messageUtil.toastWarning('파일이 없습니다.');
        return false;
      }

      return true;
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/views/upload.scss';
</style>