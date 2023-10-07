<template>
  <app-content-wrapper>
    <div class="guestbook__wrapper">
      <ui-form :class="'guestbook__write-frm'" :name="'addGuestbookForm'" @onsubmit="onSubmit">
        <div class="guestbook__write">
          <ui-textarea
            :name="'cont'"
            :id="'addGuestbookCont'"
            :clazz="['guestbook__textarea']"
            :title="'방명록 내용 입력'"
            :placeholder="'하고싶은 말을 남겨주세요.'"
            :cols="'30'"
            :rows="'4'"
            :rules="'required|max:1000'"
          />

          <div class="guestbook__write__inputs">
            <div class="guestbook__write__input-box">
              <label for="addGuestbookAuthor" class="guestbook__write__label">닉네임</label>
              <ui-text-field
                :name="'author'"
                :id="'addGuestbookAuthor'"
                :clazz="['guestbook__input']"
                :rules="'required|max:20'"
                :readonly="isAdmin"
                :value="isAdmin ? adminNickName : ''"
              />
            </div>

            <div class="guestbook__write__input-box">
              <label for="addGuestbookPw" class="guestbook__write__label">비밀번호</label>
              <ui-text-field
                :type="'password'"
                :name="'authorPw'"
                :id="'addGuestbookPw'"
                :clazz="['guestbook__input']"
                :rules="'required|min:8|max:15'"
              />
            </div>

            <div class="guestbook__write__btns">
              <ui-button
                :type="'submit'"
                :color="'primary'"
                :text="'저장'"
                :class="'guestbook__btn guestbook__btn--write'"
              />
            </div>
          </div>
        </div>
      </ui-form>

      <ul class="guestbook__depth1">
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
            <ui-icon-button
              :icon="'xi-message'"
              :title="`댓글 ${guestbook.guestbookReply.length}개 펼쳐보기`"
              :class="'guestbook__btn guestbook__btn--reply-open'"
              @click="toggleReplyList(i)">

              <span class="reply-cnt">
                {{ 99 < guestbook.guestbookReply.length ? '99+' : guestbook.guestbookReply.length }}
              </span>
            </ui-icon-button>
  
            <app-guestbook-reply-list
              v-if="i === replyActiveIndex"
              :key="guestbook.guestbookReply"
              :list="guestbook.guestbookReply"
              :parentId="guestbook.id"
              @updateReply="onUpdateReply"
            />
          </template>

          <app-add-guestbook-reply
            :idx="i"
            :parentId="guestbook.id"
            @addReply="onAddReply"
          />

          <div class="guestbook__toggle">
            <ui-icon-button
              :icon="'xi-cog'"
              :text="'방명록 수정/삭제'"
              :title="'방명록 수정/삭제'"
              :class="'guestbook__btn--toggle'"
              @click.stop="toggleMenu(i)"
            />

            <div class="guestbook__toggle-list" v-if="i === activeIndex">
              <ul>
                <li>
                  <ui-icon-button
                    :icon="'xi-pen-o'"
                    :text="'방명록 수정'"
                    :showText="true"
                    :class="'guestbook__btn--edit1'" 
                    ref="guestbookMenuBtn" 
                    @click="openModal('E01003', guestbook, isAdmin)"
                  />
                </li>
                <li>
                  <ui-icon-button
                    :icon="'xi-trash-o'"
                    :text="'방명록 삭제'"
                    :showText="true"
                    :class="'guestbook__btn--delete1'"
                    ref="guestbookMenuBtn" 
                    @click="openModal('E01004', guestbook, isAdmin)"
                  />
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
import AppAddGuestbookReply from '@/components/views/guestbook/AppAddGuestbookReply.vue';
import AppGuestbookReplyList from '@/components/views/guestbook/AppGuestbookReplyList.vue';
import AppUpdateGuestbookModal from '@/components/views/guestbook/AppUpdateGuestbookModal.vue';
import AppRemoveGuestbookModal from '@/components/views/guestbook/AppRemoveGuestbookModal.vue';

export default {
  name: 'AppGuestbook',
  components: {
    AppAddGuestbookReply,
    AppGuestbookReplyList,
  },
  data() {
    return {
      page: 1,
      pageSize: 6,
      listCnt: 0,
      guestbookList: [],
      activeIndex: -1,
      replyActiveIndex: -1,
      isScrolled: false,
      isLastPage: false,
      adminNickName: '',
    }
  },
  async created() {
    // 페이지 타이틀 세팅
    this.$store.dispatch('Breadcrumb/FETCH_PAGE_TITLE', '방명록');

    await this.setCode();
    await this.listGuestbook();
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
      .then(resp => {
        if (0 === resp.data[0].length) {
          this.isScrolled = false;
          return;
        }

        resp.data[0].forEach(a => {
          const guestbookData = this.setData(a);
          this.guestbookList.push(guestbookData);

          a.guestbookReply.forEach(b => {
            this.setData(b);
          });
        });

        this.listCnt = resp.data[1];

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
    openModal(crudType, guestbook, isAdmin) {
      if (!isAdmin && 'Y' === guestbook.adminYn) {
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
    /** 방명록 등록 */
    async onSubmit(values) {
      const confirm = await messageUtil.confirmSuccess('저장하시겠습니까?');
      if (!confirm) return;

      this.$http.post('/guestbook', values)
      .then(resp => {
        const guestbook = { ...resp.data };
        
        guestbook.regDate = this.$moment(guestbook.regDate).format('YYYY-MM-DD HH:mm:ss');
        guestbook.guestbookReply = [];

        this.guestbookList.push(guestbook);
        this.guestbookList = this.guestbookList.sort((a,b) => b.id - a.id);

        messageUtil.toastSuccess('저장되었습니다.');
      });
    },
    /** 방명록 댓글 등록 시 */
    onAddReply(value) {
      this.guestbookList.forEach(guestbook => {
        if (guestbook.id === value.parentId) {
          const data = this.setData(value);
          guestbook.guestbookReply.push(data);
        }
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
    /** 공통코드 세팅 */
    async setCode() {
      this.adminNickName = this.$store.state.Guestbook.code.find(d => d.id === 'F01001')?.nm;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/views/guestbook.scss';
</style>
