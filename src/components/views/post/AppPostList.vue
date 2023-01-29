<template>
  <div class="post-list__wrapper">
    <ui-form :name="'postListForm'" @onsubmit="removePost">
      <ui-form :name="'postCategoryForm'" :ref="'postCategoryForm'" @onsubmit="listPostByCategory">
        <div class="post__category-filter d-flex-w gap--10 mb--15">
          <ui-select :name="'categoryId'"
                     :id="'categoryId'"
                     :class="'post__category-filter-select'"
                     :title="'카테고리 선택'"
                     :defaultValue="'카테고리 선택'"
                     :data="categoryList"
                     :rules="'required'"
                     v-model="selectedCategoryId"
                     @onchange="listPostByCategory">
          </ui-select>
        </div>
      </ui-form>

      <div class="post__btn-wrapper mt--15" v-if="isLogin && 'D01001' === type">
        <ui-icon-button :routerLink="'/add-post'"
                        :color="'primary'"
                        :icon="'xi-pen'"
                        :class="'post__btn'">포스트 작성
        </ui-icon-button>

        <ui-icon-button :type="'submit'"
                        :color="'dark'"
                        :icon="'xi-trash'"
                        :class="'post__btn'">포스트 삭제
        </ui-icon-button>

        <span class="post__check-all">
          <ui-checkbox :name="'checkAll'"
                       :id="'checkAll'"
                       :label="'포스트 전체 선택'"
                       :values="'Y,N'"
                       v-model="checkAll"
                       @click.self="onClick">
          </ui-checkbox>
        </span>
      </div>

      <app-post-list-detail :type="type"
                            :page="page"
                            :key="postList"
                            :postList="postList"
                            :checkList="checkList"
                            :checkAll="isCheckAll">
      </app-post-list-detail>
    </ui-form>

    <slot></slot>
  </div>
</template>

<script>
import AppPostListDetail from '@/components/views/post/AppPostListDetail.vue';
import { isNotBlank, isNotEmpty, messageUtil } from '@/utils';

export default {
  name: 'app-post-list',
  components: {
    AppPostListDetail,
  },
  props: {
    /** main: 메인, search: 검색 */
    type: String,
    /** 현재 페이지 번호 */
    page: Number,
    /** 포스트 목록 */
    postList: Array,
    /** 포스트 카테고리 목록 */
    categoryList: Array,
  },
  data() {
    return {
      /** 선택된 카테고리 ID */
      selectedCategoryId: this.$store.state.Post.selectedCategoryId,
    }
  },
  mounted() {
    if (isNotBlank(this.$store.state.Post.selectedCategoryId)) {
      // 페이지 전환 시 선택된 카테고리 ID 초기화
      this.$store.dispatch('Post/FETCH_SELECTED_CATEGORY_ID', '');
    }
  },
  computed: {
    checkAll: {
      get() {
        if (isNotEmpty(this.postList) && 0 < this.postList.length) {
          return this.isCheckAll;
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

        this.$store.dispatch('Post/FETCH_CHECKLIST', checkList);
      }
    },
    checkList: {
      get() {
        return this.$store.state.Post.checkList;
      },
      set(v) {}
    },
    isCheckAll: {
      get() {
        return this.$store.state.Post.checkAll;
      },
      set(v) {}
    },
  },
  methods: {
    /** 포스트 삭제 */
    async removePost(values) {
      if (0 === values.checkPost.length) {
        messageUtil.toastWarning('삭제할 포스트를 선택하세요.');
        return;
      }

      const checkPostList = values.checkPost.map(d => {
        let obj = {};
        obj.id = d;
        return obj;
      });

      const confirm = await messageUtil.confirmSuccess('삭제하시겠습니까?');
      if (!confirm) return;

      this.$http.delete('/post', { data: checkPostList })
      .then(res => {
        messageUtil.toastSuccess('삭제되었습니다.');

        this.$store.dispatch('Post/FETCH_MAIN_POSTLIST', {});
        this.$store.dispatch('Layout/FETCH_SIDEBAR', {});

        this.$emit('removePost');
      });
    },
    /** 카테고리 필터링 */
    async listPostByCategory(categoryId) {
      const runValidate = await this.$refs['postCategoryForm'].validateAll();
      if (!runValidate.valid) return;

      this.$http.get('/post', { params: { categoryId, type: 'D01001' } })
      .then(res => {
        this.$store.dispatch('Post/FETCH_SELECTED_CATEGORY_ID', categoryId);
        this.$emit('listPost', res.data);
      });
    },
    /** 포스트 전체 선택 */
    onClick(e) {
      this.$store.dispatch('Post/FETCH_CHECKALL', e.target.checked);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/views/post.scss';
</style>