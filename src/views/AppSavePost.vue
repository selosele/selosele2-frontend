<template>
  <app-content-wrapper :pageTitle="pageTitle">
    <div class="write__wrapper">
      <ui-form :name="'savePostForm'"
               :ref="'savePostForm'"
               :class="'write__frm'"
               :preventEnter="true"
               @onsubmit="onSubmit"
      >
        <div class="write__save-wrapper">
          <ui-button :type="'button'"
                     :color="'primary'"
                     :class="'write__btn--load'">불러오기
          </ui-button>
    
          <ul class="write__save-list"></ul>
        </div>

        <ui-hidden-field :name="'id'" :id="'savePostId'" :value="post?.id"></ui-hidden-field>
    
        <ui-write-table :name="'포스트 작성 폼'">
          <tr>
            <th scope="row">
              <label for="savePostTitle">제목</label>
            </th>
            <td>
              <div class="write__title">
                <ui-select :name="'category'"
                           :id="'savePostCategory'"
                           :class="'write__select-category'"
                           :title="'카테고리 선택'"
                           :defaultValue="'카테고리 선택'"
                           :rules="'required'"
                           :data="categoryList"
                           v-model="categoryId">
                </ui-select>
  
                <ui-text-field :type="'text'"
                               :name="'title'"
                               :id="'savePostTitle'"
                               :rules="'required'"
                               :block="true">
                </ui-text-field>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">
              <label for="savePostCont">내용</label>
            </th>
            <td>
              <ui-textarea :name="'cont'"
                           :id="'savePostCont'"
                           :cols="'80'"
                           :rows="'18'"
                           :rules="'required'"
                           :hidden="true"
                           v-model="cont">
              </ui-textarea>

              <md-editor :language="'en-US'"
                         v-model="cont">
              </md-editor>
            </td>
          </tr>
          <tr>
            <th scope="row">
              <label for="savePostOgDesc">본문 요약</label>

              <ui-icon-button :type="'button'"
                              :icon="'xi-refresh'"
                              :text="'본문 요약 갱신'"
                              :class="'write__og-desc-refresh'"
                              @click="changeOgDesc">
              </ui-icon-button>
            </th>
            <td>
              <ui-text-field :type="'text'"
                             :name="'ogDesc'"
                             :id="'savePostOgDesc'"
                             :class="'write__og-desc'"
                             :placeholder="'50자 이내(생략 시, 제목이 들어감)'"
                             :block="true">
              </ui-text-field>
            </td>
          </tr>
          <tr>
            <th scope="row">
              <label for="savePostOgImgFile">대표 이미지</label>
            </th>
            <td>
              <ui-hidden-field :name="'ogImg'" :id="'savePostOgImg'" :value="post?.avatarImg"></ui-hidden-field>
              <ui-hidden-field :name="'ogImgUrl'" :id="'savePostOgImgUrl'" :value="post?.avatarImgUrl"></ui-hidden-field>
              <ui-hidden-field :name="'ogImgSize'" :id="'savePostOgImgSize'" :value="post?.avatarImgSize"></ui-hidden-field>

              <ui-file-field :name="'ogImgFile'"
                             :id="'savePostOgImgFile'"
                             :accept="'image/*'"
                             :gap="10"
                             @onchange="onChangeOgImg">
                
                <ui-file-button :type="'button'"
                                :color="'secondary'"
                                @clickFile="onClickFile">Cloudinary
                </ui-file-button>
              </ui-file-field>

              <div class="blog-config__avatar-image-use-wrapper" v-if="post?.ogImg">
                <span class="blog-config__avatar-image-use">
                  {{ ogImg }} (용량 : {{ getFileSize(ogImgSize) }})
                </span>

                <ui-checkbox :name="'delOgImg'"
                             :id="'savePostDelOgImg'"
                             :label="'삭제'"
                             :values="'Y,N'">
                </ui-checkbox>
              </div>
            </td>
          </tr>
          <tr v-if="'D01002' === $route.meta.type">
            <th scope="row">
              <label for="savePostAddTag">태그</label>
            </th>
            <td>
              <ui-hidden-field :name="'saveTagList'" :id="'saveTagList'"></ui-hidden-field>
            
              <div class="write__tag__wrapper">
                <ui-text-field :type="'text'"
                               :name="'addTag'"
                               :id="'savePostAddTag'"
                               :class="'write__tag'"
                               :placeholder="'태그 입력 (쉼표로 구분, 5개까지 입력 가능)'"
                               :block="true"
                               v-model="tagStr">
                </ui-text-field>

                <ui-select :name="'tag'"
                           :id="'savePostTag'"
                           :class="'write__select-tag'"
                           :title="'태그 선택'"
                           :defaultValue="'나의 태그'"
                           :data="tagList"
                           @onchange="onChangeTag">
                </ui-select>
              </div>
            </td>
          </tr>
          <tr v-if="'D01002' === $route.meta.type">
            <th scope="row">공개/비공개</th>
            <td>
              <ui-radio :id="'savePostSecretN'"
                        :name="'secretYn'"
                        :label="'공개'"
                        :rules="'required'"
                        :value="'N'"
                        v-model="secretYn">
              </ui-radio>
          
              <ui-radio :id="'savePostSecretY'"
                        :name="'secretYn'"
                        :label="'비공개'"
                        :rules="'required'"
                        :value="'Y'"
                        v-model="secretYn">
              </ui-radio>
            </td>
          </tr>
          <tr v-if="'D01002' === $route.meta.type">
            <th scope="row">상단고정</th>
            <td>
              <ui-radio :id="'savePostPinN'"
                        :name="'pinYn'"
                        :label="'비고정'"
                        :rules="'required'"
                        :value="'N'"
                        v-model="secretYn">
              </ui-radio>

              <ui-radio :id="'savePostPinY'"
                        :name="'pinYn'"
                        :label="'고정'"
                        :rules="'required'"
                        :value="'Y'"
                        v-model="secretYn">
              </ui-radio>
            </td>
          </tr>

          <template v-slot:btn>
            <ui-button :type="'button'"
                       :color="'success'"
                       :class="'write__btn'">임시저장
            </ui-button>

            <ui-button :type="'reset'"
                       :color="'secondary'"
                       :class="'write__btn'">다시작성
            </ui-button>

            <ui-button :type="'submit'"
                       :color="'primary'"
                       :class="'write__btn'">저장
            </ui-button>
          </template>
        </ui-write-table>
      </ui-form>
    </div>
  </app-content-wrapper>
</template>

<script>
import { arrayHasDuplicateValue, isBlank, isNotEmpty, messageUtil } from '@/utils';
import { breadcrumbService } from '@/services/breadcrumb/breadcrumbService';
import AppSavePostTag from '@/components/views/post/AppSavePostTag.vue';

import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

export default {
  name: 'app-add-post',
  components: {
    AppSavePostTag,
    MdEditor,
  },
  data() {
    return {
      /** 페이지 타이틀 */
      pageTitle: '포스트 작성',
      /** 수정 포스트 */
      post: null,
      /** 수정 포스트 내용 */
      cont: '',
      /** 대표 이미지 */
      ogImg: '',
      /** 대표 이미지 용량 */
      ogImgSize: '',
      /** 대표 이미지 목록 */
      ogImgFileList: [],
      /** 포스트 카테고리 목록 */
      categoryList: [],
      /** 수정 포스트의 카테고리 ID */
      categoryId: '',
      /** 포스트 태그 목록 */
      tagList: [],
      /** 포스트 비공개 여부 */
      secretYn: 'N',
      /** 포스트 상단고정 여부 */
      pinYn: 'N',
      /** 포스트 작성/수정 시 입력한 태그 문자열 */
      tagStr: '',
      /** 포스트 작성/수정 시 추가한 태그 목록 */
      saveTagList: [],
    }
  },
  /** 해당 컴포넌트를 벗어나 새로운 페이지로 이동할 때 호출됨 */
  async beforeRouteLeave(to, from) {
    if ('/a/goto' === to.path) return true;

    const confirm = await messageUtil.confirmWarning('이 사이트에서 나가시겠습니까?', '변경한 내용이 저장되지 않을 수 있습니다.');
    if (!confirm) return false;
  },
  created() {
    // 페이지 타이틀 세팅
    breadcrumbService.setPageTitle(this.pageTitle);

    this.init();
  },
  methods: {
    /** 초기 세팅 */
    async init() {
      await Promise.all([
        this.listCategory(),
        this.listTag(),
      ]);
    },
    /** 포스트 저장 */
    onSubmit(values) {
      this.setTagArr(values);
      
      const isValid = this.validationCheck();
      if (!isValid) return;
      
      console.log(values);

      const headers = { 'Content-Type': 'multipart/form-data' };
    },
    /** 본문 요약 버튼 클릭 시 */
    async changeOgDesc() {
      const title = this.$refs['savePostForm'].getFieldValue('title');

      if (isBlank(title)) {
        messageUtil.toastWarning('제목을 입력하세요.');
        return;
      }

      const confirm = await messageUtil.confirmSuccess('본문 요약을 제목과 맞추시겠습니까?');
      if (!confirm) return;

      this.$refs['savePostForm'].setFieldValue('ogDesc', title);
    },
    /** cloudinary 파일 클릭 시 */
    onClickFile(file) {
      this.$refs['savePostForm'].setFieldValue('ogImg', file.public_id);
      this.$refs['savePostForm'].setFieldValue('ogImgUrl', file.url);
      this.$refs['savePostForm'].setFieldValue('ogImgSize', file.bytes);
    },
    /** 포스트 대표 이미지 file input 값 변경 시 */
    onChangeOgImg(values) {
      if (isNotEmpty(values)) {
        this.ogImg = values.name;
        this.ogImgSize = values.size;
      }
    },
    /** 카테고리 목록 조회 */
    listCategory() {
      return this.$http.get('/category')
      .then(res => {
        res.data.map(d => {
          this.categoryList.push({
            value: d.id,
            text: d.nm,
          });
        });
      });
    },
    /** 태그 목록 조회 */
    listTag() {
      return this.$http.get('/tag')
      .then(res => {
        res.data.map(d => {
          this.tagList.push({
            value: d.id,
            text: d.nm,
          });
        });
      });
    },
    /** 태그 선택 시 */
    onChangeTag(value) {
      const foundTag = this.tagList.find(d => d.value == value).text;

      if (isBlank(this.tagStr)) {
        this.tagStr = foundTag;
      } else {
        this.tagStr += `, ${foundTag}`;
      }
    },
    /** 태그 배열에 추가 */
    setTagArr(formValues) {
      if (isBlank(this.tagStr)) {
        return;
      }

      this.saveTagList = [];

      const tagArr = this.tagStr.split(',');

      for (let i = 0; i < tagArr.length; i++) {
        this.saveTagList.push({
          idx: i, // 식별용 index. HTTP 요청에 넘기지 않음
          name: tagArr[i].trim(),
          addTagYn: 'Y',
        });
      }

      formValues['saveTagList'] = this.saveTagList;
    },
    /** 유효성 검사 */
    validationCheck() {
      const tagArr = this.tagStr.split(',');

      if (arrayHasDuplicateValue(tagArr)) {
        messageUtil.toastWarning('중복된 태그가 있습니다.');
        return false;
      }

      if (5 < tagArr.length) {
        messageUtil.toastWarning('태그는 5개까지 입력할 수 있습니다.');
        return false;
      }

      return true;
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/views/write.scss';
</style>