<template>
  <app-content-wrapper :pageTitle="pageTitle">
    <div class="guestbook__wrapper">
      <ui-form :class="'guestbook__write-frm'" :name="'addGuestbookForm'" @onsubmit="onSubmit">
        <div class="guestbook__write">
          <ui-textarea :name="'cont'"
                       :id="'addGuestbookCont'"
                       :class="'guestbook__textarea'"
                       :title="'방명록 내용 입력'"
                       :placeholder="'하고싶은 말을 남겨주세요.'"
                       :cols="'30'"
                       :rows="'4'"
                       :rules="'required|max:1000'">
          </ui-textarea>

          <div class="guestbook__write__inputs">
            <div class="guestbook__write__input-box">
              <label for="addGuestbookAuthor" class="pt--5">닉네임</label>
              <ui-text-field :type="'text'"
                             :name="'author'"
                             :id="'addGuestbookAuthor'"
                             :class="'guestbook__input'"
                             :rules="'required|max:20'"
                             :readonly="isLogin"
                             :value="isLogin ? '관리자' : ''">
              </ui-text-field>
            </div>

            <div class="guestbook__write__input-box">
              <label for="addGuestbookPw" class="pt--5">비밀번호</label>
              <ui-text-field :type="'password'"
                             :name="'authorPw'"
                             :id="'addGuestbookPw'"
                             :class="'guestbook__input'"
                             :rules="'required|min:8|max:15'">
              </ui-text-field>
            </div>

            <div class="guestbook__write__btns d-flex-w gap--10">
              <ui-button :type="'reset'"
                         :color="'secondary'"
                         :class="'guestbook__btn guestbook__btn--reset'">다시작성
              </ui-button>

              <ui-button :type="'submit'"
                         :color="'primary'"
                         :class="'guestbook__btn guestbook__btn--write'">저장
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
        <li class="guestbook__depth1__list" :id="`guestbook${guestbook.id}`" v-for="(guestbook,i) in guestbookList" :key="guestbook">
          <p class="guestbook__cont" v-html="guestbook.cont"></p>

          <div class="guestbook__cont__info depth1">
            <span class="guestbook__author">
              <strong>
                <i class="xi-user-o" aria-hidden="true"></i> 글쓴이 :
              </strong>
              <span :class="{ 'font--bold': 'Y' === guestbook.adminYn }">{{ guestbook.author }}</span>
            </span>

            <span class="guestbook__reg-date">
              <strong>
                <i class="xi-time-o" aria-hidden="true"></i> 등록일 :
              </strong>
              {{ guestbook.regDate }}
            </span>

            <span class="guestbook__mod-date" v-if="guestbook.modDate">
              <strong>
                <i class="xi-time-o" aria-hidden="true"></i> 수정일 :
              </strong>
              {{ guestbook.modDate }}
            </span>
          </div>

          <template v-if="0 < guestbook.guestbookReply.length">
            <ui-icon-button :type="'button'"
                            :icon="'xi-message'"
                            :class="'guestbook__btn guestbook__btn--reply-open'"
                            :title="`댓글 ${guestbook.guestbookReply.length}개 펼쳐보기`"
                            @click="toggleReplyList(i)">
              <span class="reply-cnt">{{ 99 < guestbook.guestbookReply.length ? '99+' : guestbook.guestbookReply.length }}</span>
            </ui-icon-button>
  
            <app-guestbook-reply-list v-if="i === replyActiveIndex"
                                      :key="guestbook.guestbookReply"
                                      :list="guestbook.guestbookReply"
                                      :parentId="guestbook.id"
                                      @updateReply="onUpdateReply">
            </app-guestbook-reply-list>
          </template>

          <app-add-guestbook-reply :idx="i"
                                   :parentId="guestbook.id"
                                   @addReply="onAddReply">
          </app-add-guestbook-reply>

          <div class="guestbook__toggle">
            <ui-icon-button :type="'button'"
                            :icon="'xi-cog'"
                            :text="'방명록 수정/삭제'"
                            :title="'방명록 수정/삭제'"
                            :class="'guestbook__btn--toggle'"
                            @click.stop="toggleMenu(i)">
            </ui-icon-button>

            <div class="guestbook__toggle-list" v-if="i === activeIndex">
              <ul>
                <li>
                  <button type="button" 
                          class="guestbook__btn--edit1" 
                          ref="guestbookMenuBtn" 
                          @click="openModal('E01003', guestbook, isLogin)">
                    <i class="xi-pen-o" aria-hidden="true"></i> 방명록 수정
                  </button>
                </li>
                <li>
                  <button type="button" 
                          class="guestbook__btn--delete1"
                          ref="guestbookMenuBtn" 
                          @click="openModal('E01004', guestbook, isLogin)">
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
import { messageUtil, isNotEmpty } from '@/utils';
import { breadcrumbService } from '@/services/breadcrumb/breadcrumbService';
import AppAddGuestbookReply from '@/components/views/guestbook/AppAddGuestbookReply.vue';
import AppGuestbookReplyList from '@/components/views/guestbook/AppGuestbookReplyList.vue';
import AppUpdateGuestbookModal from '@/components/views/guestbook/AppUpdateGuestbookModal.vue';
import AppRemoveGuestbookModal from '@/components/views/guestbook/AppRemoveGuestbookModal.vue';

export default {
  name: 'app-guestbook',
  components: {
    AppAddGuestbookReply,
    AppGuestbookReplyList,
  },
  data() {
    return {
      pageTitle: '방명록',
      page: 1,
      pageSize: 6,
      listCnt: 0,
      guestbookList: [],
      activeIndex: -1,
      replyActiveIndex: -1,
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
    window.addEventListener('scroll', this.onScroll);
    document.addEventListener('click', this.closeMenu);
  },
  unmounted() {
    window.removeEventListener('scroll', this.onScroll);
    document.removeEventListener('click', this.closeMenu);
  },
  watch: {
    // 방명록이 수정되고 Modal이 close됐을 때 실행됨
    '$store.state.Guestbook.updatedGuestbook'(updatedGuestbook) {
      if (0 < Object.values(updatedGuestbook).length) {
        const { id, author, cont, modDate } = updatedGuestbook;
        const foundGuestbook = this.guestbookList.find(d => d.id == id);

        foundGuestbook.author = author;
        foundGuestbook.cont = cont;
        foundGuestbook.cont = this.setData(foundGuestbook).cont;
        foundGuestbook.modDate = this.$moment(modDate).format('YYYY-MM-DD HH:mm:ss');
        
        this.$store.dispatch('Guestbook/FETCH_UPDATED_GUESTBOOK', {});
      }
    },
    // 방명록이 삭제되고 Modal이 close됐을 때 실행됨
    '$store.state.Guestbook.removedGuestbook'(removedGuestbook) {
      if (0 < Object.values(removedGuestbook).length) {
        const { id } = removedGuestbook;
        const foundIdx = this.guestbookList.findIndex(d => d.id == id);

        this.guestbookList.splice(foundIdx, 1);
        this.$store.dispatch('Guestbook/FETCH_REMOVED_GUESTBOOK', {});
      }
    },
  },
  methods: {
    /** 방명록 목록 조회 */
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

        res.data[0].map(a => {
          const guestbookData = this.setData(a);
          this.guestbookList.push(guestbookData);

          a.guestbookReply.map(b => {
            this.setData(b);
          });
        });

        this.listCnt = res.data[1];

        if (this.listCnt === this.guestbookList.length) {
          this.isLastPage = true;
        }
        
        this.isScrolled = false;
      });
    },
    /** 방명록 메뉴 toggle */
    toggleMenu(i) {
      if (i === this.activeIndex) {
        this.activeIndex = -1;
        return;
      }
      this.activeIndex = i;
    },
    /** 방명록 메뉴 닫기 */
    closeMenu(e) {
      if (isNotEmpty(this.$refs['guestbookMenuBtn']) && !this.$refs['guestbookMenuBtn'].includes(e.target)) {
        this.activeIndex = -1;
      }
    },
    /** 방명록 무한 스크롤 */
    onScroll() {
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
    /** 방명록 수정/삭제 Modal */
    openModal(crudType, guestbook, isLogin) {
      if (!isLogin && 'Y' === guestbook.adminYn) {
        messageUtil.toastError('수정/삭제 권한이 없습니다.');
        return;
      }

      if ('E01003' === crudType) {
        this.$modal.show({
          component: AppUpdateGuestbookModal,
          bind: { guestbook },
        });
      } else if ('E01004' === crudType) {
        this.$modal.show({
          component: AppRemoveGuestbookModal,
          bind: { id: guestbook.id },
        });
      }
    },
    /** 방명록 댓글 펼치기 */
    toggleReplyList(idx) {
      if (idx === this.replyActiveIndex) {
        this.replyActiveIndex = -1;
        return;
      }

      this.replyActiveIndex = idx;
    },
    /** 방명록 추가 */
    async onSubmit(values) {
      const confirm = await messageUtil.confirmSuccess('저장하시겠습니까?');
      if (!confirm) return;

      this.$http.post('/guestbook', values)
      .then(res => {
        const guestbook = { ...res.data };
        
        guestbook.regDate = this.$moment(guestbook.regDate).format('YYYY-MM-DD HH:mm:ss');
        guestbook.guestbookReply = [];

        this.guestbookList.push(guestbook);
        this.guestbookList = this.guestbookList.sort((a,b) => b.id - a.id);

        messageUtil.toastSuccess('저장되었습니다.');
      });
    },
    /** 방명록 댓글 추가 시 */
    async onAddReply(value) {
      this.guestbookList = this.guestbookList.map(a => {
        if (a.id === value.parentId) {
          const data = this.setData(value);
          a.guestbookReply.push(data);
        }

        return a;
      });
    },
    /** 방명록 댓글 수정 시 */
    onUpdateReply(value) {
      value.cont = this.setData(value).cont;
    },
    /** 방명록, 방명록 댓글 데이타 가공 */
    setData(data) {
      data.cont = data.cont.replace(/\r\n|\n/g, '<br>');
      data.cont = data.cont.replaceAll('\\r\\n', '<br>'); // AS-IS 데이타의 경우 \r\n 문자가 DB에 직접 들어감
      data.regDate = this.$moment(data.regDate).format('YYYY-MM-DD HH:mm:ss');

      if (isNotEmpty(data.modDate)) {
        data.modDate = this.$moment(data.modDate).format('YYYY-MM-DD HH:mm:ss');
      }

      return data;
    },
    /** 데이타 로딩 */
    dataLoading() {

      // 데이타가 없어도 로딩이 완료되어야 함
      this.dataLoaded = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/views/guestbook.scss';
</style>
