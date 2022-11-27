<template>
  <app-content-wrapper :pageTitle="pageTitle">
    <form method="post" action="/blogconfig" enctype="multipart/form-data" class="blog-config__frm">
      <table class="write-tbl">
          <caption class="sr-only">블로그 환경설정 입력 폼</caption>
          <colgroup>
              <col>
              <col>
          </colgroup>
          <tbody>
              <tr>
                <th scope="row">
                  <label for="title">블로그 제목(50자 이내)
                      <sup>*
                        <span class="sr-only">필수입력란</span>
                      </sup>
                  </label>
                </th>
                <td>
                  <input type="text" name="title" id="title" maxlength="100" class="blog-config__title" value="개발일기장">
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <label for="author">닉네임(30자 이내)
                      <sup>*
                        <span class="sr-only">필수입력란</span>
                      </sup>
                  </label>
                </th>
                <td>
                  <input type="text" name="author" id="author" maxlength="30" class="blog-config__author" value="sel">
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <label for="description">블로그 소개</label>
                </th>
                <td>
                  <textarea cols="30" rows="10" name="description" id="description">sel의 개인블로그입니다.</textarea>
                </td>
              </tr>
              <tr>
                  <th scope="row">
                    <label for="avatar_image">블로그 아바타 이미지</label>
                  </th>
                  <td>
                    <input type="hidden" name="h_avatar_image" id="h_avatar_image" value="rgf9bfgraocf0lg3kagw.jpg">
                    <input type="hidden" name="h_avatar_image_path" id="h_avatar_image_path" value="http://res.cloudinary.com/dbrgfvqgb/image/upload/v1641389198/rgf9bfgraocf0lg3kagw.jpg">
                    <input type="hidden" name="h_avatar_image_url" id="h_avatar_image_url" value="http://res.cloudinary.com/dbrgfvqgb/image/upload/v1641389198/rgf9bfgraocf0lg3kagw.jpg">
                    <input type="hidden" name="h_avatar_image_cloudinary_flag" id="h_avatar_image_cloudinary_flag" value="N">
                    <input type="hidden" name="h_avatar_image_size" id="h_avatar_image_size">

                    <input type="file" name="avatar_image" id="avatar_image" accept="image/*">
                    
                    <div class="d-flex-w gap--10">
                      <label for="avatar_image" class="btn btn--dark blog-config__avatar-image-btn">파일선택</label>
                      <button type="button" class="btn btn--secondary" data-ctx="avatar">Cloudinary</button>
                    </div>
                    
                    <div class="blog-config__avatar-image-use-wrapper">
                      <span class="blog-config__avatar-image-use">
                          rgf9bfgraocf0lg3kagw.jpg (용량 : 47.9785KB)
                      </span>
                      
                      <input type="checkbox" name="delete_avatar_image" id="delete_avatar_image">
                      <label for="delete_avatar_image">삭제</label>
                    </div>
                  </td>
              </tr>
              <tr>
                  <th scope="row">
                    <label for="og_image">블로그 대표 이미지</label>
                  </th>
                  <td>
                    <input type="hidden" name="h_og_image" id="h_og_image" value="foo/fantastic-blue-sky_zfjptv.png">
                    <input type="hidden" name="h_og_image_path" id="h_og_image_path" value="http://res.cloudinary.com/dbrgfvqgb/image/upload/v1643533394/foo/fantastic-blue-sky_zfjptv.png">
                    <input type="hidden" name="h_og_image_url" id="h_og_image_url" value="http://res.cloudinary.com/dbrgfvqgb/image/upload/v1643533394/foo/fantastic-blue-sky_zfjptv.png">
                    <input type="hidden" name="h_og_image_cloudinary_flag" id="h_og_image_cloudinary_flag" value="N">
                    <input type="hidden" name="h_og_image_size" id="h_og_image_size">

                    <input type="file" name="og_image" id="og_image" accept="image/*">

                    <div class="d-flex-w gap--10">
                      <label for="og_image" class="btn btn--dark blog-config__og-image-btn">파일선택</label>
                      <button type="button" class="btn btn--secondary" data-ctx="og-image">Cloudinary</button>
                    </div>
                    
                    <div class="blog-config__og-image-use-wrapper">
                      <span class="blog-config__og-image-use">
                        foo/fantastic-blue-sky_zfjptv.png (용량 : 403.598KB)
                      </span>
                      
                      <input type="checkbox" name="delete_og_image" id="delete_og_image">
                      <label for="delete_og_image">삭제</label>
                    </div>
                  </td>
              </tr>
              <tr class="blog-config__og-image-wrapper blog-config__og-image-wrapper--active">
                <th scope="row">
                  <label for="og_image_contrast">블로그 대표 이미지 밝기</label>
                </th>
                <td>
                  <input type="number" name="og_image_contrast" id="og_image_contrast" step="0.01" min="0" max="0.9" value="0.2">
                  <span class="blog-config__txt">0.1 ~ 1 미만 (초기화 0)</span>
                </td>
              </tr>
              <tr class="blog-config__og-image-wrapper blog-config__og-image-wrapper--active">
                <th scope="row">
                  <label for="og_image_blur">블로그 대표 이미지 흐림</label>
                </th>
                <td>
                  <input type="number" name="og_image_blur" id="og_image_blur" step="0.01" min="0" max="9.9" value="0">
                  <span class="blog-config__txt">0.1 ~ 10 미만 (초기화 0)</span>
                </td>
              </tr>
              <tr class="blog-config__og-image-wrapper blog-config__og-image-wrapper--active">
                <th scope="row">블로그 대표 이미지 위치값</th>
                <td>
                  <input type="number" name="og_image_position_x" id="og_image_position_x" min="0" max="100" value="50">
                  <span class="blog-config__txt">가로 0 ~ 100 (기본 50)</span>

                  <input type="number" name="og_image_position_y" id="og_image_position_y" min="0" max="100" value="50">
                  <span class="blog-config__txt">세로 0 ~ 100 (기본 50)</span>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <label for="page_size">메인 포스트 목록 출력 개수</label>
                </th>
                <td>
                  <input type="number" name="page_size" id="page_size" min="2" max="10" value="5">
                  <span class="blog-config__txt">2 ~ 10 (기본 6)</span>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <label for="show_satisfaction">페이지 만족도조사 표출</label>
                </th>
                <td>
                  <input type="checkbox" name="show_satisfaction" id="show_satisfaction" checked="">
                  <label for="show_satisfaction">
                      <span class="sr-only">페이지 만족도조사 표출</span>
                  </label>
                </td>
              </tr>
          </tbody>
      </table>

      <div class="d-flex-w flex--center gap--10 mt--20 mb--20">
        <button type="button" class="blog-config__btn btn btn--primary">수정</button>
        <button type="button" class="blog-config__btn btn btn--secondary">다시작성</button>
      </div>
    </form>
  </app-content-wrapper>
</template>

<script>
import breadcrumbService from '@/services/breadcrumb/breadcrumbService';

export default {
  name: 'app-blog-config',
  data() {
    return {
      pageTitle: '블로그 환경설정',
    }
  },
  created() {
    // 페이지 타이틀 세팅
    breadcrumbService.setPageTitle(this.pageTitle);
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/views/blog-config.scss';
</style>