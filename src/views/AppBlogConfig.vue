<template>
  <app-content-wrapper :pageTitle="pageTitle">
    <ui-form :name="'blogConfigForm'" :ref="'blogConfigForm'" :class="'blog-config__frm'" @onsubmit="onSubmit">
      <table class="write-tbl">
        <caption class="sr-only">블로그 환경설정 입력 폼</caption>
        <colgroup>
          <col>
          <col>
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">
              <label for="blogConfigTitle">블로그 제목(50자 이내)
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
              <label for="avatarImg">블로그 아바타 이미지</label>
            </th>
            <td>
              <ui-hidden-field :name="'hAvatarImg'" :id="'hAvatarImg'" :value="blogConfig.avatarImg"></ui-hidden-field>
              <ui-hidden-field :name="'hAvatarImgUrl'" :id="'hAvatarImgUrl'" :value="blogConfig.avatarImgUrl"></ui-hidden-field>
              <ui-hidden-field :name="'hAvatarImgSize'" :id="'hAvatarImgSize'" :value="blogConfig.avatarImgSize"></ui-hidden-field>

              <ui-file-field :name="'avatarImg'"
                             :id="'avatarImg'"
                             :rules="'required'"
                             :accept="'image/*'"
                             :gap="10">
                
                <ui-button :type="'button'"
                           :color="'secondary'">Cloudinary
                </ui-button>
              </ui-file-field>

              <div class="blog-config__avatar-image-use-wrapper">
                <span class="blog-config__avatar-image-use">{{ blogConfig.avatarImg }} (용량 : {{ getFileSize(blogConfig.avatarImgSize) }})</span>

                <input type="checkbox" name="delAvatarImg" id="delAvatarImg">
                <label for="delAvatarImg">삭제</label>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">
              <label for="ogImg">블로그 대표 이미지</label>
            </th>
            <td>
              <ui-hidden-field :name="'hOgImg'" :id="'hOgImg'" :value="blogConfig.ogImg"></ui-hidden-field>
              <ui-hidden-field :name="'hOgImgUrl'" :id="'hOgImgUrl'" :value="blogConfig.ogImgUrl"></ui-hidden-field>
              <ui-hidden-field :name="'hOgImgSize'" :id="'hOgImgSize'" :value="blogConfig.ogImgSize"></ui-hidden-field>

              <ui-file-field :name="'ogImg'"
                             :id="'ogImg'"
                             :rules="'required'"
                             :accept="'image/*'"
                             :gap="10">
                
                <ui-button :type="'button'"
                           :color="'secondary'">Cloudinary
                </ui-button>
              </ui-file-field>

              <div class="blog-config__og-image-use-wrapper">
                <span class="blog-config__og-image-use">{{ blogConfig.ogImg }} (용량 : {{ getFileSize(blogConfig.ogImgSize) }})</span>

                <input type="checkbox" name="delOgImg" id="delOgImg">
                <label for="delOgImg">삭제</label>
              </div>
            </td>
          </tr>
          <tr class="blog-config__og-image-wrapper blog-config__og-image-wrapper--active">
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
          <tr class="blog-config__og-image-wrapper blog-config__og-image-wrapper--active">
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
        </tbody>
      </table>

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

export default {
  name: 'app-blog-config',
  data() {
    return {
      pageTitle: '블로그 환경설정',
      showSatisYn: '',
    }
  },
  created() {
    // 페이지 타이틀 세팅
    breadcrumbService.setPageTitle(this.pageTitle);

    this.showSatisYn = this.blogConfig.showSatisYn;
  },
  computed: {
    /** 블로그 환경설정 정보 */
    blogConfig: {
      get() {
        return this.$store.state.BlogConfig.data;
      },
      set(v) {}
    }
  },
  methods: {
    /** 블로그 환경설정 저장 */
    onSubmit(values) {
      console.log(values);
    },
    /** 파일 용량 구하기 */
    getFileSize(size) {
      if (size < 999) return size + 'MB';
      return size + 'KB';
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/views/blog-config.scss';
</style>