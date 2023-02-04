<template>
  <ui-modal :title="'포스트 댓글 수정'" :name="this.$options.name">
    <ui-form :name="'updatePostReplyForm'" @onsubmit="onSubmit">
      <ui-hidden-field :name="'id'" id="updatePostReplyId" :value="reply.id">
      </ui-hidden-field>

      <ui-hidden-field :name="'parentId'" id="updatePostReplyParentId" :value="reply.parentId">
      </ui-hidden-field>

      <ui-hidden-field :name="'crudType'" id="updatePostReplyCrudType" :value="'E01003'">
      </ui-hidden-field>

      <ui-textarea :name="'cont'"
                   :id="'updatePostReplyCont'"
                   :title="'포스트 내용 입력'"
                   :placeholder="'하고싶은 말을 남겨주세요.'"
                   :cols="'30'"
                   :rows="'4'"
                   :resize="'vertical'"
                   :rules="'required'"
                   :value="replacedCont">
      </ui-textarea>

      <div class="d-flex-w gap--15 mt--20">
        <label for="updatePostReplyAuthor" class="pt--5">닉네임</label>
        <ui-text-field :type="'text'"
                       :name="'author'"
                       :id="'updatePostReplyAuthor'"
                       :rules="'required|max:20'"
                       :readonly="'Y' === reply.adminYn"
                       :value="reply.author">
        </ui-text-field>

        <label for="updatePostReplyPw" class="pt--5">비밀번호</label>
        <ui-text-field :type="'password'"
                       :name="'authorPw'"
                       :id="'updatePostReplyPw'"
                       :rules="'required|min:8|max:15'">
        </ui-text-field>

        <ui-button :type="'submit'"
                   :color="'primary'">수정
        </ui-button>
      </div>
    </ui-form>
  </ui-modal>
</template>

<script>
import { messageUtil } from '@/utils';

export default {
  name: 'app-update-post-reply-modal',
  props: {
    /** 포스트 댓글 */
    reply: Object,
  },
  data() {
    return {
      /** br태그가 치환된 포스트 댓글 내용 */
      replacedCont: '',
    }
  },
  created() {
    this.replacedCont = this.reply.cont.replaceAll('<br>', '\r\n');
  },
  methods: {
    /** 포스트 댓글 수정 */
    async onSubmit(values) {
      const confirm = await messageUtil.confirmSuccess('저장하시겠습니까?');
      if (!confirm) return;
      
      this.$http.put('/postReply', values)
      .then(res => {
        messageUtil.toastSuccess('저장되었습니다.');

        this.$modal.hide(this.$options.name);
        this.$store.dispatch('Post/FETCH_UPDATED_POST_REPLY', res.data);
      });
    },
  },
}
</script>

<style lang="scss" scoped>

</style>