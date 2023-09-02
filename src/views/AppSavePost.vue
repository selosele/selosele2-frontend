<template>
  <app-content-wrapper>
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
                     :class="'write__btn--load'"
                     @click="listTmpPost">불러오기
          </ui-button>
    
          <ul class="write__save-list" v-if="0 < tmpPostList.length">
            <li v-for="(tmpPost,i) in tmpPostList" :key="i">
              <ui-icon-button :type="'button'"
                              :icon="'xi-close-min'"
                              :text="'삭제'"
                              :class="'write__save-list__delete'"
                              @click="removeTmpPost(tmpPost.id)">
              </ui-icon-button>

              <a href="javascript:;" class="link" @click.prevent="applyTmpPost(tmpPost)">{{ tmpPost.title }}</a>
              <span class="write__save-list__date">{{ tmpPost.regDate }}</span>
            </li>
          </ul>
        </div>

        <ui-hidden-field :name="'id'" :id="'savePostId'" :value="post?.id" />
        <ui-hidden-field :name="'crudType'" :id="'savePostCrudType'" :value="'E01001'" />
    
        <ui-write-table :name="'포스트 작성 폼'">
          <tr>
            <th scope="row">
              <label for="savePostTitle">제목</label>
            </th>
            <td>
              <div class="write__title">
                <ui-select :name="'categoryId'"
                           :id="'savePostCategory'"
                           :clazz="['write__select-category']"
                           :title="'카테고리 선택'"
                           :defaultValue="'카테고리 선택'"
                           :rules="isPostPage ? 'required' : ''"
                           :tooltip="true"
                           :disabled="isContentPage"
                           :data="categoryList"
                           v-model="categoryId">
                </ui-select>
  
                <ui-text-field :type="'text'"
                               :name="'title'"
                               :id="'savePostTitle'"
                               :rules="'required|max:200'"
                               :tooltip="true"
                               :block="true"
                               :value="title"
                               v-model="title">
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
                           :rules="'required|max:4500'"
                           :hidden="true"
                           v-model="cont">
              </ui-textarea>

              <md-editor :language="'en-US'"
                         :preview="false"
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
                             :clazz="['write__og-desc']"
                             :placeholder="'50자 이내(생략 시, 제목이 들어감)'"
                             :block="true"
                             :rules="'max:200'"
                             :value="ogDesc"
                             v-model="ogDesc">
              </ui-text-field>
            </td>
          </tr>
          <tr>
            <th scope="row">
              <label for="savePostOgImgFile">대표 이미지</label>
            </th>
            <td>
              <ui-hidden-field :name="'ogImg'" :id="'savePostOgImg'" :value="post?.ogImg" />
              <ui-hidden-field :name="'ogImgUrl'" :id="'savePostOgImgUrl'" :value="post?.ogImgUrl" />
              <ui-hidden-field :name="'ogImgSize'" :id="'savePostOgImgSize'" :value="post?.ogImgSize" />

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

              <ui-file-info :imgName="ogImg"
                            :imgSize="ogImgSize"
                            v-if="post?.ogImg"
              >
                <ui-checkbox :name="'delOgImg'"
                             :id="'savePostDelOgImg'"
                             :clazz="['ml--10']"
                             :label="'삭제'"
                             :values="'Y,N'">
                </ui-checkbox>
              </ui-file-info>
            </td>
          </tr>
          <tr v-if="isContentPage">
            <th scope="row">
              <label for="saveContentLink">콘텐츠 링크</label>
            </th>
            <td>
              <ui-text-field :type="'text'"
                             :name="'link'"
                             :id="'saveContentLink'"
                             :placeholder="'예) /page명'"
                             :rules="'required|max:50'"
                             :readonly="isUpdateContentPage"
                             :block="true"
                             v-model="contentLink">
              </ui-text-field>
            </td>
          </tr>
          <tr v-if="isUpdateContentPage">
            <th scope="row">
              <label for="saveContentUpdateMenuNameY">연결메뉴명 수정</label>
            </th>
            <td>
              <ui-radio :id="'saveContentUpdateMenuNameN'"
                        :name="'updateMenuNameYn'"
                        :label="'아니오'"
                        :rules="'required'"
                        :value="'N'"
                        v-model="updateMenuNameYn">
              </ui-radio>

              <ui-radio :id="'saveContentUpdateMenuNameY'"
                        :name="'updateMenuNameYn'"
                        :label="'예'"
                        :rules="'required'"
                        :value="'Y'"
                        v-model="updateMenuNameYn">
              </ui-radio>
            </td>
          </tr>
          <tr v-if="isPostPage">
            <th scope="row">
              <label for="savePostAddTag">태그</label>
            </th>
            <td>
              <ui-hidden-field :name="'saveTagList'" :id="'saveTagList'" />
            
              <div class="write__tag__wrapper">
                <ui-text-field :type="'text'"
                               :name="'addTag'"
                               :id="'savePostAddTag'"
                               :clazz="['write__tag']"
                               :placeholder="'태그 입력 (쉼표로 구분, 5개까지 입력 가능)'"
                               v-model="tagStr">
                </ui-text-field>

                <ui-select :name="'tag'"
                           :id="'savePostTag'"
                           :clazz="['write__select-tag']"
                           :title="'태그 선택'"
                           :defaultValue="'나의 태그'"
                           :data="tagList"
                           @onchange="onChangeTag">
                </ui-select>
              </div>
            </td>
          </tr>
          <tr v-if="isPostPage">
            <th scope="row">공개</th>
            <td>
              <ui-radio :id="'savePostSecretN'"
                        :name="'secretYn'"
                        :label="'예'"
                        :rules="'required'"
                        :value="'N'"
                        v-model="secretYn">
              </ui-radio>
          
              <ui-radio :id="'savePostSecretY'"
                        :name="'secretYn'"
                        :label="'아니오'"
                        :rules="'required'"
                        :value="'Y'"
                        v-model="secretYn">
              </ui-radio>
            </td>
          </tr>
          <tr v-if="isPostPage">
            <th scope="row">상단고정</th>
            <td>
              <ui-radio :id="'savePostPinN'"
                        :name="'pinYn'"
                        :label="'아니오'"
                        :rules="'required'"
                        :value="'N'"
                        v-model="pinYn">
              </ui-radio>

              <ui-radio :id="'savePostPinY'"
                        :name="'pinYn'"
                        :label="'예'"
                        :rules="'required'"
                        :value="'Y'"
                        v-model="pinYn">
              </ui-radio>
            </td>
          </tr>
          <tr>
            <th scope="row">임시저장</th>
            <td>
              <ui-radio :id="'savePostTmpN'"
                        :name="'tmpYn'"
                        :label="'아니오'"
                        :rules="'required'"
                        :value="'N'"
                        v-model="tmpYn">
              </ui-radio>

              <ui-radio :id="'savePostTmpY'"
                        :name="'tmpYn'"
                        :label="'예'"
                        :rules="'required'"
                        :value="'Y'"
                        v-model="tmpYn">
              </ui-radio>
            </td>
          </tr>

          <template v-slot:btn>
            <ui-button :type="'button'"
                       :color="'success'"
                       :class="'write__btn'"
                       @click="previewPost">미리보기
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
import { arrayHasDuplicateValue, getFormValues, isBlank, isNotEmpty, messageUtil } from '@/utils';
import AppSavePostTag from '@/components/views/post/AppSavePostTag.vue';
import AppPreviewPostModal from '@/components/views/post/AppPreviewPostModal.vue';

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
      /** 포스트 */
      post: null,
      /** 포스트 제목 */
      title: '',
      /** 포스트 내용 */
      cont: '',
      /** 내용 요약 */
      ogDesc: '',
      /** 대표 이미지 */
      ogImg: '',
      /** 대표 이미지 용량 */
      ogImgSize: '',
      /** 대표 이미지 목록 */
      ogImgFileList: [],
      /** 포스트 카테고리 목록 */
      categoryList: [],
      /** 포스트 카테고리 ID */
      categoryId: '',
      /** 포스트 태그 목록 */
      tagList: [],
      /** 포스트 비공개 여부 */
      secretYn: 'N',
      /** 포스트 상단고정 여부 */
      pinYn: 'N',
      /** 포스트 임시저장 여부 */
      tmpYn: 'N',
      /** 콘텐츠 연결메뉴명 수정 여부 */
      updateMenuNameYn: 'Y',
      /** 포스트 작성/수정 시 입력한 태그 문자열 */
      tagStr: '',
      /** 포스트 작성/수정 시 등록한 태그 목록 */
      saveTagList: [],
      /** 임시저장 포스트 목록 */
      tmpPostList: [],
      /** 콘텐츠 링크 */
      contentLink: '',
    }
  },
  /** 해당 컴포넌트를 벗어나 새로운 페이지로 이동할 때 호출됨 */
  async beforeRouteLeave(to, from) {
    if ('/a/goto' === to.path || '/' === to.path) return true;

    const confirm = await messageUtil.confirmWarning('이 사이트에서 나가시겠습니까?', '변경한 내용이 저장되지 않을 수 있습니다.');
    if (!confirm) return false;
  },
  created() {
    // 페이지 타이틀 세팅
    this.$store.dispatch('Breadcrumb/FETCH_PAGE_TITLE', this.getPageTitle());

    this.init();
  },
  computed: {
    /** 포스트 페이지일경우 */
    isPostPage: {
      get() {
        return 'D01002' === this.$route.meta.pageType;
      },
      set(v) {}
    },
    /** 콘텐츠 페이지일경우 */
    isContentPage: {
      get() {
        return 'D01003' === this.$route.meta.pageType;
      },
      set(v) {}
    },
    /** 포스트 수정 페이지일경우 */
    isUpdatePostPage: {
      get() {
        return 'D01002' === this.$route.meta.pageType && isNotEmpty(this.$route.params.id);
      },
      set(v) {}
    },
    /** 콘텐츠 수정 페이지일경우 */
    isUpdateContentPage: {
      get() {
        return 'D01003' === this.$route.meta.pageType && isNotEmpty(this.$route.params.id);
      },
      set(v) {}
    }
  },
  methods: {
    /** 초기 세팅 */
    async init() {
      // 포스트 수정 페이지일 경우, 포스트 조회 메서드를 실행하기 위함
      if (this.isUpdatePostPage) {
        await Promise.all([
          this.listCategory(),
          this.listTag(),
          this.getPost(this.$route.params.id),
        ]);
      }
      // 콘텐츠 수정 페이지일 경우, 콘텐츠 조회 메서드를 실행하기 위함
      else if (this.isUpdateContentPage) {
        await this.getPost(this.$route.params.id);
      }
      else {
        await Promise.all([
          this.listCategory(),
          this.listTag(),
        ]);
      }
    },
    /** 페이지 타이틀 반환 */
    getPageTitle() {
      if (this.isPostPage) {
        return !this.isUpdatePostPage ? '포스트 작성' : '포스트 수정';
      } else if (this.isContentPage) {
        return !this.isUpdateContentPage ? '콘텐츠 작성' : '콘텐츠 수정';
      }
    },
    /** 포스트 저장 */
    async onSubmit(values) {
      const msg = ['저장하시겠습니까?', '저장되었습니다'];

      // 임시저장 메시지 가공
      if ('Y' === values.tmpYn) {
        msg[0] = '임시' + msg[0];
        msg[1] = '임시' + msg[1];
      }

      const isValid = this.validationCheck();
      if (!isValid) return;

      const confirm = await messageUtil.confirmSuccess(msg[0]);
      if (!confirm) return;

      // 태그 배열에 추가
      this.setTagArr(values);
      
      const headers = { 'Content-Type': 'multipart/form-data' };

      // 포스트 수정
      if (this.isUpdatePostPage) {
        values.crudType = 'E01003';
        await this.$http.put('/post', values, { headers });
      }
      // 콘텐츠 수정
      else if (this.isUpdateContentPage) {
        values.crudType = 'E01003';
        await this.$http.put('/content', values, { headers });
      }
      // 포스트 등록
      else if (this.isPostPage) {
        await this.$http.post('/post', values, { headers });
      }
      // 콘텐츠 등록
      else if (this.isContentPage) {
        await this.$http.post('/content', values, { headers });
      }

      messageUtil.toastSuccess(msg[1]);

      this.$store.dispatch('Post/FETCH_MAIN_POSTLIST', {});
      this.$store.dispatch('Layout/FETCH_SIDEBAR', {});

      // 임시저장이 아닌 경우에만 페이지를 이동함
      if ('N' === values.tmpYn) {
        this.$store.dispatch('Menu/LIST_MENU', {
          params: {
            useYn: 'Y',
          },
        });
        
        this.$router.push('/');
      }
    },
    /** 포스트 조회 */
    getPost(id) {
      let url = this.isUpdatePostPage ? `/post/${id}` : `/content/${id}`;

      return this.$http.get(url)
      .then(res => {
        this.post = { ...res.data };
        this.setData(this.post);
      });
    },
    /** 포스트 데이타 세팅 */
    setData(post) {
      this.$refs['savePostForm']?.setFieldValue('id', post.id);
      this.$refs['savePostForm']?.setFieldValue('ogImg', post.ogImg);
      this.$refs['savePostForm']?.setFieldValue('ogImgUrl', post.ogImgUrl);
      this.$refs['savePostForm']?.setFieldValue('ogImgSize', post.ogImgSize);

      this.title = post.title;
      this.cont = post.rawText;
      this.tmpYn = post.tmpYn;
      this.ogDesc = post.ogDesc;
      this.ogImg = post.ogImg;
      this.ogImgSize = post.ogImgSize;
      
      if (this.isUpdatePostPage) {
        this.pinYn = post.pinYn;
        this.secretYn = post.secretYn;
        this.categoryId = post.postCategory[0].categoryId;
        this.tagStr = post.postTag.map(d => d.tag.nm).join(', ');
      } else if (this.isUpdateContentPage) {
        this.contentLink = post?.link;
      }
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
      this.$refs['savePostForm'].setFieldValue('ogImg', file.public_id + '.' + file.format);
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
        const foundTag = this.tagList.find(d => d.text === tagArr[i].trim());

        this.saveTagList.push({
          // DB에서 조회해온 태그와 일치하는 태그가 있을 경우에만 id 키값을 넣는다. 키값이 있으면 UPDATE, 없으면 INSERT를 하기 위함
          ...(isNotEmpty(foundTag) && { id: foundTag.value }),
          nm: tagArr[i].trim(),
        });
      }

      formValues['saveTagList'] = JSON.stringify(this.saveTagList);
    },
    /** 포스트 미리보기 */
    previewPost() {
      const body = getFormValues(this.$refs['savePostForm'].$el);
      let url = this.isPostPage ? '/post/preview' : '/content/preview';

      return this.$http.post(url, body)
      .then(res => {
        this.$modal.show({
          component: AppPreviewPostModal,
          bind: {
            post: res.data,
          },
        });
      });
    },
    /** 임시저장 포스트 목록 조회 */
    listTmpPost() {
      if (0 < this.tmpPostList.length) {
        this.tmpPostList = [];
        return;
      }

      const listPostDto = { tmpYn: 'Y' };
      let url = this.isPostPage ? '/post' : '/content';

      return this.$http.get(url, { params: listPostDto })
      .then(res => {
        if (0 === res.data[0].length) {
          messageUtil.toastWarning('임시저장된 포스트가 없습니다.');
          return;
        }

        res.data[0].map(d => {
          d.regDate = this.$moment(d.regDate).format('YYYY-MM-DD HH:mm:ss');
        });

        this.tmpPostList = [...res.data[0]];
      });
    },
    /** 임시저장 포스트 적용 */
    async applyTmpPost(tmpPost) {
      const confirm = await messageUtil.confirmSuccess('적용하시겠습니까?');
      if (!confirm) return;

      this.post = { ...tmpPost };
      this.setData(this.post);
    },
    /** 임시저장 포스트 삭제 */
    async removeTmpPost(postId) {
      const confirm = await messageUtil.confirmSuccess('삭제하시겠습니까?');
      if (!confirm) return;

      return this.$http.delete(`/post/${postId}`)
      .then(res => {
        messageUtil.toastSuccess('삭제되었습니다.');
        this.tmpPostList = this.tmpPostList.filter(d => d.id !== postId);
      });
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

      if (this.isContentPage) {
        const link = this.$refs['savePostForm'].getFieldValue('link');
        
        if (0 !== link.indexOf('/')) {
          messageUtil.toastWarning('링크는 "/"로 시작해야 합니다.');
          return false;
        }
      }

      return true;
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/views/write.scss';
</style>