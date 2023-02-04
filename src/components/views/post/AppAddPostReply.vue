<template>
  <div class="post__reply__wrapper">
    <h2>댓글 남기기</h2>

    <ui-form :name="'addPostReplyForm'" :class="'post__reply__write-frm'" @onsubmit="onSubmit">
      <ui-hidden-field :name="'parentId'" :id="'addPostReplyParentId'" :value="id"></ui-hidden-field>
      <ui-hidden-field :name="'crudType'" :id="'addPostReplyCrudType'" :value="'E01001'"></ui-hidden-field>

      <ui-textarea :name="'cont'"
                   :id="'addReplyCont'"
                   :title="'댓글 내용 입력'"
                   :placeholder="'하고싶은 말을 남겨주세요.'"
                   :cols="'30'"
                   :rows="'4'"
                   :resize="'vertical'"
                   :rules="'required|max:1000'">
      </ui-textarea>

      <div class="post__reply__write__inputs">
        <ui-text-field :type="'text'"
                       :name="'author'"
                       :id="'addPostReplyAuthor'"
                       :class="'post__reply__input'"
                       :label="'닉네임'"
                       :rules="'required|max:20'"
                       :readonly="isLogin"
                       :value="isLogin ? '관리자' : ''">
        </ui-text-field>
    
        <ui-text-field :type="'password'"
                       :name="'authorPw'"
                       :id="'addPostReplyAuthorPw'"
                       :class="'post__reply__input'"
                       :label="'비밀번호'"
                       :rules="'required|min:8|max:15'">
        </ui-text-field>
    
        <div class="post__reply__write__btns">
          <ui-button :type="'reset'"
                     :class="'post__reply__btn--reset'">다시작성
          </ui-button>

          <ui-button :type="'submit'"
                     :class="'post__reply__btn--write'">저장
          </ui-button>
        </div>
      </div>
    </ui-form>
  
    <p class="post__reply__no-data" v-if="0 === replyList.length">댓글이 없습니다. 제일 먼저 댓글을 작성해보세요.</p>

    <app-post-reply-list v-else
                         :key="replyList"
                         :replyList="replyList"
                         @refreshList="listPostReply"
                         @removeReply="listPostReply"
                         @updateReply="onUpdateReply">
    </app-post-reply-list>
  </div>
</template>

<script>
import { isNotEmpty, messageUtil } from '@/utils';
import AppPostReplyList from './AppPostReplyList.vue';

export default {
  name: 'app-add-post-reply',
  components: {
    AppPostReplyList,
  },
  props: {
    /** 포스트 ID */
    id: Number,
  },
  data() {
    return {
      /** 포스트 댓글 목록 */
      replyList: Array,
    }
  },
  created() {
    this.listPostReply();
  },
  methods: {
    /** 포스트 댓글 저장 */
    async onSubmit(values) {
      const confirm = await messageUtil.confirmSuccess('저장하시겠습니까?');
      if (!confirm) return;

      this.$http.post('/postreply', values)
      .then(res => {
        messageUtil.toastSuccess('저장되었습니다.');

        this.listPostReply();
      });
    },
    /** 포스트 댓글 목록 조회 */
    listPostReply() {
      return this.$http.get(`/postreply/list/${this.id}`)
      .then(res => {
        res.data[0].map(d => {
          this.setData(d);
        });

        this.replyList = [...res.data[0]];
      });
    },
    /** 포스트 댓글 수정 시 */
    onUpdateReply(reply) {
      const { id, author, cont, modDate } = reply;

      this.replyList.map(d => {
        if (d.id === id) {
          d.author = author;
          d.cont = cont;
          d.cont = this.setData(d).cont;
          d.modDate = this.$moment(modDate).format('YYYY-MM-DD HH:mm:ss');
        }
      });
    },
    /** 포스트 댓글 데이타 가공 */
    setData(data) {
      data.cont = data.cont.replace(/\r\n|\n/g, '<br>');
      data.cont = data.cont.replaceAll('\\r\\n', '<br>'); // AS-IS 데이타의 경우 \r\n 문자가 DB에 직접 들어감
      data.regDate = this.$moment(data.regDate).format('YYYY-MM-DD HH:mm:ss');

      if (isNotEmpty(data.modDate)) {
        data.modDate = this.$moment(data.modDate).format('YYYY-MM-DD HH:mm:ss');
      }

      return data;
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/post-reply-list.scss';
</style>