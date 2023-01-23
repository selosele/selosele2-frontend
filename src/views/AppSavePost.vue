<template>
  <app-content-wrapper :pageTitle="pageTitle">
    <div class="write__wrapper">
      <ui-form :name="'savePostForm'" :class="'write__frm'" @onsubmit="onSubmit">
        <div class="write__save-wrapper">
          <ui-button :type="'button'"
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
              <div class="write__cont">
                <ui-textarea :name="'cont'"
                             :id="'savePostCont'"
                             :cols="'80'"
                             :rows="'18'"
                             :rules="'required'"
                             :block="true">
                </ui-textarea>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">
              <label for="savePostOgDesc">본문 요약</label>

              <ui-icon-button :type="'button'"
                              :icon="'xi-refresh'"
                              :text="'본문 요약 갱신'"
                              :class="'write__og-desc-refresh'">
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
              <ui-hidden-field :name="'ogImgSize'"
                               :id="'savePostOgImgSize'"
                               :value="post?.avatarImgSize">
              </ui-hidden-field>

              <ui-file-field :name="'ogImgFile'"
                             :id="'savePostOgImgFile'"
                             :accept="'image/*'"
                             :gap="10"
                             @onchange="onChangeOgImg">
                
                <ui-button :type="'button'"
                           :color="'secondary'"
                           @click="listFile">Cloudinary
                </ui-button>

                <ui-file-list :value="ogImgFileList"
                              @clickFile="onClickFile"
                              v-if="0 < ogImgFileList.length">
                </ui-file-list>
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
          <tr>
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
                               :class="'write__category'">
                </ui-text-field>
            
                <ui-icon-button :type="'button'"
                                :icon="'xi-check'"
                                :text="'카테고리 추가'"
                                :class="'write__add-category-btn'">
                </ui-icon-button>
              </span>
            </td>
          </tr>
          <tr>
            <th scope="row">태그</th>
            <td>
              <ui-icon-button :type="'button'"
                              :icon="'xi-plus'"
                              :text="'태그 추가'"
                              :class="'write__add-tag-btn'">
              </ui-icon-button>
            </td>
          </tr>
          <tr>
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
          <tr>
            <th scope="row">상단고정</th>
            <td>
              <ui-radio :id="'savePostSecretN'"
                        :name="'pinYn'"
                        :label="'비고정'"
                        :rules="'required'"
                        :value="'N'"
                        v-model="secretYn">
              </ui-radio>

              <ui-radio :id="'savePostSecretY'"
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
                       :class="'write__btn write__btn--preview'">미리보기
            </ui-button>
            <ui-button :type="'button'"
                       :color="'warning'"
                       :class="'write__btn write__btn--save'">임시저장
            </ui-button>
            <ui-button :type="'reset'"
                       :color="'secondary'"
                       :class="'write__btn write__btn--reset'">다시작성
            </ui-button>
            <ui-button :type="'submit'"
                       :color="'primary'"
                       :class="'write__btn write__btn--submit'">저장
            </ui-button>
          </template>
        </ui-write-table>
      </ui-form>
    </div>
  </app-content-wrapper>
</template>

<script>
import { breadcrumbService } from '@/services/breadcrumb/breadcrumbService';

export default {
  name: 'app-add-post',
  data() {
    return {
      /** 페이지 타이틀 */
      pageTitle: '포스트 작성',
      /** 수정 포스트 */
      post: null,
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
    }
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
    // 포스트 저장
    onSubmit(values) {
      console.log(values);
    },
    /** cloudinary 파일 클릭 시 */
    onClickFile(file) {

    },
    /** 포스트 대표 이미지 file input 값 변경 시 */
    onChangeOgImg() {

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
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/views/write.scss';
</style>