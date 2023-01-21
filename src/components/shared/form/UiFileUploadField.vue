<template>
  <div class="file-upload__wrapper">
    <ui-file-field :name="'uploadFileList[]'"
                   :id="'uploadFileList'"
                   :title="'이미지 파일 선택'"
                   :accept="'image/*'" multiple
                   :hidden="true"
                   @onchange="onChange">
    </ui-file-field>

    <div class="file-upload__list upload-list">
      <label for="uploadFileList" class="file-upload--attach">
        <strong>여기에 드래그 &amp; 드롭으로 이미지를 첨부할 수 있습니다.</strong>
      </label>

      <ul>
        <li>
          <ui-hidden-field name="uploadFile" value="test.png"></ui-hidden-field>
          <span class="file-upload-file-name">test.png</span>
          <ui-icon-button :type="'button'" 
                          :icon="'xi-close'"
                          :text="'이미지 삭제'"
                          :class="'file-upload--remove'">
          </ui-icon-button>
        </li>
        <li>
          <ui-hidden-field name="uploadFile" value="test.png"></ui-hidden-field>
          <span class="file-upload-file-name">test.png</span>
          <ui-icon-button :type="'button'" 
                          :icon="'xi-close'"
                          :text="'이미지 삭제'"
                          :class="'file-upload--remove'">
          </ui-icon-button>
        </li>
      </ul>

      <div class="file-upload__btns">
        <ui-button :type="'button'"
                   :color="'secondary'"
                   :class="'file-upload__btn file-upload__btn--reset'">초기화
        </ui-button>
  
        <ui-button :type="'button'"
                   :color="'primary'"
                   :class="'file-upload__btn file-upload__btn--submit'">업로드
        </ui-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ui-file-upload-field',
  
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/views/upload.scss';
</style>