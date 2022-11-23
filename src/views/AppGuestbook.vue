<template>
  <app-content-wrapper :pageTitle="pageTitle">
    <div class="guestbook__wrapper">
      <ui-form :class="'guestbook__write-frm'" :name="'guestbookForm'" @onSubmit="onSubmit">
        <div class="guestbook__write">
          <ui-textarea :name="'cont'"
                       :id="'guestbookWriteCont'"
                       :title="'방명록 내용 입력'"
                       :placeholder="'하고싶은 말을 남겨주세요.'"
                       :cols="'30'"
                       :rows="'4'"
                       :rules="'required'">
          </ui-textarea>

          <div class="guestbook__write__inputs">
            <label for="writeAuthor">닉네임
              <ui-text-field :type="'text'"
                             :name="'author'"
                             :id="'writeAuthor'"
                             :className="'guestbook__input'"
                             :rules="'required|maxLength:20'">
              </ui-text-field>
            </label>

            <label for="writePw">비밀번호
              <ui-text-field :type="'password'"
                             :name="'authorPw'"
                             :id="'writePw'"
                             :className="'guestbook__input'"
                             :rules="'required|minLength:8|maxLength:15'">
              </ui-text-field>
            </label>

            <div class="guestbook__write__btns d-flex-w gap--10">
              <ui-button :type="'reset'"
                         :color="'secondary'"
                         :className="'guestbook__btn guestbook__btn--reset'">다시작성
              </ui-button>

              <ui-button :type="'submit'"
                         :color="'primary'"
                         :className="'guestbook__btn guestbook__btn--write'">등록
              </ui-button>
            </div>
          </div>
        </div>
      </ui-form>

      <template v-if="!dataLoaded">
        <ui-skeletor :height="'1.3rem'"></ui-skeletor>
        <ui-skeletor :height="'1.3rem'"></ui-skeletor>
        <ui-skeletor :height="'1.3rem'"></ui-skeletor>
      </template>

      <ul class="guestbook__depth1" v-if="dataLoaded">
        <li class="guestbook__depth1__list" v-for="(guestbook,i) in guestbookList" :key="i">
          <p class="guestbook__cont" v-html="guestbook.cont"></p>

          <div class="guestbook__cont__info depth1">
            <span class="guestbook__author">
              <strong>
                <i class="xi-user-o" aria-hidden="true"></i> 글쓴이 :
              </strong>
              {{ guestbook.author }}
            </span>

            <span class="guestbook__reg-date">
              <strong>
                <i class="xi-time-o" aria-hidden="true"></i> 등록일 :
              </strong>
              {{ guestbook.regDate }}
            </span>
          </div>

          <template v-if="0 < guestbook.guestbookReply.length">
            <button type="button"
                    class="guestbook__btn guestbook__btn--reply-open"
                    :title="`댓글 ${guestbook.guestbookReply.length}개 펼쳐보기`">
              <i class="xi-message" aria-hidden="true"></i> 
              <span class="reply_cnt">{{ guestbook.guestbookReply.length > 99 ? '99+' : guestbook.guestbookReply.length }}</span>
            </button>
  
            <div class="guestbook__depth2">
              <ul></ul>
            </div>
          </template>

          <div class="guestbook__reply__wrapper">
            <ui-form :name="'guestbookReplyForm'">
              <ui-textarea :name="'cont'"
                           :id="`replyCont${i}`"
                           :className="'guestbook__reply__cont'"
                           :title="'댓글 입력'"
                           :placeholder="'댓글을 남겨주세요.'"
                           :cols="'30'"
                           :rows="'3'"
                           :rules="'required'">
              </ui-textarea>

              <div class="guestbook__reply__btns">
                <div class="guestbook__reply__btns-inner">
                  <label :for="`replyAuthor${i}`">닉네임
                    <ui-text-field :type="'text'"
                                   :name="'author'"
                                   :id="`replyAuthor${i}`"
                                   :className="'guestbook__input'"
                                   :rules="'required|maxLength:20'">
                    </ui-text-field>
                  </label>

                  <label :for="`replyPw${i}`">비밀번호
                    <ui-text-field :type="'password'"
                                   :name="'authorPw'"
                                   :id="`replyPw${i}`"
                                   :className="'guestbook__input'"
                                   :rules="'required|minLength:8|maxLength:15'">
                    </ui-text-field>
                  </label>
                </div>

                <ui-button :type="'submit'"
                           :color="'primary'"
                           :className="'guestbook__btn guestbook__btn--reply-write'">등록
                </ui-button>
              </div>
            </ui-form>
          </div>

          <div class="guestbook__reply__toggle">
            <button type="button" class="guestbook__reply__btn--toggle">
              <i class="xi-cog" aria-hidden="true"></i>
              <span class="sr-only">방명록 수정/삭제</span>
            </button>

            <div class="guestbook__reply__toggle-list">
              <ul>
                <li>
                  <button type="button" class="guestbook__btn--edit1">
                    <i class="xi-pen-o" aria-hidden="true"></i> 방명록 수정
                  </button>
                </li>
                <li>
                  <button type="button" class="guestbook__btn--delete1">
                    <i class="xi-trash-o" aria-hidden="true"></i> 방명록 삭제
                  </button>
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
import UiTextField from '@/components/shared/form/UiTextField.vue';
import UiTextarea from '@/components/shared/form/UiTextarea.vue';
import UiSkeletor from '@/components/shared/skeletor/UiSkeletor.vue';
import messageUtil from '@/utils/ui/MessageUtil';
import breadcrumbService from '@/services/breadcrumb/breadcrumbService';
import { isNotEmpty } from '@/utils/util';

export default {
  name: 'app-guestbook',
  components: {
    UiForm,
    UiTextField,
    UiTextarea,
    UiSkeletor,
  },
  data() {
    return {
      pageTitle: '방명록',
      page: 1,
      pageSize: 6,
      listCnt: 0,
      guestbookList: [],
      isScrolled: false,
      dataLoaded: false,
    }
  },
  async created() {
    // 페이지 타이틀 세팅
    breadcrumbService.setPageTitle(this.pageTitle);

    await this.listGuestbook();
    this.dataLoading();
  },
  mounted() {
    window.addEventListener('scroll', this.scroll);
  },
  unmounted() {
    window.removeEventListener('scroll', this.scroll);
  },
  methods: {
    // 방명록 목록 조회
    listGuestbook() {
      let paginationDto = {
        page: this.page,
        pageSize: this.pageSize,
      };

      return this.$http.get('/guestbook', { params: paginationDto })
        .then(res => {
          if (0 === res.data[0].length) {
            this.isScrolled = false;
            return;
          }

          res.data[0].map(d => {
            d.cont = d.cont.replace('\n', '<br>');
            d.regDate = this.$moment(d.regDate).format('YYYY-MM-DD HH:mm:ss');

            if (isNotEmpty(d.modDate)) {
              d.modDate = this.$moment(d.modDate).format('YYYY-MM-DD HH:mm:ss');
            }
            
            this.guestbookList.push(d);
          });

          this.listCnt = res.data[1];
          this.isScrolled = false;
        });
    },
    scroll() {
      const { scrollY } = window;
      const { clientHeight, scrollHeight } = document.documentElement;
      const bottomOfPage = (clientHeight + scrollY + 100) >= scrollHeight;
      
      if (bottomOfPage && !this.isScrolled) {
        setTimeout(() => {
          this.isScrolled = true; // 스크롤 중복 실행 방지
          this.page++;
          this.listGuestbook();
        }, 500);
      }
    },
    async onSubmit(values) {
      const confirm = await messageUtil.confirmSuccess('방명록을 등록하시겠습니까?');
      if (!confirm) return;

      this.$http.post('/guestbook', values)
        .then(res => {
          const guestbook = { ...res.data };
          
          guestbook.regDate = this.$moment(guestbook.regDate).format('YYYY-MM-DD HH:mm:ss');

          this.guestbookList.push(guestbook);
          this.guestbookList = this.guestbookList.sort((a,b) => b.id - a.id);

          messageUtil.toastSuccess('방명록이 등록되었습니다.');
        });
    },
    // 데이타 로딩
    dataLoading() {
      if (0 < this.guestbookList.length) {
        this.dataLoaded = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/views/guestbook.scss';
</style>
