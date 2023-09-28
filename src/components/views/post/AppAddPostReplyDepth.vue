<template>
  <div class="post__reply__write-depth">
    <div class="post__reply__write-to">
      <ui-form :name="'addPostReplyDepthForm'" :class="'post__reply__list-frm'" @onsubmit="onSubmit">
        <ui-hidden-field :name="'parentId'" :id="'addPostReplyParentId'" :value="reply.parentId" />
        <ui-hidden-field :name="'parentReplyId'" :id="'addPostReplyParentReplyId'" :value="reply.id" />
        <ui-hidden-field :name="'title'" :id="'addPostReplyTitle'" :value="''" />
        <ui-hidden-field :name="'group'" :id="'addPostReplyGroup'" :value="reply.id" />
        <ui-hidden-field :name="'depth'" :id="'addPostReplyDepth'" :value="reply.depth + 1" />
        <ui-hidden-field :name="'crudType'" :id="'addPostReplyCrudType'" :value="'E01001'" />

        <ui-textarea
          :name="'cont'"
          :title="'댓글 내용 입력'"
          :placeholder="'하고싶은 말을 남겨주세요.'"
          :cols="'30'"
          :rows="'4'"
          :rules="'required|max:1000'"
        />
      
        <div class="post__reply__write__inputs">
          <div class="post__reply__write__input-box">
            <label :for="`addPostReplyAuthor${reply.id}`" class="post__reply__write__label">닉네임</label>
            <ui-text-field
              :name="'author'"
              :id="`addPostReplyAuthor${reply.id}`"
              :clazz="['post__reply__input']"
              :rules="'required|max:20'"
              :tooltip="true"
              :readonly="isLogin"
              :value="isLogin ? adminNickName : ''"
            />
          </div>

          <div class="post__reply__write__input-box">
            <label :for="`addPostReplyAuthorPw${reply.id}`" class="post__reply__write__label">비밀번호</label>
            <ui-text-field
              :type="'password'"
              :name="'authorPw'"
              :id="`addPostReplyAuthorPw${reply.id}`"
              :clazz="['post__reply__input']"
              :rules="'required|min:8|max:15'"
              :tooltip="true"
            />
          </div>
    
          <div class="post__reply__write__btns">
            <ui-button
              :type="'submit'"
              :color="'primary'"
              :text="'저장'"
              :class="'post__reply__btn--write post__reply__btn--write-depth'"
            />
          </div>
        </div>
      </ui-form>
    </div>
  </div>
</template>

<script>
import { messageUtil } from '@/utils';

export default {
  name: 'AppAddPostReplyDepth',
  props: {
    /** 포스트 댓글 */
    reply: Object,
  },
  data() {
    return {
      adminNickName: '',
    }
  },
  created() {
    this.adminNickName = this.$store.state.Post.code.find(d => d.id === 'F01001').nm;
  },
  methods: {
    /** 포스트 댓글 저장 */
    async onSubmit(values) {
      const confirm = await messageUtil.confirmSuccess('저장하시겠습니까?');
      if (!confirm) return;

      values.title = this.$store.state.Breadcrumb.pageTitle;

      this.$http.post('/postreply', values)
      .then(resp => {
        messageUtil.toastSuccess('저장되었습니다.');
        this.$emit('refreshList');
      });
    },
  },
}
</script>

<style scoped>
@import '@/assets/scss/components/post-reply-list.scss';
</style>