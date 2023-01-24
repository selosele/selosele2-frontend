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
              <ui-text-field :type="'text'"
                             :name="'title'"
                             :id="'savePostTitle'"
                             :class="'write__title'"
                             :rules="'required'"
                             :block="true">
              </ui-text-field>
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
          <tr v-if="'post' === $route.meta.type">
            <th scope="row">
              <label for="savePostCategory">카테고리</label>
            </th>
            <td>
              <ui-select :name="'category'"
                         :id="'savePostCategory'"
                         :class="'write__select-category'"
                         :rules="'required'"
                         :defaultValue="'카테고리 선택'"
                         :data="categoryList"
                         v-model="categoryId">
              </ui-select>
            
              <span class="write__category__item">
                <ui-text-field :type="'text'"
                               :name="'addCategory'"
                               :id="'savePostAddCategory'"
                               :title="'사용할 카테고리 입력 (50자 이내)'"
                               :placeholder="'사용할 카테고리 입력 (50자 이내)'"
                               :class="'write__category'"
                               :rules="'max:50'"
                               @onenter="addCategory">
                </ui-text-field>
            
                <ui-icon-button :type="'button'"
                                :icon="'xi-check'"
                                :text="'카테고리 추가'"
                                :class="'write__add-category-btn'"
                                @click="addCategory">
                </ui-icon-button>
              </span>
            </td>
          </tr>
          <tr v-if="'post' === $route.meta.type">
            <th scope="row">태그</th>
            <td>
              <ui-hidden-field :name="'tagList'" :id="'tagList'"></ui-hidden-field>

              <div class="write__tag__wrapper">
                <ui-text-field :type="'text'"
                               :name="'addTag'"
                               :id="'savePostAddTag'"
                               :title="'태그 입력 (쉼표로 구분)'"
                               :placeholder="'태그 입력 (쉼표로 구분)'"
                               :block="true"
                               v-model="tagStr"
                               @onchange="addTag">
                </ui-text-field>
              </div>
            </td>
          </tr>
          <tr v-if="'post' === $route.meta.type">
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
          <tr v-if="'post' === $route.meta.type">
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
import { isBlank, isNotEmpty, messageUtil } from '@/utils';
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
      ]);
    },
    /** 포스트 저장 */
    onSubmit(values) {
      const headers = { 'Content-Type': 'multipart/form-data' };

      console.log(values);
    },
    /** 본문 요약 버튼 클릭 시 */
    async changeOgDesc() {
      const runValidate = await this.$refs['savePostForm'].validateField('title');
      if (!runValidate.valid) return;

      const confirm = await messageUtil.confirmSuccess('본문 요약을 제목과 맞추시겠습니까?');
      if (!confirm) return;

      const title = this.$refs['savePostForm'].getFieldValue('title');
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
    /** 카테고리 추가 */
    async addCategory() {
      const isValid = await this.addTagValidationCheck();
      if (!isValid) return;

      const category = this.$refs['savePostForm'].getFieldValue('addCategory');
      const categoryValue = (+this.categoryList[this.categoryList.length-1].value) + 1;

      this.categoryList.push({
        value: categoryValue,
        text: category,
      });

      this.categoryId = categoryValue;
    },
    /** 카테고리 추가 유효성 검사 */
    async addTagValidationCheck() {
      const runValidate = await this.$refs['savePostForm'].validateField('addCategory');
      if (!runValidate.valid) {
        return false;
      }

      const category = this.$refs['savePostForm'].getFieldValue('addCategory');
      if (isBlank(category)) {
        return false;
      }

      return true;
    },
    /** 태그 추가 */
    addTag() {
      this.saveTagList = [];

      const tagArr = this.tagStr.split(',');

      for (let i = 0; i < tagArr.length; i++) {
        this.saveTagList.push({
          id: i+1, // 식별용 ID. HTTP 요청에 넘기지 않음
          name: tagArr[i],
          addTagYn: 'Y',
        });
      }

      this.$refs['savePostForm'].setFieldValue('tagList', this.saveTagList);
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/views/write.scss';
</style>