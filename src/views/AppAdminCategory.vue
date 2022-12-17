<template>
  <app-content-wrapper :pageTitle="pageTitle">
    <ui-tree :nodes="categoryTree"
             :filter="true"
             :placeholder="'카테고리/포스트 제목 입력'">
    </ui-tree>

    <ui-tree :nodes="tagTree"
             :filter="true"
             :placeholder="'태그/포스트 제목 입력'">
    </ui-tree>
  </app-content-wrapper>
</template>

<script>
export default {
  name: 'app-admin-category',
  data() {
    return {
      pageTitle: '카테고리/태그 관리',
      dataLoaded: false,
      categoryTree: [],
      tagTree: [],
    }
  },
  created() {
    this.init();
  },
  methods: {
    /** 초기 세팅 */
    async init() {
      await Promise.all([
        this.listTreeCategoryAndPost(),
        this.listTreeTagAndPost(),
      ]);
    },
    /** 카테고리-포스트 계층형 구조 조회 */
    listTreeCategoryAndPost() {
      return this.$http.get('/category/tree')
        .then(res => {
          this.createTree(res.data, 'category');
        });
    },
    /** 태그-포스트 계층형 구조 조회 */
    listTreeTagAndPost() {
      return this.$http.get('/tag/tree')
        .then(res => {
          this.createTree(res.data, 'tag');
        });
    },
    /** 트리 생성 */
    createTree(data, type) {
      data.forEach(parent => {
        let childNodes = [];

        if ('category' === type) {
          childNodes = parent.postCategory;
        } else {
          childNodes = parent.postTag;
        }

        // 최상위(카테고리/태그) node
        let rootNode = {
          id: parent.id,
          label: this.getTreeLabel(parent.nm, type),
          nodes: childNodes.map((child, idx, self) => {
            if (0 === self.length) return {};

            // 자식(포스트) node
            let postNode = {
              id: child.postId,
              label: child.post.title,
            };

            return postNode;
          }),
        };

        // node를 배열에 넣는다.
        this.pushNode(rootNode, type);
      });
    },
    /** 트리 label 가공 */
    getTreeLabel(label, type) {
      return 'category' === type ? label : `#${label}`;
    },
    /** 트리 배열에 node 넣기 */
    pushNode(node, type) {
      if ('category' === type) {
        this.categoryTree.push(node);
      } else {
        this.tagTree.push(node);
      }
    },
  },
}
</script>

<style lang="scss" scoped>

</style>