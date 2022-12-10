<template>
  <div class="post-list__wrapper">
    <ui-form :name="'postListForm'" @onSubmit="removePost">
      <ui-form :name="'postCategoryForm'" @onSubmit="listPostByCategory">
        <div class="post__category-filter d-flex-w gap--10">
          <div>
            <ui-select :name="'categoryId'"
                       :id="'categoryId'"
                       :class="'post__category-filter-select'"
                       :title="'카테고리 선택'"
                       :defaultValue="'카테고리 선택'"
                       :data="categoryList"
                       :rules="'required'">
            </ui-select>
          </div>

          <ui-button :type="'submit'"
                     :color="'dark'"
                     :class="'post__category-filter-btn'">
            <span class="sr-only">카테고리 조회</span>
            <i aria-hidden="true" class="xi-check"></i>
          </ui-button>
        </div>
      </ui-form>

      <div class="post__btn-wrapper mt--15" v-if="isLogin && 'main' === type">
        <ui-button :routerLink="'/add-post'"
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
                            :checkList="checkList"
                            :checkAll="checkAll">
      </app-post-list-detail>
    </ui-form>

    <slot></slot>
  </div>
</template>

<script>
import UiForm from '@/components/shared/form/UiForm.vue';
import UiSelect from '@/components/shared/form/UiSelect.vue';
import UiCheckbox from '@/components/shared/form/UiCheckbox.vue';
import AppPostListDetail from '@/components/views/post/AppPostListDetail.vue';
import { isNotEmpty } from '@/utils/util';

export default {
  name: 'app-post-list',
  components: {
    UiForm,
    UiSelect,
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
    // 포스트 카테고리 목록
    categoryList: Array,
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
        if (isNotEmpty(this.postList) && 0 < this.postList.length) {
          return this.postList.length === this.checkList.length;
        }
        return false;
      },
      set(v) {
        let checkList = [];

        if ('Y' === v) {
          this.postList.map(d => {
            checkList.push(d.id);
          });
        }

        this.checkList = checkList;
      }
    },
  },
  methods: {
    // 포스트 삭제
    removePost(values) {
      console.log(values);
    },
    // 카테고리 필터링
    listPostByCategory(values) {
      this.$http.get('/post', { params: values })
        .then(res => {
          this.$emit('listPost', res.data);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/views/post.scss';
</style>