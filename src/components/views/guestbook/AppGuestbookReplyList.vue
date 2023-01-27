<template>
  <div class="guestbook__depth2__wrapper">
    <ul class="guestbook__depth2__list">
      <li class="guestbook__depth2__item" v-for="(reply,i) in list.slice(0, pageSize)" :key="i">
        <p class="guestbook__reply__cont" v-html="reply.cont"></p>
  
        <div class="guestbook__cont__info depth2">
          <span class="guestbook__author">
            <strong>
              <i class="xi-user-o" aria-hidden="true"></i> 글쓴이 : 
            </strong>

            <span :class="{ 'font--bold': 'Y' === reply.adminYn }">{{ reply.author }}</span>
          </span>
  
          <span class="guestbook__reg-date">
            <strong>
              <i class="xi-time-o" aria-hidden="true"></i> 등록일 : 
            </strong> {{ reply.regDate }}
          </span>
  
          <span class="guestbook__mod-date" v-if="reply.modDate">
            <strong>
              <i class="xi-time-o" aria-hidden="true"></i> 수정일 : 
            </strong> {{ reply.modDate }}
          </span>
        </div>
  
        <div class="guestbook__reply__toggle">
          <ui-icon-button :type="'button'"
                          :icon="'xi-cog'"
                          :text="'방명록 댓글 수정/삭제'"
                          :class="'guestbook__reply__btn--toggle'"
                          @click.stop="toggleMenu(i)">
          </ui-icon-button>
  
          <div class="guestbook__reply__toggle-list"  v-show="i === activeIndex">
            <ul>
              <li>
                <button type="button"
                        class="guestbook__btn--edit2"
                        ref="guestbookMenuBtn"
                        @click="openModal('update', reply)">
                  <i class="xi-pen-o" aria-hidden="true"></i> 댓글 수정
                </button>
              </li>
              <li>
                <button type="button"
                        class="guestbook__btn--delete2" 
                        ref="guestbookMenuBtn" 
                        @click="openModal('remove', reply)">
                  <i class="xi-trash-o" aria-hidden="true"></i> 댓글 삭제
                </button>
              </li>
            </ul>
          </div>
        </div>
      </li>
    </ul>

    <ui-icon-button :type="'button'"
                    :icon="'xi-ellipsis-h'"
                    :text="'댓글 더보기'"
                    :class="'guestbook__reply-more'"
                    @click="more"
                    v-if="list.length > pageSize">
    </ui-icon-button>
  </div>
</template>

<script>
import AppUpdateGuestbookReplyModal from '@/components/views/guestbook/AppUpdateGuestbookReplyModal.vue';
import AppRemoveGuestbookReplyModal from '@/components/views/guestbook/AppRemoveGuestbookReplyModal.vue';
import { isNotEmpty } from '@/utils';

export default {
  name: 'app-guestbook-reply-list',
  components: {
    AppUpdateGuestbookReplyModal,
    AppRemoveGuestbookReplyModal,
  },
  props: {
    /** 방명록 댓글 목록 */
    list: Array,
    /** 상위 방명록 ID */
    parentId: Number,
  },
  watch: {
    /** 방명록 댓글이 수정되고 Modal이 close됐을 때 실행됨 */
    '$store.state.Guestbook.updatedGuestbookReply'(updatedGuestbookReply) {
      if (0 < Object.values(updatedGuestbookReply).length) {
        const { id, author, cont, modDate } = updatedGuestbookReply;
        const foundGuestbookReply = this.list.find(d => d.id == id);

        foundGuestbookReply.author = author;
        foundGuestbookReply.cont = cont;
        foundGuestbookReply.modDate = this.$moment(modDate).format('YYYY-MM-DD HH:mm:ss');

        this.$store.dispatch('Guestbook/FETCH_UPDATED_GUESTBOOK_REPLY', {});
        this.$emit('updateReply', foundGuestbookReply);
      }
    },
    /** 방명록이 삭제되고 Modal이 close됐을 때 실행됨 */
    '$store.state.Guestbook.removedGuestbookReply'(removedGuestbookReply) {
      if (0 < Object.values(removedGuestbookReply).length) {
        const { id } = removedGuestbookReply;
        const foundIdx = this.list.findIndex(d => d.id == id);
        const newList = this.list;

        newList.splice(foundIdx, 1);
        this.$store.dispatch('Guestbook/FETCH_REMOVED_GUESTBOOK_REPLY', {});
      }
    },
  },
  data() {
    return {
      pageSize: 3,
      activeIndex: -1,
    }
  },
  mounted() {
    document.addEventListener('click', this.closeMenu);
  },
  unmounted() {
    document.removeEventListener('click', this.closeMenu);
  },
  methods: {
    /** 방명록 댓글 더보기 */
    more() {
      this.pageSize += 3;
    },
    /** 방명록 댓글 메뉴 toggle */
    toggleMenu(i) {
      if (i === this.activeIndex) {
        this.activeIndex = -1;
        return;
      }
      this.activeIndex = i;
    },
    /** 방명록 댓글 메뉴 닫기 */
    closeMenu(e) {
      if (isNotEmpty(this.$refs['guestbookMenuBtn']) && !this.$refs['guestbookMenuBtn'].includes(e.target)) {
        this.activeIndex = -1;
      }
    },
    /** 방명록 수정/삭제 Modal */
    openModal(type, guestbookReply) {
      if ('update' === type) {
        this.$modal.show({
          component: AppUpdateGuestbookReplyModal,
          bind: { guestbookReply },
        });
      } else if ('remove' === type) {
        this.$modal.show({
          component: AppRemoveGuestbookReplyModal,
          bind: { id: guestbookReply.id },
        });
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/guestbook-reply-list.scss';
</style>