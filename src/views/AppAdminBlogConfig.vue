<template>
  <app-content-wrapper>
    <div class="blog-config__wrapper">
      <div class="blog-config__save-wrapper">
        <ui-button
          :color="'primary'"
          :class="'blog-config__btn--load'"
          :text="'불러오기'"
          @click="listBlogConfig"
        />
        
        <div class="blog-config__save-list" v-if="0 < blogConfigList.length">
          <ui-form :name="'addBlogConfigForm'" @onsubmit="addBlogConfig">
            <div class="blog-config__save-list__inputs">
              <ui-text-field
                :name="'nm'"
                :placeholder="'추가할 환경설정명 입력'"
                :clazz="['blog-config__save-list__nm']"
                :rules="'required|max:30'"
              />
    
              <ui-icon-button
                :type="'submit'"
                :icon="'xi-plus-min'"
                :text="'환경설정 추가'"
                :class="'blog-config__save-list__add'"
              />
            </div>
          </ui-form>

          <ul>
            <li v-for="(blogConfig,i) in blogConfigList" :key="i">
              <ui-icon-button
                v-if="'N' === blogConfig.useYn"
                :icon="'xi-close-min'"
                :text="'삭제'"
                :class="'blog-config__save-list__delete'"
                @click="removeBlogConfig(blogConfig.id)"
              />
              
              <ui-icon-button
                v-if="'N' === blogConfig.useYn"
                :icon="'xi-check-min'"
                :text="'환경설정 사용'"
                :class="'blog-config__save-list__use'"
                @click="updateBlogConfigUseYn(blogConfig.id, blogConfig.nm, 'Y')"
              />
    
              <a href="javascript:;"
                 :class="{ 'link': true, 'font--bold': 'Y' === blogConfig.useYn }"
                 @click.prevent="applyBlogConfig(blogConfig)">
                {{ blogConfig.nm }}
              </a>
    
              <span class="blog-config__save-list__date">
                {{ blogConfig.regDate }}
              </span>
            </li>
          </ul>
        </div>
      </div>
  
      <ui-form
        :name="'blogConfigForm'"
        :ref="'blogConfigForm'"
        :class="'blog-config__frm'"
        @onsubmit="onSubmit"
      >

      <ui-hidden-field :name="'id'" :id="'blogConfigId'" :value="$store.state.BlogConfig.data?.id" v-model="previewBlogConfig.id" />
      <ui-hidden-field :name="'useYn'" :id="'blogConfigUseYn'" :value="$store.state.BlogConfig.data?.useYn" v-model="previewBlogConfig.useYn" />
  
        <ui-write-table
          :name="'블로그 환경설정 작성 폼'"
          :colWidth="['20%', '80%']"
        >
          <tr>
            <th scope="row">
              <label for="blogConfigNm">환경설정 명<br>(30자 이내)
                <sup>*
                  <span class="sr-only">필수입력란</span>
                </sup>
              </label>
            </th>
            <td>
              <ui-text-field
                :name="'nm'"
                :id="'blogConfigNm'"
                :block="true"
                :rules="'required|max:30'"
                :value="$store.state.BlogConfig.data?.nm"
                v-model="previewBlogConfig.nm"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">
              <label for="blogConfigTitle">블로그 제목<br>(100자 이내)
                <sup>*
                  <span class="sr-only">필수입력란</span>
                </sup>
              </label>
            </th>
            <td>
              <ui-text-field
                :name="'title'"
                :id="'blogConfigTitle'"
                :block="true"
                :rules="'required|max:100'"
                :value="$store.state.BlogConfig.data?.title"
                v-model="previewBlogConfig.title"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">
              <label for="blogConfigAuthor">닉네임(30자 이내)
                <sup>*
                  <span class="sr-only">필수입력란</span>
                </sup>
              </label>
            </th>
            <td>
              <ui-text-field
                :name="'author'"
                :id="'blogConfigAuthor'"
                :block="true"
                :rules="'required|max:30'"
                :value="$store.state.BlogConfig.data?.author"
                v-model="previewBlogConfig.author"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">
              <label for="blogConfigDesc">블로그 소개(100자 이내)</label>
            </th>
            <td>
              <ui-textarea
                :name="'desc'"
                :id="'blogConfigDesc'"
                :cols="'30'"
                :rows="'10'"
                :resize="'vertical'"
                :rules="'required|max:100'"
                :value="$store.state.BlogConfig.data?.desc"
                v-model="previewBlogConfig.desc"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">
              <label for="blogConfigAvatarImgFile">아바타 이미지</label>
            </th>
            <td>
              <ui-hidden-field
                :name="'avatarImg'"
                :id="'blogConfigAvatarImg'"
                :value="$store.state.BlogConfig.data?.avatarImg"
                v-model="previewBlogConfig.avatarImg"
              />
  
              <ui-hidden-field
                :name="'avatarImgUrl'"
                :id="'blogConfigAvatarImgUrl'"
                :value="$store.state.BlogConfig.data?.avatarImgUrl"
                v-model="previewBlogConfig.avatarImgUrl"
              />
  
              <ui-hidden-field
                :name="'avatarImgSize'"
                :id="'blogConfigAvatarImgSize'"
                :value="$store.state.BlogConfig.data?.avatarImgSize"
                v-model="previewBlogConfig.avatarImgSize"
              />
  
              <ui-file-field
                :name="'avatarImgFile'"
                :id="'blogConfigAvatarImgFile'"
                :accept="'image/*'"
                :gap="10"
                @onchange="onChangeAvatarImg">
  
                <ui-file-button
                  :color="'secondary'"
                  :text="'Cloudinary'"
                  :listKey="'avatar'"
                  @listFile="onListFile"
                  @clickFile="onClickFile"
                />
              </ui-file-field>
  
              <ui-file-info
                :imgName="avatarImg"
                :imgSize="avatarImgSize"
                v-if="$store.state.BlogConfig.data?.avatarImg"
              >
                <ui-checkbox
                  :name="'delAvatarImg'"
                  :id="'blogConfigDelAvatarImg'"
                  :label="'삭제'"
                  :values="'Y,N'"
                />
              </ui-file-info>
            </td>
          </tr>
          <tr>
            <th scope="row">
              <label for="blogConfigOgImgFile">대표 이미지</label>
            </th>
            <td>
              <ui-hidden-field
                :name="'ogImg'"
                :id="'blogConfigOgImg'"
                :value="$store.state.BlogConfig.data?.ogImg"
                v-model="previewBlogConfig.ogImg"
              />
  
              <ui-hidden-field
                :name="'ogImgUrl'"
                :id="'blogConfigOgImgUrl'"
                :value="$store.state.BlogConfig.data?.ogImgUrl"
                v-model="previewBlogConfig.ogImgUrl"
              />
  
              <ui-hidden-field
                :name="'ogImgSize'"
                :id="'blogConfigOgImgSize'"
                :value="$store.state.BlogConfig.data?.ogImgSize"
                v-model="previewBlogConfig.ogImgSize"
              />
  
              <ui-file-field
                :name="'ogImgFile'"
                :id="'blogConfigOgImgFile'"
                :accept="'image/*'"
                :gap="10"
                @onchange="onChangeOgImg">
  
                <ui-file-button
                  :color="'secondary'"
                  :text="'Cloudinary'"
                  :listKey="'og'"
                  @listFile="onListFile"
                  @clickFile="onClickFile"
                />
              </ui-file-field>
  
              <ui-file-info
                :imgName="ogImg"
                :imgSize="ogImgSize"
                v-if="$store.state.BlogConfig.data?.ogImg"
              >
                <ui-checkbox
                  :name="'delOgImg'"
                  :id="'blogConfigDelOgImg'"
                  :label="'삭제'"
                  :values="'Y,N'"
                />
              </ui-file-info>
            </td>
          </tr>
          <tr>
            <th scope="row">
              <label for="blogConfigOgImgContrast">대표 이미지 밝기</label>
            </th>
            <td>
              <ui-numeric-field
                :name="'ogImgContrast'"
                :id="'blogConfigOgImgContrast'"
                :step="'0.01'"
                :min="'0'"
                :max="'1.1'"
                :rules="'between:0,1.1'"
                :text="'0.1 ~ 1 이하 (초기화 0)'"
                :value="$store.state.BlogConfig.data?.ogImgContrast"
                v-model="previewBlogConfig.ogImgContrast"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">
              <label for="blogConfigOgImgBlur">대표 이미지 흐림</label>
            </th>
            <td>
              <ui-numeric-field
                :name="'ogImgBlur'"
                :id="'blogConfigOgImgBlur'"
                :step="'0.01'"
                :min="'0'"
                :max="'9.9'"
                :rules="'between:0,9.9'"
                :text="'0.1 ~ 10 미만 (초기화 0)'"
                :value="$store.state.BlogConfig.data?.ogImgBlur"
                v-model="previewBlogConfig.ogImgBlur"
              />
            </td>
          </tr>
          <tr class="blog-config__og-image-wrapper blog-config__og-image-wrapper--active">
            <th scope="row">대표 이미지 위치값</th>
            <td>
              <ui-numeric-field
                :name="'ogImgPosX'"
                :id="'blogConfigOgImgPosX'"
                :min="'0'"
                :max="'100'"
                :rules="'between:0,100'"
                :text="'가로 0 ~ 100 (기본 50)'"
                :title="'대표 이미지 가로 위치값'"
                :value="$store.state.BlogConfig.data?.ogImgPosX"
                v-model="previewBlogConfig.ogImgPosX"
              />
  
              <ui-numeric-field
                :name="'ogImgPosY'"
                :id="'blogConfigOgImgPosY'"
                :min="'0'"
                :max="'100'"
                :rules="'between:0,100'"
                :text="'세로 0 ~ 100 (기본 50)'"
                :title="'대표 이미지 세로 위치값'"
                :value="$store.state.BlogConfig.data?.ogImgPosY"
                v-model="previewBlogConfig.ogImgPosY"
              />
  
              <ui-radio
                :id="'blogConfigOgImgCoverY'"
                :name="'ogImgCoverYn'"
                :label="'이미지 채우기'"
                :rules="'required'"
                :value="'Y'"
                v-model="previewBlogConfig.ogImgCoverYn"
              />
  
              <ui-radio
                :id="'blogConfigOgImgCoverN'"
                :name="'ogImgCoverYn'"
                :label="'이미지 비율 유지'"
                :rules="'required'"
                :value="'N'"
                v-model="previewBlogConfig.ogImgCoverYn"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">
              <label for="blogConfigPageSize">메인 포스트 출력 개수</label>
            </th>
            <td>
              <ui-numeric-field
                :name="'pageSize'"
                :id="'blogConfigPageSize'"
                :min="'2'"
                :max="'10'"
                :rules="'between:2,10'"
                :text="'2 ~ 10 (기본 6)'"
                :value="$store.state.BlogConfig.data?.pageSize"
                v-model="previewBlogConfig.pageSize"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">
              <label for="blogConfigShowSatisYn">페이지 만족도조사 표출</label>
            </th>
            <td>
              <ui-checkbox
                :name="'showSatisYn'"
                :id="'blogConfigShowSatisYn'"
                :label="'페이지 만족도조사 표출'"
                :hideLabel="true"
                :values="'Y,N'"
                v-model="previewBlogConfig.showSatisYn"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">
              <label for="blogConfigKakaoMsgYn">카카오톡 메시지 수신</label>
            </th>
            <td>
              <ui-checkbox
                :name="'kakaoMsgYn'"
                :id="'blogConfigKakaoMsgYn'"
                :label="'카카오톡 메시지 수신'"
                :hideLabel="true"
                :values="'Y,N'"
                v-model="previewBlogConfig.kakaoMsgYn"
              />
            </td>
          </tr>
  
          <template v-slot:btn>
            <ui-button
              :type="'reset'"
              :color="'secondary'"
              :text="'다시작성'"
            />
  
            <ui-button
              :type="'submit'"
              :color="'primary'"
              :text="'저장'"
            />
          </template>
        </ui-write-table>
      </ui-form>
    </div>
  </app-content-wrapper>
</template>

<script>
import moment from 'moment';
import { messageUtil, isNotEmpty, isEmpty, deepCopy } from '@/utils';

export default {
  name: 'AppAdminBlogConfig',
  data() {
    return {
      pageTitle: '블로그 환경설정',
      avatarImg: '',
      avatarImgUrl: '',
      avatarImgSize: '',
      ogImg: '',
      ogImgUrl: '',
      ogImgSize: '',
      avatarFileList: [],
      ogFileList: [],
      previewBlogConfig: {},
      blogConfigList: [],
    }
  },
  /** 해당 컴포넌트를 벗어나 새로운 페이지로 이동할 때 호출됨 */
  async beforeRouteLeave(to, from, next) {
    if (isNotEmpty(this.$store.state.BlogConfig?.previewData)) {

      // 환경설정 미리보기 데이터 초기화
      this.$store.dispatch('BlogConfig/FETCH_PREVIEW_DATA', null);
      await this.$store.dispatch('BlogConfig/GET_BLOG_CONFIG');
    }
    next();
  },
  created() {
    // 2023.08.20. 성능 이슈로 인해 환경설정 페이지에서만 데이터를 한 번 더 불러오도록 수정
    this.$store.dispatch('BlogConfig/GET_BLOG_CONFIG')
    .then(data => {
      this.avatarImg = data?.avatarImg;
      this.avatarImgSize = data?.avatarImgSize;
      this.ogImg = data?.ogImg;
      this.ogImgSize = data?.ogImgSize;

      this.$store.dispatch('BlogConfig/FETCH_PREVIEW_DATA', null);
  
      if (isEmpty(this.$store.state.BlogConfig?.previewData)) {
        this.previewBlogConfig = Object.assign({}, data);
      } else {
        this.previewBlogConfig = Object.assign({}, this.$store.state.BlogConfig?.previewData);
      }

      // 페이지 타이틀 세팅
      this.$store.dispatch('Breadcrumb/FETCH_PAGE_TITLE', this.pageTitle);
    });
  },
  watch: {
    /** 환경설정 미리보기 데이터 */
    previewBlogConfig: {
      handler: function(val, oldVal) {
        this.$store.dispatch('BlogConfig/FETCH_BLOG_CONFIG', val);
        this.$store.dispatch('BlogConfig/FETCH_PREVIEW_DATA', val);
      },
      deep: true,
    },
  },
  methods: {
    /** 환경설정 저장 */
    async onSubmit(values) {
      const confirm = await messageUtil.confirmSuccess('저장하시겠습니까?');
      if (!confirm) return;

      const headers = { 'Content-Type': 'multipart/form-data' };

      this.$http.put('/blogconfig', values, { headers })
      .then(resp => {
        messageUtil.toastSuccess('저장되었습니다.');

        // 사용 중인 환경설정만 상태를 업데이트한다.
        if ('Y' === this.previewBlogConfig.useYn) {
          this.$store.dispatch('BlogConfig/FETCH_BLOG_CONFIG', resp.data);
          this.$store.dispatch('BlogConfig/FETCH_PREVIEW_DATA', null);
          this.$store.dispatch('Breadcrumb/FETCH_PAGE_TITLE', this.pageTitle);
        }

        this.listBlogConfig();
      });
    },
    /** 환경설정 불러오기 */
    listBlogConfig() {
      if (0 < this.blogConfigList.length) {
        this.blogConfigList = [];
        return;
      }

      return this.$http.get('/blogconfig')
      .then(resp => {
        resp.data[0].forEach(d => {
          d.regDate = moment(d.regDate).format('YYYY-MM-DD HH:mm:ss');
        });

        this.blogConfigList = [...resp.data[0]];
      });
    },
    /** 환경설정 적용 */
    applyBlogConfig(blogConfig) {
      this.previewBlogConfig = deepCopy(blogConfig);
      this.$store.dispatch('BlogConfig/FETCH_PREVIEW_DATA', null);
    },
    /** 환경설정 추가 */
    async addBlogConfig(values) {
      const confirm = await messageUtil.confirmSuccess(`"${values.nm}" 환경설정을 추가하시겠습니까?"`);
      if (!confirm) return;

      const addValues = Object.assign(deepCopy(this.$store.state.BlogConfig.data), deepCopy(values));
      delete addValues.id; // 환경설정 추가를 위해 id 삭제
      addValues.useYn = 'N';

      return this.$http.post('/blogconfig', addValues)
      .then(resp => {
        messageUtil.toastSuccess('추가되었습니다.');
        this.listBlogConfig();
      });
    },
    /** 환경설정 삭제 */
    async removeBlogConfig(id) {
      if (1 === this.blogConfigList.length) {
        messageUtil.toastWarning('최소 1개 설정이 필요합니다.');
        return;
      }

      const confirm = await messageUtil.confirmSuccess('삭제하시겠습니까?');
      if (!confirm) return;

      return this.$http.delete(`/blogconfig/${id}`)
      .then(resp => {
        messageUtil.toastSuccess('삭제되었습니다.');
        this.blogConfigList = this.blogConfigList.filter(d => d.id !== id);
      });
    },
    /** 환경설정 사용여부 수정 */
    async updateBlogConfigUseYn(id, nm, useYn) {
      const confirm = await messageUtil.confirmSuccess(`"${nm}" 환경설정을 "사용"으로 변경하시겠습니까?`);
      if (!confirm) return;
      
      return this.$http.put('/blogconfig/use', { id, useYn })
      .then(resp => {
        messageUtil.toastSuccess('변경되었습니다.');

        this.previewBlogConfig = { ...resp.data };
        this.$store.dispatch('BlogConfig/FETCH_BLOG_CONFIG', resp.data);
        this.$store.dispatch('BlogConfig/FETCH_PREVIEW_DATA', null);
        this.$store.dispatch('Breadcrumb/FETCH_PAGE_TITLE', this.pageTitle);

        this.listBlogConfig();
      });
    },
    /** 아바타 이미지 file input 값 변경 시 */
    onChangeAvatarImg(values) {
      if (isNotEmpty(values)) {
        this.avatarImg = values.name;
        this.avatarImgSize = values.size;
      }
    },
    /** 대표 이미지 file input 값 변경 시 */
    onChangeOgImg(values) {
      if (isNotEmpty(values)) {
        this.ogImg = values.name;
        this.ogImgSize = values.size;
      }
    },
    /** Cloudinary 파일 클릭 시 */
    onClickFile(file, key) {
      if ('avatar' === key) {
        this.$refs['blogConfigForm'].setFieldValue('avatarImg', file.public_id + '.' + file.format);
        this.$refs['blogConfigForm'].setFieldValue('avatarImgUrl', file.secure_url);
        this.$refs['blogConfigForm'].setFieldValue('avatarImgSize', file.bytes);
      } else if ('og' === key) {
        this.$refs['blogConfigForm'].setFieldValue('ogImg', file.public_id + '.' + file.format);
        this.$refs['blogConfigForm'].setFieldValue('ogImgUrl', file.secure_url);
        this.$refs['blogConfigForm'].setFieldValue('ogImgSize', file.bytes);
      }
    },
    /** Cloudinary 파일 목록 조회 시 */
    onListFile(files, key) {
      if ('avatar' === key) {
        this.ogFileList = [];
        this.avatarFileList = files;
      } else if ('og' === key) {
        this.avatarFileList = [];
        this.ogFileList = files;
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/views/blog-config.scss';
</style>