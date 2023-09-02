<template>
  <app-content-wrapper>
    <ui-tabs @tabChanged="onTabChanged">
      <ui-tab :name="'카테고리'">
        <ui-split-pane>
          <ui-pane :isTransparent="true">
            <ui-tree :nodes="categoryTree"
                     :useCheckbox="false"
                     :filter="true"
                     :placeholder="'카테고리/포스트 제목 입력'"
                     @nodeClick="onNodeClick">

              <template v-slot:btn>
                <ui-button :color="'primary'"
                           @click="addCategory">추가
                </ui-button>
              </template>
            </ui-tree>
          </ui-pane>

          <ui-pane v-if="isSplitterActive">
            <app-save-category :category="category"
                               :type="'D01004'"
                               :key="type + category.id"
                               @refreshCategory="refreshTree">
            </app-save-category>
          </ui-pane>
        </ui-split-pane>
      </ui-tab>

      <ui-tab :name="'태그'">
        <ui-split-pane>
          <ui-pane :isTransparent="true">
            <ui-tree :nodes="tagTree"
                      :useCheckbox="false"
                      :filter="true"
                      :placeholder="'태그/포스트 제목 입력'"
                      @nodeClick="onNodeClick">

              <template v-slot:btn>
                <ui-button :color="'primary'"
                           @click="addCategory">추가
                </ui-button>
              </template>
            </ui-tree>
          </ui-pane>

          <ui-pane v-if="isSplitterActive">
            <app-save-category :category="category"
                               :type="'D01005'"
                               :key="type + category.id"
                               @refreshCategory="refreshTree">
            </app-save-category>
          </ui-pane>
        </ui-split-pane>
      </ui-tab>
    </ui-tabs>
  </app-content-wrapper>
</template>

<script>
import AppSaveCategory from '@/components/views/category/AppSaveCategory.vue';
import { isNotEmpty } from '@/utils';
import { isEmpty } from '../utils';

export default {
  name: 'app-admin-category',
  components: {
    AppSaveCategory
  },
  data() {
    return {
      pageTitle: '카테고리/태그 관리',
      categoryTree: [],
      tagTree: [],
      category: {},
      type: '',
      activeIndex: -1,
    }
  },
  created() {
    this.init();
  },
  methods: {
    /** 초기 세팅 */
    async init() {
      // 페이지 타이틀 세팅
      this.$store.dispatch('Breadcrumb/FETCH_PAGE_TITLE', this.pageTitle);

      await Promise.all([
        this.listCategoryTreeAndPost(),
        this.listTagTreeAndPost(),
      ]);

      this.$store.commit('Splitter/TOGGLE', true);
    },
    /** 카테고리-포스트 계층형 구조 조회 */
    listCategoryTreeAndPost() {
      return this.$http.get('/category/list/tree')
      .then(res => {
        this.createTree(res.data, 'D01004');
      });
    },
    /** 태그-포스트 계층형 구조 조회 */
    listTagTreeAndPost() {
      return this.$http.get('/tag/list/tree')
      .then(res => {
        this.createTree(res.data, 'D01005');
      });
    },
    /** 트리 생성 */
    createTree(data, type) {
      data.forEach(parent => {
        let childNodes = [];

        if ('D01004' === type) {
          childNodes = parent.postCategory;
        } else if ('D01005' === type) {
          childNodes = parent.postTag;
        }

        // 최상위(카테고리/태그) node
        let rootNode = {
          id: parent.id,
          label: this.getTreeLabel(parent.nm, type),
          nodes: childNodes.map((child, idx, self) => {
            if (0 === self.length) return {};

            // 자식(포스트) node를 반환
            return {
              id: child.postId,
              label: child.post.title,
            };
          }),
        };

        // node를 배열에 넣는다.
        this.pushNode(rootNode, type);
      });
    },
    /** 트리 갱신 */
    async refreshTree() {
      this.resetCategory();
      this.categoryTree = [];
      this.tagTree = [];

      await Promise.all([
        this.listCategoryTreeAndPost(),
        this.listTagTreeAndPost(),
      ]);
    },
    /** 트리 label 반환 */
    getTreeLabel(label, type) {
      return 'D01004' === type ? label : `#${label}`;
    },
    /** 트리 배열에 node 넣기 */
    pushNode(node, type) {
      if ('D01004' === type) {
        this.categoryTree.push(node);
      } else if ('D01005' === type) {
        this.tagTree.push(node);
      }
    },
    /** node 클릭 시 */
    async onNodeClick(node) {
      this.$store.commit('Splitter/TOGGLE', true);

      // 포스트 node를 클릭하면
      if (this.isPostNode(node.nodes)) {

        // 해당 포스트 뷰 페이지로 이동한다.
        this.$router.push(`/post/${node.id}`);
        return;
      }

      // 똑같은 node를 여러번 클릭해서 API가 호출되는 것을 막기 위해, node.id와 category.id가 다를 때만 API를 호출한다.
      if (!this.isPostNode(node.nodes) && node.id !== this.category?.id) {
        await this.getCategory(node);
      }
    },
    /** 탭 변경 시 */
    onTabChanged(selectedTab) {
      this.activeIndex = selectedTab.tab.index;
    },
    /** 카테고리 조회 */
    getCategory(node) {
      if (0 === this.activeIndex) this.type = 'category';
      if (1 === this.activeIndex) this.type = 'tag';

      return this.$http.get(`/${this.type}/${node.id}`)
      .then(res => {
        this.category = { ...res.data };
        this.category.regDate = this.$moment(this.category.regDate).format('YYYY-MM-DD HH:mm:ss');
      });
    },
    /** 카테고리 추가 */
    addCategory() {
      this.resetCategory();
    },
    /** 카테고리 초기화 */
    resetCategory() {
      this.category = {};
      this.category.id = null;
    },
    /** 포스트 node인지 확인 */
    isPostNode(nodes) {
      
      // 자식 node들이 없으면 포스트 node이고, 있으면 카테고리/태그 node이다.
      return isEmpty(nodes);
    },
  },
}
</script>

<style lang="scss" scoped>

</style>