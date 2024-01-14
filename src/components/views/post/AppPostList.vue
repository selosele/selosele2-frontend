<template>
  <div class="post-list__wrapper">
    <ui-form :name="'postListForm'" @onsubmit="removePost">
      <ui-form :name="'postCategoryForm'" :ref="'postCategoryForm'" @onsubmit="listPostByCategory">
        <div class="post__category-filter d-flex-w gap--10 mb--15">
          <ui-select
            :name="'categoryId'"
            :id="'categoryId'"
            :clazz="['post__category-filter-select']"
            :title="'카테고리 선택'"
            :defaultValue="'카테고리 선택'"
            :data="categoryList"
            v-model="selectedCategoryId"
            @onchange="listPostByCategory"
          />
        </div>
      </ui-form>

      <div class="post__btn-wrapper mt--15" v-if="isAdmin && 'D01001' === pageType">
        <ui-icon-button
          :routerLink="'/add-post'"
          :color="'primary'"
          :icon="'xi-pen'"
          :text="'포스트 작성'"
          :showText="true"
          :class="'post__btn'"
        />

        <ui-icon-button
          :type="'submit'"
          :color="'dark'"
          :icon="'xi-trash'"
          :text="'포스트 삭제'"
          :showText="true"
          :class="'post__btn'"
        />

        <span class="post__check-all">
          <ui-checkbox
            :name="'checkAll'"
            :id="'checkAll'"
            :label="'포스트 전체 선택'"
            :values="'Y,N'"
            v-model="checkAll"
            @click.self="onClick"
          />
        </span>
      </div>

      <app-post-list-detail
        :pageType="pageType"
        :page="page"
        :key="postList"
        :postList="postList"
        :checkList="checkList"
        :checkAll="isCheckAll"
      />
    </ui-form>

    <slot />
  </div>
</template>

<script>
import AppPostListDetail from '@/components/views/post/AppPostListDetail.vue';
import { isNotBlank, isNotEmpty, messageUtil } from '@/utils';

export default {
  name: 'AppPostList',
  components: {
    AppPostListDetail,
  },
  props: {
    /** D01001: 메인, D01006: 검색 */
    pageType: String,
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

        if (v === 'Y') {
          this.postList.forEach(d => {
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

      this.$http.post('/post/remove', checkPostList)
      .then(resp => {
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

      this.$http.get('/post', { params: { categoryId, pageType: 'D01001' } })
      .then(resp => {
        this.$store.dispatch('Post/FETCH_SELECTED_CATEGORY_ID', categoryId);
        this.$emit('listPost', resp.data);
      });
    },
    /** 포스트 전체 선택 */
    onClick(e) {
      this.$store.dispatch('Post/FETCH_CHECKALL', e.target.checked);
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/views/post.scss';
</style>