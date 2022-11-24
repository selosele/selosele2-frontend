<template>
  <div class="post-list__wrapper">
    <ui-form :name="'postListForm'" @onSubmit="onSubmit">
      <div class="post__btn-wrapper" v-if="isLogin && 'main' === type">
        <ui-button :routerLink="'/write'"
                   :color="'light'"
                   :class="'post__btn'">
          <i class="xi-pen" aria-hidden="true"></i> 포스트 작성
        </ui-button>

        <ui-button :type="'submit'"
                   :color="'dark'"
                   :class="'post__btn'">
          <i class="xi-trash" aria-hidden="true"></i> 포스트 삭제
        </ui-button>

        <span class="post__check-all">
          <ui-checkbox :name="'checkAll'"
                       :id="'checkAll'"
                       :label="'포스트 전체 선택'"
                       :values="'Y,N'"
                       v-model="checkAll">
          </ui-checkbox>
        </span>
      </div>

      <app-post-list-detail :type="type"
                            :page="page"
                            :postList="postList"
                            :checkList="checkList">
      </app-post-list-detail>
    </ui-form>

    <slot></slot>
  </div>
</template>

<script>
import UiForm from '@/components/shared/form/UiForm.vue';
import UiCheckbox from '@/components/shared/form/UiCheckbox.vue';
import AppPostListDetail from '@/components/views/post/AppPostListDetail.vue';

export default {
  name: 'app-post-list',
  components: {
    UiForm,
    UiCheckbox,
    AppPostListDetail,
  },
  props: {
    // main: 메인, search: 검색
    type: String,
    // 현재 페이지 번호
    page: Number,
    // 포스트 목록
    postList: Array,
  },
  data() {
    return {
      initList: [],
      checkList: [],
    }
  },
  computed: {
    checkAll: {
      get() {
        return this.postList ? this.postList.length === this.checkList.length : false;
      },
      set(v) {
        this.checkList = [];
        
        if ('Y' === v) {
          this.postList.map(d => {
            this.checkList.push(d.id);
          });
        }
      }
    },
  },
  methods: {
    onSubmit(values) {
      // console.log(values);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/views/post.scss';
</style>