<template>
  <app-content-wrapper :pageTitle="pageTitle">
    <ui-form :name="'blogConfigForm'"
             :ref="'blogConfigForm'"
             :class="'blog-config__frm'"
             @onsubmit="onSubmit"
      >
      <ui-hidden-field :name="'id'" :id="'blogConfigId'" :value="$store.state.BlogConfig.data?.id" />

      <ui-write-table :name="'블로그 환경설정 작성 폼'"
                      :colWidth="['20%', '80%']"
      >
        <tr>
          <th scope="row">
            <label for="blogConfigTitle">블로그 제목<br>(100자 이내)
              <sup>*
                <span class="sr-only">필수입력란</span>
              </sup>
            </label>
          </th>
          <td>
            <ui-text-field :type="'text'"
                           :name="'title'"
                           :id="'blogConfigTitle'"
                           :clazz="['blog-config__title']"
                           :block="true"
                           :rules="'required|max:100'"
                           :value="$store.state.BlogConfig.data?.title"
                           v-model="previewBlogConfig.title">
            </ui-text-field>
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
            <ui-text-field :type="'text'"
                           :name="'author'"
                           :id="'blogConfigAuthor'"
                           :clazz="['blog-config__author']"
                           :block="true"
                           :rules="'required|max:30'"
                           :value="$store.state.BlogConfig.data?.author"
                           v-model="previewBlogConfig.author">
            </ui-text-field>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <label for="blogConfigDesc">블로그 소개(100자 이내)</label>
          </th>
          <td>
            <ui-textarea :name="'desc'"
                         :id="'blogConfigDesc'"
                         :cols="'30'"
                         :rows="'10'"
                         :resize="'vertical'"
                         :rules="'required|max:100'"
                         :value="$store.state.BlogConfig.data?.desc"
                         v-model="previewBlogConfig.desc">
            </ui-textarea>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <label for="blogConfigAvatarImgFile">아바타 이미지</label>
          </th>
          <td>
            <ui-hidden-field :name="'avatarImg'" :id="'blogConfigAvatarImg'" :value="$store.state.BlogConfig.data?.avatarImg" />
            <ui-hidden-field :name="'avatarImgUrl'"
                             :id="'blogConfigAvatarImgUrl'"
                             :value="$store.state.BlogConfig.data?.avatarImgUrl"
                             v-model="previewBlogConfig.avatarImgUrl"
            />
            <ui-hidden-field :name="'avatarImgSize'"
                             :id="'blogConfigAvatarImgSize'"
                             :value="$store.state.BlogConfig.data?.avatarImgSize"
            />

            <ui-file-field :name="'avatarImgFile'"
                           :id="'blogConfigAvatarImgFile'"
                           :accept="'image/*'"
                           :gap="10"
                           @onchange="onChangeAvatarImg">

              <ui-file-button :type="'button'"
                              :color="'secondary'"
                              :listKey="'avatar'"
                              @listFile="onListFile"
                              @clickFile="onClickFile">Cloudinary
              </ui-file-button>
            </ui-file-field>

            <ui-file-info :imgName="avatarImg"
                          :imgSize="avatarImgSize"
                          v-if="$store.state.BlogConfig.data?.avatarImg"
            >
              <ui-checkbox :name="'delAvatarImg'"
                           :id="'blogConfigDelAvatarImg'"
                           :label="'삭제'"
                           :values="'Y,N'">
              </ui-checkbox>
            </ui-file-info>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <label for="blogConfigOgImgFile">대표 이미지</label>
          </th>
          <td>
            <ui-hidden-field :name="'ogImg'" :id="'blogConfigOgImg'" :value="$store.state.BlogConfig.data?.ogImg" />
            <ui-hidden-field :name="'ogImgUrl'"
                             :id="'blogConfigOgImgUrl'"
                             :value="$store.state.BlogConfig.data?.ogImgUrl"
                             v-model="previewBlogConfig.ogImgUrl"
            />
            <ui-hidden-field :name="'ogImgSize'" :id="'blogConfigOgImgSize'" :value="$store.state.BlogConfig.data?.ogImgSize" />

            <ui-file-field :name="'ogImgFile'"
                           :id="'blogConfigOgImgFile'"
                           :accept="'image/*'"
                           :gap="10"
                           @onchange="onChangeOgImg">

              <ui-file-button :type="'button'"
                              :color="'secondary'"
                              :listKey="'og'"
                              @listFile="onListFile"
                              @clickFile="onClickFile">Cloudinary
              </ui-file-button>
            </ui-file-field>

            <ui-file-info :imgName="ogImg"
                          :imgSize="ogImgSize"
                          v-if="$store.state.BlogConfig.data?.ogImg"
            >
              <ui-checkbox :name="'delOgImg'"
                           :id="'blogConfigDelOgImg'"
                           :label="'삭제'"
                           :values="'Y,N'">
              </ui-checkbox>
            </ui-file-info>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <label for="blogConfigOgImgContrast">대표 이미지 밝기</label>
          </th>
          <td>
            <ui-numeric-field :name="'ogImgContrast'"
                              :id="'blogConfigOgImgContrast'"
                              :step="'0.01'"
                              :min="'0'"
                              :max="'1.1'"
                              :rules="'between:0,1.1'"
                              :text="'0.1 ~ 1 이하 (초기화 0)'"
                              :value="$store.state.BlogConfig.data?.ogImgContrast"
                              v-model="previewBlogConfig.ogImgContrast">
            </ui-numeric-field>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <label for="blogConfigOgImgBlur">대표 이미지 흐림</label>
          </th>
          <td>
            <ui-numeric-field :name="'ogImgBlur'"
                              :id="'blogConfigOgImgBlur'"
                              :step="'0.01'"
                              :min="'0'"
                              :max="'9.9'"
                              :rules="'between:0,9.9'"
                              :text="'0.1 ~ 10 미만 (초기화 0)'"
                              :value="$store.state.BlogConfig.data?.ogImgBlur"
                              v-model="previewBlogConfig.ogImgBlur">
            </ui-numeric-field>
          </td>
        </tr>
        <tr class="blog-config__og-image-wrapper blog-config__og-image-wrapper--active">
          <th scope="row">대표 이미지 위치값</th>
          <td>
            <ui-numeric-field :name="'ogImgPosX'"
                              :id="'blogConfigOgImgPosX'"
                              :min="'0'"
                              :max="'100'"
                              :rules="'between:0,100'"
                              :text="'가로 0 ~ 100 (기본 50)'"
                              :title="'대표 이미지 가로 위치값'"
                              :value="$store.state.BlogConfig.data?.ogImgPosX"
                              v-model="previewBlogConfig.ogImgPosX">
            </ui-numeric-field>

            <ui-numeric-field :name="'ogImgPosY'"
                              :id="'blogConfigOgImgPosY'"
                              :min="'0'"
                              :max="'100'"
                              :rules="'between:0,100'"
                              :text="'세로 0 ~ 100 (기본 50)'"
                              :title="'대표 이미지 세로 위치값'"
                              :value="$store.state.BlogConfig.data?.ogImgPosY"
                              v-model="previewBlogConfig.ogImgPosY">
            </ui-numeric-field>

            <ui-radio :id="'blogConfigOgImgCoverY'"
                      :name="'ogImgCoverYn'"
                      :label="'이미지 채우기'"
                      :rules="'required'"
                      :value="'Y'"
                      v-model="previewBlogConfig.ogImgCoverYn">
            </ui-radio>

            <ui-radio :id="'blogConfigOgImgCoverN'"
                      :name="'ogImgCoverYn'"
                      :label="'이미지 비율 유지'"
                      :rules="'required'"
                      :value="'N'"
                      v-model="previewBlogConfig.ogImgCoverYn">
            </ui-radio>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <label for="blogConfigPageSize">메인 포스트 출력 개수</label>
          </th>
          <td>
            <ui-numeric-field :name="'pageSize'"
                              :id="'blogConfigPageSize'"
                              :min="'2'"
                              :max="'10'"
                              :rules="'between:2,10'"
                              :text="'2 ~ 10 (기본 6)'"
                              :value="$store.state.BlogConfig.data?.pageSize"
                              v-model="pageSize">
            </ui-numeric-field>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <label for="blogConfigShowSatisYn">페이지 만족도조사 표출</label>
          </th>
          <td>
            <ui-checkbox :name="'showSatisYn'"
                         :id="'blogConfigShowSatisYn'"
                         :label="'페이지 만족도조사 표출'"
                         :labelHidden="true"
                         :values="'Y,N'"
                         v-model="showSatisYn">
            </ui-checkbox>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <label for="blogConfigKakaoMsgYn">카카오톡 메시지 수신</label>
          </th>
          <td>
            <ui-checkbox :name="'kakaoMsgYn'"
                         :id="'blogConfigKakaoMsgYn'"
                         :label="'카카오톡 메시지 수신'"
                         :labelHidden="true"
                         :values="'Y,N'"
                         v-model="kakaoMsgYn">
            </ui-checkbox>
          </td>
        </tr>

        <template v-slot:btn>
          <ui-button :type="'reset'"
                     :color="'secondary'">다시작성
          </ui-button>

          <ui-button :type="'submit'"
                     :color="'primary'">저장
          </ui-button>
        </template>
      </ui-write-table>
    </ui-form>
  </app-content-wrapper>
</template>

<script>
import { BreadcrumbService } from '@/services/breadcrumb/breadcrumbService';
import { messageUtil, isNotEmpty, isEmpty } from '@/utils';

export default {
  name: 'app-admin-blog-config',
  data() {
    return {
      pageTitle: '블로그 환경설정',
      avatarImg: '',
      avatarImgUrl: '',
      avatarImgSize: '',
      ogImg: '',
      ogImgUrl: '',
      ogImgSize: '',
      showSatisYn: '',
      kakaoMsgYn: '',
      avatarFileList: [],
      ogFileList: [],
      pageSize: '',
      previewBlogConfig: {},
    }
  },
  /** 해당 컴포넌트를 벗어나 새로운 페이지로 이동할 때 호출됨 */
  async beforeRouteLeave(to, from, next) {
    if (isNotEmpty(this.$store.state.BlogConfig?.previewData)) {

      // 환경설정 미리보기 데이타 초기화
      this.$store.dispatch('BlogConfig/FETCH_PREVIEW_DATA', null);
      await this.$store.dispatch('BlogConfig/GET_BLOG_CONFIG');
    }
    next();
  },
  created() {
    // 페이지 타이틀 세팅
    new BreadcrumbService().setPageTitle(this.pageTitle);

    // 2023.08.20. 성능 이슈로 인해 환경설정 페이지에서만 데이타를 한 번 더 불러오도록 수정
    this.$store.dispatch('BlogConfig/GET_BLOG_CONFIG')
    .then(data => {
      this.avatarImg = data?.avatarImg;
      this.avatarImgSize = data?.avatarImgSize;
      this.ogImg = data?.ogImg;
      this.ogImgSize = data?.ogImgSize;
      this.pageSize = data?.pageSize;
      this.showSatisYn = data?.showSatisYn;
      this.kakaoMsgYn = data?.kakaoMsgYn;

      this.$store.dispatch('BlogConfig/FETCH_PREVIEW_DATA', null);
  
      if (isEmpty(this.$store.state.BlogConfig?.previewData)) {
        this.previewBlogConfig = Object.assign({}, data);
      } else {
        this.previewBlogConfig = Object.assign({}, this.$store.state.BlogConfig?.previewData);
      }
    });
  },
  watch: {
    /** 환경설정 미리보기 데이타 */
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
      .then(res => {
        messageUtil.toastSuccess('저장되었습니다.');

        this.$store.dispatch('BlogConfig/FETCH_BLOG_CONFIG', res.data);
        this.$store.dispatch('BlogConfig/FETCH_PREVIEW_DATA', null);

        new BreadcrumbService().setPageTitle(this.pageTitle);
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
        this.$refs['blogConfigForm'].setFieldValue('avatarImgUrl', file.url);
        this.$refs['blogConfigForm'].setFieldValue('avatarImgSize', file.bytes);
      } else if ('og' === key) {
        this.$refs['blogConfigForm'].setFieldValue('ogImg', file.public_id + '.' + file.format);
        this.$refs['blogConfigForm'].setFieldValue('ogImgUrl', file.url);
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