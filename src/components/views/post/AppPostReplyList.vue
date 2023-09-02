<template>
  <div class="post__reply__list__wrapper">
    <div class="d-flex-w flex--between mb--10">
      <div>
        <strong class="post__reply__count">댓글 <span>{{ realReplyList.length }}</span></strong>
        <ui-icon-button :type="'button'"
                        :color="'primary'"
                        :icon="'xi-refresh'"
                        :text="'댓글 목록 새로고침'"
                        :title="'댓글 목록 새로고침'"
                        :class="'post__reply__btn--refresh'"
                        @click="refreshList">
        </ui-icon-button>
      </div>

      <div>
        <ui-button :type="'button'"
                   :color="'secondary'"
                   :routerLink="'/admin/post-reply'"
                   v-if="isLogin">댓글 관리
        </ui-button>
      </div>
    </div>
  
    <ul class="post__reply__depth1">
      <li v-for="(reply,i) in replyList" :key="i"
          :data-depth="reply.depth"
          :class="{
            'post__reply__list': true,
            'post__reply__list--deleted': 'Y' === reply.delYn,
            'post__reply__list--admin': 'Y' === reply.adminYn,
          }"
          :id="`postReply${reply.id}`"
          :ref="`postReply${reply.id}`"
      >
        <p class="post__reply__cont" v-html="reply.cont"></p>
    
        <div class="post__reply__info">
          <p class="post__reply__author">
            <i class="xi-user-o" aria-hidden="true"></i>
            <span class="post__reply__author-to">{{ reply.author }}</span>
          </p>
    
          <p class="post__reply__reg-date">
            <strong>
              <i class="xi-time-o" aria-hidden="true"></i> 등록일 :
            </strong>
            <span>{{ reply.regDate }}</span>
          </p>
    
          <div class="post__reply__info-inner" v-if="'N' === reply.delYn && 1 === reply.depth">
            <ui-icon-button :type="'button'"
                            :color="'secondary'"
                            :icon="'xi-pen'"
                            :text="'댓글 남기기'"
                            :title="'댓글 남기기'"
                            :class="'post__reply__btn--show'"
                            @click="toggleDepth(i)">
            </ui-icon-button>
          </div>
        </div>
    
        <app-add-post-reply-depth :key="reply"
                                  :reply="reply"
                                  @refreshList="refreshList"
                                  v-if="i === depthActiveIndex">
        </app-add-post-reply-depth>
    
        <div class="post__reply__toggle" v-if="'N' === reply.delYn">
          <ui-icon-button :type="'button'"
                          :icon="'xi-cog'"
                          :text="'포스트 댓글 수정/삭제'"
                          :title="'포스트 댓글 수정/삭제'"
                          :class="'post__reply__btn--toggle'"
                          @click.stop="toggleMenu(i)">
          </ui-icon-button>
    
          <div class="post__reply__toggle-list" v-if="i === menuActiveIndex">
            <ul>
              <li>
                <button type="button"
                        class="post__reply__btn--edit"
                        ref="postReplyMenuBtn"
                        @click="openModal('E01003', reply, isLogin)">
                  <i class="xi-pen-o" aria-hidden="true"></i> 댓글 수정
                </button>
              </li>
              <li>
                <button type="button"
                        class="post__reply__btn--delete"
                        ref="postReplyMenuBtn"
                        @click="openModal('E01004', reply, isLogin)">
                  <i class="xi-trash-o" aria-hidden="true"></i> 댓글 삭제
                </button>
              </li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { isArray, isEmpty, isNotEmpty, messageUtil } from '@/utils';
import AppUpdatePostReplyModal from './AppUpdatePostReplyModal.vue';
import AppRemovePostReplyModal from './AppRemovePostReplyModal.vue';
import AppAddPostReplyDepth from './AppAddPostReplyDepth.vue';

export default {
  name: 'app-post-reply-list',
  components: {
    AppUpdatePostReplyModal,
    AppRemovePostReplyModal,
    AppAddPostReplyDepth,
  },
  props: {
    /** 포스트 댓글 목록 */
    replyList: Array,
  },
  watch: {
    // 포스트 댓글이 수정되고 Modal이 close됐을 때 실행됨
    '$store.state.Post.updatedPostReply'(updatedPostReply) {
      if (0 < Object.values(updatedPostReply).length) {
        this.$store.dispatch('Post/FETCH_UPDATED_POST_REPLY', {});
        this.$emit('updateReply', updatedPostReply);
      }
    },
    // 포스트 댓글이 삭제되고 Modal이 close됐을 때 실행됨
    '$store.state.Post.removedPostReply'(removedPostReply) {
      if (0 < Object.values(removedPostReply).length) {
        this.$store.dispatch('Post/FETCH_REMOVED_POST_REPLY', {});
        this.$emit('removeReply');
      }
    },
  },
  data() {
    return {
      /** 삭제되지 않은 포스트 댓글 목록 */
      realReplyList: [],
      /** 활성화된 포스트 댓글 메뉴 index */
      menuActiveIndex: -1,
      /** 활성화된 포스트 댓글 작성 폼 index */
      depthActiveIndex: -1,
      isEmpty,
    }
  },
  created() {
    if (isArray(this.replyList)) {
      this.realReplyList = this.replyList.filter(d => d.delYn === 'N');
    }
  },
  mounted() {
    window.document.addEventListener('click', this.closeMenu);

    this.scrollToReply();
  },
  unmounted() {
    window.document.removeEventListener('click', this.closeMenu);
  },
  methods: {
    /** 포스트 댓글 목록 새로고침 */
    refreshList() {
      this.$emit('refreshList');
    },
    /** 포스트 댓글 작성 폼 toggle */
    toggleDepth(i) {
      if (i === this.depthActiveIndex) {
        this.depthActiveIndex = -1;
        return;
      }
      this.depthActiveIndex = i;
    },
    /** 포스트 댓글 메뉴 toggle */
    toggleMenu(i) {
      if (i === this.menuActiveIndex) {
        this.menuActiveIndex = -1;
        return;
      }
      this.menuActiveIndex = i;
    },
    /** 포스트 댓글 메뉴 닫기 */
    closeMenu(e) {
      if (isNotEmpty(this.$refs['postReplyMenuBtn']) && !this.$refs['postReplyMenuBtn'].includes(e.target)) {
        this.menuActiveIndex = -1;
      }
    },
    /** 포스트 댓글 수정/삭제 Modal */
    openModal(crudType, reply, isLogin) {
      if (!isLogin && 'Y' === reply.adminYn) {
        messageUtil.toastError('수정/삭제 권한이 없습니다.');
        return;
      }

      if ('E01003' === crudType) {
        this.$modal.show({
          component: AppUpdatePostReplyModal,
          bind: { reply },
        });
      } else if ('E01004' === crudType) {
        this.$modal.show({
          component: AppRemovePostReplyModal,
          bind: { reply },
        });
      }
    },
    /** 포스트 댓글로 스크롤 이동 */
    scrollToReply() {
      if (isNotEmpty(window.location.hash)) {
        const replyEl = window.document.getElementById(window.location.hash.replace('#', ''));
        
        replyEl?.scrollIntoView();
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/post-reply-list.scss';
</style>