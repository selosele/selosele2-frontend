<template>
  <div>
    <strong class="post__reply__count">댓글 <span>{{ replyList.length }}</span></strong>
  
    <ui-icon-button :type="'button'"
                    :color="'primary'"
                    :icon="'xi-refresh'"
                    :text="'댓글 목록 새로고침'"
                    :title="'댓글 목록 새로고침'"
                    :class="'post__reply__btn--refresh'"
                    @click="refreshList">
    </ui-icon-button>

    <ul class="post__reply__depth1">
      <li v-for="(reply,i) in replyList" :key="i"
          :data-depth="reply.depth"
          :class="{
            'post__reply__list': true,
            'post__reply__list--deleted': 'Y' === reply.delYn,
            'post__reply__list--admin': 'Y' === reply.adminYn,
          }"
      >
        <p class="post__reply__cont">{{ reply.cont }}</p>
    
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
    
          <div class="post__reply__info-inner" v-if="'N' === reply.delYn">
            <ui-icon-button :type="'button'"
                            :color="'secondary'"
                            :icon="'xi-pen'"
                            :text="'댓글 남기기'"
                            :title="'댓글 남기기'"
                            :class="'post__reply__btn--show'">
            </ui-icon-button>
          </div>
        </div>
    
        <div class="post__reply__write-depth">
          <div class="post__reply__write-to">
            <ui-textarea :name="'cont'"
                         :title="'댓글 내용 입력'"
                         :placeholder="'하고싶은 말을 남겨주세요.'"
                         :cols="'30'"
                         :rows="'4'">
            </ui-textarea>
    
            <div class="post__reply__write__inputs">
              <div class="post__reply__write__inputs-inner">
                <ui-text-field :type="'text'"
                               :name="'author'"
                               :id="`depthAuthor${reply.id}`"
                               :class="'post__reply__input'"
                               :label="'닉네임'"
                               :value="'관리자'"
                               :readonly="true">
                </ui-text-field>
              </div>

              <ui-button :type="'button'"
                         :class="'post__reply__btn--write post__reply__btn--write-depth'">등록
              </ui-button>
            </div>
          </div>
        </div>
    
        <div class="post__reply__toggle" v-if="'N' === reply.delYn">
          <ui-icon-button :type="'button'"
                          :icon="'xi-cog'"
                          :text="'포스트 댓글 수정/삭제'"
                          :title="'포스트 댓글 수정/삭제'"
                          :class="'post__reply__btn--toggle'">
          </ui-icon-button>
    
          <div class="post__reply__toggle-list">
            <ul>
              <li>
                <button type="button" class="post__reply__btn--edit">
                  <i class="xi-pen-o" aria-hidden="true"></i> 댓글 수정
                </button>
              </li>
              <li>
                <button type="button" class="post__reply__btn--delete">
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
import { isEmpty } from '@/utils';

export default {
  name: 'app-post-reply-list',
  props: {
    /** 포스트 댓글 목록 */
    replyList: Array,
  },
  data() {
    return {
      isEmpty,
    }
  },
  methods: {
    /** 댓글 목록 새로고침 */
    refreshList() {
      this.$emit('refreshList');
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/post-reply-list.scss';
</style>