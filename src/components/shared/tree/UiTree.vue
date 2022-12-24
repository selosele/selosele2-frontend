<template>
  <div class="mb--15">
    <ui-text-field :class="'tree-filter-field'"
                   :placeholder="placeholder"
                   v-model="searchText"
                   v-if="filter">
    </ui-text-field>
  
    <slot name="btn"></slot>
  </div>

  <Tree :nodes="nodes"
        :search-text="searchText"
        :placeholder="placeholder"
        :use-checkbox="useCheckbox"
        :use-icon="useIcon"
        :use-row-delete="useRowDelete"
        :show-child-count="showChildCount"
        @nodeExpanded="onNodeExpanded"
        @update:nodes="onUpdate"
        @nodeClick="onNodeClick">
  </Tree>
</template>

<script>
import Tree from 'vue3-tree';
import 'vue3-tree/dist/style.css';

export default {
  name: 'ui-tree',
  components: {
    Tree,
  },
  props: {
    /** nodes 데이타 */
    nodes: {
      type: Array,
      default: () => [],
    },
    /** filter input placeholder */
    placeholder: {
      type: String,
      default: '검색어를 입력하세요.',
    },
    /** 체크박스 사용 여부 */
    useCheckbox: {
      type: Boolean,
      default: true,
    },
    /** 아이콘 사용 여부 */
    useIcon: {
      type: Boolean,
      default: true,
    },
    /** node 삭제 사용 여부 */
    useRowDelete: {
      type: Boolean,
      default: false,
    },
    /** 자식 node 개수 표출 여부 */
    showChildCount: {
      type: Boolean,
      default: true,
    },
    /** 트리 검색 사용 여부 */
    filter: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      searchText: '',
    }
  },
  methods: {
    /** 트리 확장 시 */
    onNodeExpanded(node, state) {
      this.$emit('onNodeExpanded', { node, state });
    },
    /** node 업데이트 시 */
    onUpdate(nodes) {
      this.$emit('onUpdate', nodes);
    },
    /** node 클릭 시 */
    onNodeClick(node) {
      this.$emit('onNodeClick', node);
    }
  },
}
</script>

<style lang="scss">
.tree-row-item {
  gap: 0.15rem;

  .feather-chevron-right {
    width: 15px;
    height: 15px;
  }

  input[type="checkbox"] {
    margin-right: 0.3rem;
  }

  .child-count {
    font-size: 0.85rem;
  }
}

.tree-row-txt {
  font-size: 0.9rem;
}

.tree-filter-field {
  display: inline-block;
  
  + * {
    margin-left: 0.5rem;
  }
}
</style>