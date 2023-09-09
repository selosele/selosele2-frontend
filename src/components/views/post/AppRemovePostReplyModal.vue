<template>
  <ui-modal :title="'포스트 댓글 삭제'" :name="this.$options.name" class="post-reply-modal__wrapper">
    <ui-form :name="'removePostReplyForm'" @onsubmit="onSubmit">
      <ui-hidden-field :name="'id'" id="removePostReplyId" :value="reply.id" />
      <ui-hidden-field :name="'parentId'" id="removePostReplyParentId" :value="reply.parentId" />
      <ui-hidden-field :name="'author'" id="removePostReplyAuthor" :value="reply.author" />
      <ui-hidden-field :name="'crudType'" id="removePostReplyCrudType" :value="'E01004'" />

      <div class="post-reply__write__input-box no-width">
        <ui-text-field :type="'password'"
                       :name="'authorPw'"
                       :id="'removePostReplyPw'"
                       :clazz="['post-reply__input']"
                       :title="'비밀번호 입력'"
                       :placeholder="'비밀번호 입력'"
                       :disabled="isLogin"
                       :rules="!isLogin ? 'required|min:8|max:15' : ''">
        </ui-text-field>

        <div class="post-reply__write__btns">
          <ui-button :type="'submit'"
                     :color="'primary'"
                     :class="'post-reply__btn post-reply__btn--write'">삭제
          </ui-button>
        </div>
      </div>
    </ui-form>
  </ui-modal>
</template>

<script>
import { messageUtil } from '@/utils';

export default {
  name: 'app-remove-post-reply-modal',
  props: {
    /** 포스트 댓글 */
    reply: Object,
  },
  methods: {
    /** 포스트 댓글 삭제 */
    async onSubmit(values) {
      const confirm = await messageUtil.confirmSuccess('삭제하시겠습니까?');
      if (!confirm) return;
      
      this.$http.post('/postreply/remove', values)
      .then(resp => {
        messageUtil.toastSuccess('삭제되었습니다.');
        
        this.$modal.hide(this.$options.name);
        this.$store.dispatch('Post/FETCH_REMOVED_POST_REPLY', values);
      });
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/views/post-reply-modal.scss';
</style>