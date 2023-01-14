<template>
  <app-content-wrapper :pageTitle="pageTitle">
    <ui-form :name="'blogConfigForm'"
             :ref="'blogConfigForm'"
             :class="'blog-config__frm'"
             @onsubmit="onSubmit"
      >
      <ui-hidden-field :name="'id'" :id="'blogConfigId'" :value="blogConfig.id"></ui-hidden-field>

      <ui-write-table :name="'블로그 환경설정 작성 폼'">
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
                           :class="'blog-config__title'"
                           :block="true"
                           :rules="'required|max:100'"
                           :value="blogConfig.title">
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
                           :class="'blog-config__author'"
                           :block="true"
                           :rules="'required|max:30'"
                           :value="blogConfig.author">
            </ui-text-field>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <label for="blogConfigDescription">블로그 소개</label>
          </th>
          <td>
            <ui-textarea :name="'description'"
                         :id="'blogConfigDescription'"
                         :cols="'30'"
                         :rows="'10'"
                         :resize="'vertical'"
                         :value="blogConfig.description">
            </ui-textarea>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <label for="avatarImgFile">블로그 아바타 이미지</label>
          </th>
          <td>
            <ui-hidden-field :name="'hAvatarImg'" :id="'hAvatarImg'" :value="blogConfig.avatarImg"></ui-hidden-field>
            <ui-hidden-field :name="'hAvatarImgUrl'" :id="'hAvatarImgUrl'" :value="blogConfig.avatarImgUrl"></ui-hidden-field>
            <ui-hidden-field :name="'hAvatarImgSize'" :id="'hAvatarImgSize'" :value="blogConfig.avatarImgSize"></ui-hidden-field>

            <ui-file-field :name="'avatarImgFile'"
                           :id="'avatarImgFile'"
                           :accept="'image/*'"
                           :gap="10"
                           @onchange="onChangeAvatarImg">
              
              <ui-button :type="'button'"
                         :color="'secondary'">Cloudinary
              </ui-button>
            </ui-file-field>

            <div class="blog-config__avatar-image-use-wrapper">
              <span class="blog-config__avatar-image-use">
                {{ avatarImg }} (용량 : {{ getFileSize(avatarImgSize) }})
              </span>

              <ui-checkbox :name="'delAvatarImg'"
                           :id="'blogConfigDelAvatarImg'"
                           :label="'삭제'"
                           :values="'Y,N'">
              </ui-checkbox>
            </div>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <label for="ogImgFile">블로그 대표 이미지</label>
          </th>
          <td>
            <ui-hidden-field :name="'hOgImg'" :id="'hOgImg'" :value="blogConfig.ogImg"></ui-hidden-field>
            <ui-hidden-field :name="'hOgImgUrl'" :id="'hOgImgUrl'" :value="blogConfig.ogImgUrl"></ui-hidden-field>
            <ui-hidden-field :name="'hOgImgSize'" :id="'hOgImgSize'" :value="blogConfig.ogImgSize"></ui-hidden-field>

            <ui-file-field :name="'ogImgFile'"
                           :id="'ogImgFile'"
                           :accept="'image/*'"
                           :gap="10"
                           @onchange="onChangeOgImg">
              
              <ui-button :type="'button'"
                         :color="'secondary'">Cloudinary
              </ui-button>
            </ui-file-field>

            <div class="blog-config__og-image-use-wrapper">
              <span class="blog-config__og-image-use">
                {{ ogImg }} (용량 : {{ getFileSize(ogImgSize) }})
              </span>

              <ui-checkbox :name="'delOgImg'"
                           :id="'blogConfigDelOgImg'"
                           :label="'삭제'"
                           :values="'Y,N'">
              </ui-checkbox>
            </div>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <label for="ogImgContrast">블로그 대표 이미지 밝기</label>
          </th>
          <td>
            <ui-numeric-field :name="'ogImgContrast'"
                              :id="'blogConfigOgImgContrast'"
                              :step="'0.01'"
                              :min="'0'"
                              :max="'1.1'"
                              :rules="'between:0,1.1'"
                              :text="'0.1 ~ 1 미만 (초기화 0)'"
                              :value="blogConfig.ogImgContrast">
            </ui-numeric-field>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <label for="blogConfigOgImgBlur">블로그 대표 이미지 흐림</label>
          </th>
          <td>
            <ui-numeric-field :name="'ogImgBlur'"
                              :id="'blogConfigOgImgBlur'"
                              :step="'0.01'"
                              :min="'0'"
                              :max="'9.9'"
                              :rules="'between:0,9.9'"
                              :text="'0.1 ~ 10 미만 (초기화 0)'"
                              :value="blogConfig.ogImgBlur">
            </ui-numeric-field>
          </td>
        </tr>
        <tr class="blog-config__og-image-wrapper blog-config__og-image-wrapper--active">
          <th scope="row">
            <label for="blogConfigOgImgPosX">블로그 대표 이미지 위치값</label>
          </th>
          <td>
            <ui-numeric-field :name="'ogImgPosX'"
                              :id="'blogConfigOgImgPosX'"
                              :min="'0'"
                              :max="'100'"
                              :rules="'between:0,100'"
                              :text="'가로 0 ~ 100 (기본 50)'"
                              :value="blogConfig.ogImgPosX">
            </ui-numeric-field>

            <ui-numeric-field :name="'ogImgPosY'"
                              :id="'blogConfigOgImgPosY'"
                              :min="'0'"
                              :max="'100'"
                              :rules="'between:0,100'"
                              :text="'세로 0 ~ 100 (기본 50)'"
                              :value="blogConfig.ogImgPosY">
            </ui-numeric-field>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <label for="blogConfigPageSize">메인 포스트 목록 출력 개수</label>
          </th>
          <td>
            <ui-numeric-field :name="'pageSize'"
                              :id="'blogConfigPageSize'"
                              :min="'2'"
                              :max="'10'"
                              :rules="'between:2,10'"
                              :text="'2 ~ 10 (기본 6)'"
                              :value="blogConfig.pageSize">
            </ui-numeric-field>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <label for="blogConfigshowSatisYn">페이지 만족도조사 표출</label>
          </th>
          <td>
            <ui-checkbox :name="'showSatisYn'"
                         :id="'blogConfigshowSatisYn'"
                         :label="'페이지 만족도조사 표출'"
                         :labelHidden="true"
                         :values="'Y,N'"
                         v-model="showSatisYn">
            </ui-checkbox>
          </td>
        </tr>
      </ui-write-table>

      <div class="d-flex-w flex--center gap--10 mt--20 mb--20">
        <ui-button :type="'reset'"
                   :color="'secondary'">다시작성
        </ui-button>

        <ui-button :type="'submit'"
                   :color="'primary'">저장
        </ui-button>
      </div>
    </ui-form>
  </app-content-wrapper>
</template>

<script>
import { breadcrumbService } from '@/services/breadcrumb/breadcrumbService';
import { messageUtil, getFileSize, isNotEmpty } from '@/utils';

export default {
  name: 'app-blog-config',
  data() {
    return {
      pageTitle: '블로그 환경설정',
      avatarImg: '',
      avatarImgSize: '',
      ogImg: '',
      ogImgSize: '',
      showSatisYn: '',
      getFileSize,
    }
  },
  created() {
    // 페이지 타이틀 세팅
    breadcrumbService.setPageTitle(this.pageTitle);

    this.avatarImg = this.blogConfig.avatarImg;
    this.avatarImgSize = this.blogConfig.avatarImgSize;
    this.ogImg = this.blogConfig.ogImg;
    this.ogImgSize = this.blogConfig.ogImgSize;
    this.showSatisYn = this.blogConfig.showSatisYn;
  },
  computed: {
    /** 블로그 환경설정 */
    blogConfig: {
      get() {
        return this.$store.state.BlogConfig.data;
      },
      set(v) {}
    }
  },
  methods: {
    /** 블로그 환경설정 저장 */
    async onSubmit(values) {
      console.log(values);

      const confirm = await messageUtil.confirmSuccess('저장하시겠습니까?');
      if (!confirm) return;

      const headers = { 'Content-Type': 'multipart/form-data' };

      this.$http.put('/blogconfig', values, { headers })
        .then(res => {
          
        });
    },
    /** 블로그 아바타 이미지 file input 값 변경 시 */
    onChangeAvatarImg(values) {
      this.avatarImg = values.name;
      this.avatarImgSize = values.size;
    },
    /** 블로그 대표 이미지 file input 값 변경 시 */
    onChangeOgImg(values) {
      this.ogImg = values.name;
      this.ogImgSize = values.size;
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/views/blog-config.scss';
</style>