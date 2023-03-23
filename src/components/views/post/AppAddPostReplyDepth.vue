<template>
  <div class="post__reply__write-depth">
    <div class="post__reply__write-to">
      <ui-form :name="'addPostReplyDepthForm'" :class="'post__reply__list-frm'" @onsubmit="onSubmit">
        <ui-hidden-field :name="'parentId'" :id="'addPostReplyParentId'" :value="reply.parentId"></ui-hidden-field>
        <ui-hidden-field :name="'parentReplyId'" :id="'addPostReplyParentReplyId'" :value="reply.id"></ui-hidden-field>
        <ui-hidden-field :name="'title'" :id="'addPostReplyTitle'" :value="''"></ui-hidden-field>
        <ui-hidden-field :name="'group'" :id="'addPostReplyGroup'" :value="reply.id"></ui-hidden-field>
        <ui-hidden-field :name="'depth'" :id="'addPostReplyDepth'" :value="reply.depth + 1"></ui-hidden-field>
        <ui-hidden-field :name="'crudType'" :id="'addPostReplyCrudType'" :value="'E01001'"></ui-hidden-field>

        <ui-textarea :name="'cont'"
                     :title="'댓글 내용 입력'"
                     :placeholder="'하고싶은 말을 남겨주세요.'"
                     :cols="'30'"
                     :rows="'4'"
                     :rules="'required|max:1000'">
        </ui-textarea>
      
        <div class="post__reply__write__inputs">
          <div class="post__reply__write__inputs-inner">
            <ui-text-field :type="'text'"
                           :name="'author'"
                           :id="`depthAuthor${reply.id}`"
                           :clazz="['post__reply__input']"
                           :label="'닉네임'"
                           :rules="'required|max:20'"
                           :tooltip="true"
                           :readonly="isLogin"
                           :value="isLogin ? '관리자' : ''">
            </ui-text-field>

            <ui-text-field :type="'password'"
                           :name="'authorPw'"
                           :id="'addPostReplyAuthorPw'"
                           :clazz="['post__reply__input']"
                           :label="'비밀번호'"
                           :rules="'required|min:8|max:15'"
                           :tooltip="true">
            </ui-text-field>
          </div>
    
          <ui-button :type="'submit'"
                     :class="'post__reply__btn--write post__reply__btn--write-depth'">등록
          </ui-button>
        </div>
      </ui-form>
    </div>
  </div>
</template>

<script>
import { BreadcrumbService } from '@/services/breadcrumb/breadcrumbService';
import { messageUtil } from '@/utils';

export default {
  name: 'app-add-post-reply-depth',
  props: {
    /** 포스트 댓글 */
    reply: Object,
  },
  methods: {
    /** 포스트 댓글 저장 */
    async onSubmit(values) {
      const confirm = await messageUtil.confirmSuccess('저장하시겠습니까?');
      if (!confirm) return;

      values.title = new BreadcrumbService().getPageTitle();

      this.$http.post('/postreply', values)
      .then(res => {
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