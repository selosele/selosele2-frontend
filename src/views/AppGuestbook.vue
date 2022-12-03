<template>
  <app-content-wrapper :pageTitle="pageTitle">
    <div class="guestbook__wrapper">
      <ui-form :class="'guestbook__write-frm'" :name="'guestbookForm'" @onSubmit="onSubmit">
        <div class="guestbook__write">
          <ui-textarea :name="'cont'"
                       :id="'guestbookWriteCont'"
                       :class="'guestbook__textarea'"
                       :title="'방명록 내용 입력'"
                       :placeholder="'하고싶은 말을 남겨주세요.'"
                       :cols="'30'"
                       :rows="'4'"
                       :rules="'required'">
          </ui-textarea>

          <div class="guestbook__write__inputs">
            <div class="guestbook__write__input-box">
              <label for="guestbookWriteAuthor">닉네임</label>
              <div>
                <ui-text-field :type="'text'"
                               :name="'author'"
                               :id="'guestbookWriteAuthor'"
                               :class="'guestbook__input'"
                               :rules="'required|maxLength:20'">
                </ui-text-field>
              </div>
            </div>

            <div class="guestbook__write__input-box">
              <label for="guestbookWritePw">비밀번호</label>
              <div>
                <ui-text-field :type="'password'"
                               :name="'authorPw'"
                               :id="'guestbookWritePw'"
                               :class="'guestbook__input'"
                               :rules="'required|minLength:8|maxLength:15'">
                </ui-text-field>
              </div>
            </div>

            <div class="guestbook__write__btns d-flex-w gap--10">
              <ui-button :type="'reset'"
                         :color="'secondary'"
                         :class="'guestbook__btn guestbook__btn--reset'">다시작성
              </ui-button>

              <ui-button :type="'submit'"
                         :color="'primary'"
                         :class="'guestbook__btn guestbook__btn--write'">등록
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

          <app-guestbook-reply :idx="i"></app-guestbook-reply>

          <div class="guestbook__toggle">
            <button type="button" class="guestbook__btn--toggle" @click="toggleMenu(i)">
              <i class="xi-cog" aria-hidden="true"></i>
              <span class="sr-only">방명록 수정/삭제</span>
            </button>

            <div class="guestbook__toggle-list" v-show="i === activeIndex">
              <ul>
                <li>
                  <button type="button" class="guestbook__btn--edit1" ref="guestbookMenuBtn" @click="openModal('update', guestbook)">
                    <i class="xi-pen-o" aria-hidden="true"></i> 방명록 수정
                  </button>
                </li>
                <li>
                  <button type="button" class="guestbook__btn--delete1" ref="guestbookMenuBtn" @click="openModal('remove', guestbook)">
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
import breadcrumbService from '@/services/breadcrumb/BreadcrumbService';
import { isNotEmpty } from '@/utils/util';
import AppGuestbookReply from '@/components/views/guestbook/AppGuestbookReply.vue';
import AppUpdateGuestbookModal from '@/components/views/guestbook/AppUpdateGuestbookModal.vue';
import AppRemoveGuestbookModal from '@/components/views/guestbook/AppRemoveGuestbookModal.vue';

export default {
  name: 'app-guestbook',
  components: {
    UiForm,
    UiTextField,
    UiTextarea,
    UiSkeletor,
    AppGuestbookReply,
  },
  data() {
    return {
      pageTitle: '방명록',
      page: 1,
      pageSize: 6,
      listCnt: 0,
      guestbookList: [],
      activeIndex: -1,
      isScrolled: false,
      isLastPage: false,
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
    document.addEventListener('click', this.closeMenu);
  },
  unmounted() {
    window.removeEventListener('scroll', this.scroll);
    document.removeEventListener('click', this.closeMenu);
  },
  watch: {
    // 방명록이 수정되고 Modal이 close됐을 때 실행됨
    '$store.state.Guestbook.updatedGuestbook': function(updatedGuestbook) {
      if (0 < Object.values(updatedGuestbook).length) {
        const { id, author, cont, modDate } = updatedGuestbook;
        const foundIdx = this.guestbookList.findIndex(d => d.id == id);

        this.guestbookList[foundIdx].author = author;
        this.guestbookList[foundIdx].cont = cont;
        this.guestbookList[foundIdx].modDate = modDate;
        this.$store.dispatch('Guestbook/FETCH_UPDATED_GUESTBOOK', {});
      }
    },
    // 방명록이 삭제되고 Modal이 close됐을 때 실행됨
    '$store.state.Guestbook.removedGuestbook': function(removedGuestbook) {
      if (0 < Object.values(removedGuestbook).length) {
        const { id } = removedGuestbook;
        const foundIdx = this.guestbookList.findIndex(d => d.id == id);

        this.guestbookList.splice(foundIdx, 1);
        this.$store.dispatch('Guestbook/FETCH_REMOVED_GUESTBOOK', {});
      }
    },
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

          if (this.listCnt === this.guestbookList.length) {
            this.isLastPage = true;
          }
          
          this.isScrolled = false;
        });
    },
    // 방명록 메뉴 Toggle
    toggleMenu(i) {
      event.stopPropagation();

      if (i === this.activeIndex) {
        this.activeIndex = -1;
        return;
      }
      this.activeIndex = i;
    },
    // 방명록 메뉴 닫기
    closeMenu(e) {
      if (isNotEmpty(this.$refs.guestbookMenuBtn) && !this.$refs.guestbookMenuBtn.includes(e.target)) {
        this.activeIndex = -1;
      }
    },
    // 방명록 무한 스크롤
    scroll() {
      const { scrollY } = window;
      const { clientHeight, scrollHeight } = document.documentElement;
      const bottomOfPage = (clientHeight + scrollY + 100) >= scrollHeight;
      
      if (bottomOfPage && !this.isScrolled) {
        if (this.isLastPage) return;

        setTimeout(() => {
          this.isScrolled = true; // 스크롤 중복 실행 방지
          this.page++;
          this.listGuestbook();
        }, 100);
      }
    },
    // 방명록 수정/삭제 Modal
    openModal(type, guestbook) {
      if ('update' === type) {
        this.$modal.show({
          component: AppUpdateGuestbookModal,
          bind: { guestbook },
        });
      }
      if ('remove' === type) {
        this.$modal.show({
          component: AppRemoveGuestbookModal,
          bind: { id: guestbook.id },
        });
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
