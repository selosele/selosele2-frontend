<template>
  <div class="guestbook__reply__wrapper">
    <ui-form :name="`guestbookReplyForm${idx}`" @onsubmit="onSubmit">
      <ui-hidden-field :name="'parentId'" :value="parentId" />

      <ui-textarea
        :name="'cont'"
        :id="`guestbookReplyCont${idx}`"
        :clazz="['guestbook__reply__cont', 'guestbook__textarea']"
        :title="'댓글 입력'"
        :placeholder="'댓글을 남겨주세요.'"
        :cols="'30'"
        :rows="'3'"
        :rules="'required|max:1000'"
      />

      <div class="guestbook__reply__btns">
        <div class="guestbook__reply__input-box">
          <label :for="`guestbookReplyAuthor${idx}`" class="guestbook__reply__label">닉네임</label>
          <ui-text-field
            :name="'author'"
            :id="`guestbookReplyAuthor${idx}`"
            :clazz="['guestbook__input']"
            :rules="'required|max:20'"
            :readonly="isAdmin"
            :value="isAdmin ? adminNickName : ''"
          />
        </div>

        <div class="guestbook__reply__input-box">
          <label :for="`guestbookReplyPw${idx}`" class="guestbook__reply__label">비밀번호</label>
          <ui-text-field
            :type="'password'"
            :name="'authorPw'"
            :id="`guestbookReplyPw${idx}`"
            :clazz="['guestbook__input']"
            :rules="'required|min:8|max:15'"
          />
        </div>

        <div class="guestbook__reply__write__btns">
          <ui-button
            :type="'submit'"
            :color="'primary'"
            :text="'저장'"
            :class="'guestbook__btn guestbook__btn--reply-write'"
          />
        </div>
      </div>
    </ui-form>
  </div>
</template>

<script>
import { messageUtil } from '@/utils';

export default {
  name: 'AppAddGuestbookReply',
  props: {
    /** 방명록 index */
    idx: Number,
    /** 상위 방명록 ID */
    parentId: Number,
  },
  data() {
    return {
      adminNickName: '',
    }
  },
  created() {
    this.adminNickName = this.$store.state.Guestbook.code.find(d => d.id === 'F01001').nm;
  },
  methods: {
    /** 방명록 댓글 등록 */
    async onSubmit(values) {
      const confirm = await messageUtil.confirmSuccess('저장하시겠습니까?');
      if (!confirm) return;

      this.$http.post('/guestbookreply', values)
      .then(resp => {
        messageUtil.toastSuccess('저장되었습니다.');
        this.$emit('addReply', resp.data);
      });
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/views/guestbook.scss';
</style>