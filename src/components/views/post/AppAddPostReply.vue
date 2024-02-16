<template>
  <div class="post__reply__wrapper">
    <h2>댓글 남기기</h2>

    <ui-form :name="'addPostReplyForm'" :class="'post__reply__write-frm'" @onsubmit="onSubmit">
      <ui-hidden-field :name="'parentId'" :id="'addPostReplyParentId'" :value="id" />
      <ui-hidden-field :name="'title'" :id="'addPostReplyTitle'" :value="''" />
      <ui-hidden-field :name="'crudType'" :id="'addPostReplyCrudType'" :value="'E01001'" />

      <ui-textarea
        :name="'cont'"
        :id="'addReplyCont'"
        :title="'댓글 내용 입력'"
        :placeholder="'하고싶은 말을 남겨주세요.'"
        :cols="'30'"
        :rows="'4'"
        :resize="'vertical'"
        :rules="'required|max:1000'"
      />

      <div class="post__reply__write__inputs">
        <div class="post__reply__write__input-box">
          <label for="addPostReplyAuthor" class="post__reply__write__label">닉네임</label>
          <ui-text-field
            :name="'author'"
            :id="'addPostReplyAuthor'"
            :clazz="['post__reply__input']"
            :rules="'required|max:20'"
            :readonly="isAdmin"
            :value="isAdmin ? adminNickName : ''"
          />
        </div>
    
        <div class="post__reply__write__input-box">
          <label for="addPostReplyAuthorPw" class="post__reply__write__label">비밀번호</label>
          <ui-text-field
            :type="'password'"
            :name="'authorPw'"
            :id="'addPostReplyAuthorPw'"
            :clazz="['post__reply__input']"
            :rules="'required|min:8|max:15'"
            :readonly="isAdmin"
            :value="isAdmin ? passwordCode : ''"
          />
        </div>
    
        <div class="post__reply__write__btns">
          <ui-button
            :type="'submit'"
            :color="'primary'"
            :text="'저장'"
            :class="'post__reply__btn--write'"
          />
        </div>
      </div>
    </ui-form>
  
    <p class="post__reply__no-data" v-if="0 === replyList.length">
      댓글이 없습니다. 제일 먼저 댓글을 작성해보세요.
    </p>

    <app-post-reply-list
      v-else
      :key="replyList"
      :replyList="replyList"
      @refreshList="listPostReply"
      @removeReply="listPostReply"
      @updateReply="onUpdateReply"
    />
  </div>
</template>

<script>
import moment from 'moment';
import AppPostReplyList from './AppPostReplyList.vue';
import { isNotEmpty, messageUtil } from '@/utils';

export default {
  name: 'AppAddPostReply',
  components: {
    AppPostReplyList,
  },
  props: {
    /** 포스트 ID */
    id: Number,
    /** 포스트 댓글 목록 */
    list: Array,
  },
  data() {
    return {
      replyList: this.list,
      adminNickName: '',
      passwordCode: '',
    }
  },
  created() {
    this.adminNickName = this.$store.state.Post.code.find(d => d.id === 'F01001')?.nm;
    this.passwordCode = this.$store.state.Code.data.find(d => d.id === 'I01001')?.nm;
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

        this.listPostReply();
      });
    },
    /** 포스트 댓글 목록 조회 */
    listPostReply() {
      return this.$http.get(`/postreply/list/${this.id}`)
      .then(resp => {
        this.replyList = [];

        resp.data.forEach(d => {
          this.setData(d);
          this.replyList.push(d);
        });
      });
    },
    /** 포스트 댓글 수정 시 */
    onUpdateReply(reply) {
      const { id, author, cont, modDate } = reply;

      this.replyList.forEach(d => {
        if (d.id === id) {
          d.author = author;
          d.cont = cont;
          d.cont = this.setData(d).cont;
          d.modDate = moment(modDate).format('YYYY-MM-DD HH:mm:ss');
        }
      });
    },
    /** 포스트 댓글 데이터 가공 */
    setData(data) {
      data.cont = data.cont.replace(/\r\n|\n/g, '<br>');
      data.cont = data.cont.replaceAll('\\r\\n', '<br>'); // AS-IS 데이터의 경우 \r\n 문자가 DB에 직접 들어감
      data.regDate = moment(data.regDate).format('YYYY-MM-DD HH:mm:ss');

      if (isNotEmpty(data.modDate)) {
        data.modDate = moment(data.modDate).format('YYYY-MM-DD HH:mm:ss');
      }

      return data;
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/post-reply-list.scss';
</style>