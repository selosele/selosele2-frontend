<template>
  <app-content-wrapper :pageTitle="pageTitle">
    <div class="guestbook__wrapper">
      <ui-form :class="'guestbook__write-frm'" :name="'guestbookForm'" @onSubmit="onSubmit">
        <div class="guestbook__write">
          <ui-textarea :name="'guestbookWriteCont'"
                      :id="'guestbookWriteCont'"
                      :title="'방명록 내용 입력'"
                      :placeholder="'하고싶은 말을 남겨주세요.'"
                      :rules="'required'"
                      :cols="'30'"
                      :rows="'4'" />

          <div class="guestbook__write__inputs">
            <label for="guestbook_write_author">
              닉네임
              <!-- 운영모드에서만 maxlength="20" 속성 필요 -->
              <input type="text" name="guestbook_write_author" id="guestbook_write_author" class="guestbook__input" maxlength="20" />
            </label>

            <label for="guestbook_write_pw">
              비밀번호
              <!-- 운영모드에서만 minlength="8" maxlength="15" 속성 필요 -->
              <input type="password" name="guestbook_write_pw" id="guestbook_write_pw" class="guestbook__input" minlength="8" maxlength="15" />
            </label>

            <div class="guestbook__write__btns d-flex-w gap--10 mt--20">
              <button type="reset" class="btn btn--secondary guestbook__btn guestbook__btn--reset">다시작성</button>
              <button type="submit" class="btn btn--primary guestbook__btn guestbook__btn--write">등록</button>
            </div>
          </div>
        </div>
      </ui-form>

      <ul class="guestbook__depth1">
        <li data-id="2" id="guestbook2" class="guestbook__depth1__list">
          <p class="guestbook__cont">to.세현씨 실력 조금만 나눠주쇼.. 인생 너무 열심히 사는 거 아닙니까?????????????? 네????????????????? from.송</p>

          <div class="guestbook__cont__info depth1">
            <span class="guestbook__author">
              <strong> <i class="xi-user-o" aria-hidden="true"></i> 글쓴이 : </strong>

              은
            </span>

            <span class="guestbook__reg-date">
              <strong> <i class="xi-time-o" aria-hidden="true"></i> 등록일 : </strong>

              2022-07-05 21:00:57
            </span>
          </div>

          <div class="guestbook__reply__wrapper">
            <textarea id="guestbook_reply_cont2" class="guestbook__reply__cont" title="댓글 입력" placeholder="댓글을 작성해보세요." cols="30" rows="3"></textarea>

            <div class="guestbook__reply__btns">
              <div class="guestbook__reply__btns-inner">
                <label for="guestbook_reply_author2">
                  닉네임
                  <input type="text" name="guestbook_reply_author" id="guestbook_reply_author2" class="guestbook__input" maxlength="20" />
                </label>

                <label for="guestbook_reply_pw2">
                  비밀번호
                  <input type="password" name="guestbook_reply_pw" id="guestbook_reply_pw2" class="guestbook__input" minlength="8" maxlength="15" />
                </label>
              </div>

              <button type="button" class="btn btn--primary guestbook__btn guestbook__btn--reply-write">등록</button>
            </div>
          </div>

          <div class="guestbook__reply__toggle">
            <button type="button" class="guestbook__reply__btn--toggle">
              <i class="xi-cog" aria-hidden="true"></i>
              <span class="sr-only">방명록 수정/삭제</span>
            </button>

            <div class="guestbook__reply__toggle-list">
              <ul>
                <li>
                  <button type="button" data-id="2" class="guestbook__btn--edit1"><i class="xi-pen-o" aria-hidden="true"></i> 방명록 수정</button>
                </li>

                <li>
                  <button type="button" data-id="2" class="guestbook__btn--delete1"><i class="xi-trash-o" aria-hidden="true"></i> 방명록 삭제</button>
                </li>
              </ul>
            </div>
          </div>
        </li>

        <li data-id="1" id="guestbook1" class="guestbook__depth1__list">
          <p class="guestbook__cont">우와~ ㅎ</p>

          <div class="guestbook__cont__info depth1">
            <span class="guestbook__author">
              <strong> <i class="xi-user-o" aria-hidden="true"></i> 글쓴이 : </strong>

              송
            </span>

            <span class="guestbook__reg-date">
              <strong> <i class="xi-time-o" aria-hidden="true"></i> 등록일 : </strong>

              2021-12-11 16:38:41
            </span>
          </div>

          <button type="button" data-id="1" class="guestbook__btn guestbook__btn--reply-open" title="댓글 1개 펼쳐보기">
            <i class="xi-message" aria-hidden="true"></i>
            <span class="reply_cnt">1</span>
          </button>

          <div data-id="1" class="guestbook__depth2">
            <ul></ul>
          </div>

          <div class="guestbook__reply__wrapper">
            <textarea id="guestbook_reply_cont1" class="guestbook__reply__cont" title="댓글 입력" placeholder="댓글을 작성해보세요." cols="30" rows="3"></textarea>

            <div class="guestbook__reply__btns">
              <div class="guestbook__reply__btns-inner">
                <label for="guestbook_reply_author1">
                  닉네임
                  <input type="text" name="guestbook_reply_author" id="guestbook_reply_author1" class="guestbook__input" maxlength="20" />
                </label>

                <label for="guestbook_reply_pw1">
                  비밀번호
                  <input type="password" name="guestbook_reply_pw" id="guestbook_reply_pw1" class="guestbook__input" minlength="8" maxlength="15" />
                </label>
              </div>

              <button type="button" class="btn btn--primary guestbook__btn guestbook__btn--reply-write">등록</button>
            </div>
          </div>

          <div class="guestbook__reply__toggle">
            <button type="button" class="guestbook__reply__btn--toggle">
              <i class="xi-cog" aria-hidden="true"></i>
              <span class="sr-only">방명록 수정/삭제</span>
            </button>

            <div class="guestbook__reply__toggle-list">
              <ul>
                <li>
                  <button type="button" data-id="1" class="guestbook__btn--edit1"><i class="xi-pen-o" aria-hidden="true"></i> 방명록 수정</button>
                </li>

                <li>
                  <button type="button" data-id="1" class="guestbook__btn--delete1"><i class="xi-trash-o" aria-hidden="true"></i> 방명록 삭제</button>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </app-content-wrapper>
</template>

<script>
import UiForm from '@/components/shared/form/UiForm.vue';
import UiTextarea from '@/components/shared/form/UiTextarea.vue';
import alertUtil from '@/utils/ui/Alert';
import breadCrumbService from '@/services/breadcrumb/breadcrumbService';

export default {
  name: 'app-guestbook',
  components: {
    UiForm,
    UiTextarea,
  },
  data() {
    return {
      pageTitle: '방명록',
    }
  },
  created() {
    // 페이지 타이틀 세팅
    breadCrumbService.setPageTitle(this.pageTitle);
  },
  methods: {
    onSubmit() {
      alertUtil.success('test');
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/views/guestbook.scss';
</style>
