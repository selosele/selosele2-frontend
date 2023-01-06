<template>
  <app-content-wrapper :pageTitle="pageTitle">
    <template v-if="!dataLoaded">
      <ui-skeletor :height="'1.3rem'"></ui-skeletor>
      <ui-skeletor :height="'1.3rem'"></ui-skeletor>
      <ui-skeletor :height="'1.3rem'"></ui-skeletor>
    </template>

    <template v-else>
      <ui-split-pane>
        <ui-pane :isTransparent="true">
          <ui-tree :nodes="menuTree"
                   :useCheckbox="false"
                   :filter="true"
                   :placeholder="'메뉴명 입력'"
                   @onNodeClick="onNodeClick">

            <template v-slot:btn>
              <ui-button :color="'primary'"
                         @click="addMenu">추가
              </ui-button>
            </template>
          </ui-tree>
        </ui-pane>

        <ui-pane v-if="isSplitterActive">
          <ui-loading :activeModel="!dataLoaded2"></ui-loading>
          
          <app-save-menu v-if="dataLoaded2"
                         :menu="menu"
                         :parentMenuList="parentMenuList"
                         :key="menu.id"
                         @refreshMenu="refreshTree">
          </app-save-menu>
        </ui-pane>
      </ui-split-pane>
    </template>
  </app-content-wrapper>
</template>

<script>
import AppSaveMenu from '@/components/views/menu/AppSaveMenu.vue';
import { breadcrumbService } from '@/services/breadcrumb/breadcrumbService';
import { isNotEmpty } from '@/utils';

export default {
  name: 'app-admin-menu',
  components: {
    AppSaveMenu,
  },
  data() {
    return {
      pageTitle: '메뉴 관리',
      menuTree: [],
      menu: {},
      parentMenuList: [],
      dataLoaded: false,
      dataLoaded2: false,
    }
  },
  created() {
    this.init();
  },
  methods: {
    /** 초기 세팅 */
    async init() {
      // 페이지 타이틀 세팅
      breadcrumbService.setPageTitle(this.pageTitle);

      await this.listMenuTree();

      this.$store.commit('Splitter/TOGGLE', true);
      this.dataLoaded = true;
      this.dataLoaded2 = true;
    },
    /** 메뉴 계층형 구조 조회 */
    listMenuTree() {
      return this.$http.get('/menu/list/tree')
        .then(res => {
          this.createTree(res.data);
          this.parentMenuList = this.listParentMenu(this.$store.state.Menu.data, []);
        });
    },
    /** 트리 생성 */
    createTree(data) {
      data.forEach(parent => {

        // 최상위 node
        let rootNode = {
          id: parent.id,
          label: parent.name,
          nodes: parent.children.map((child, idx, self) => {
            if (0 === self.length) return {};

            // 자식(포스트) node를 리턴
            return {
              id: child.id,
              label: child.name,
            };
          }),
        };

        // node를 배열에 넣는다.
        this.menuTree.push(rootNode);
      });
    },
    /** node 클릭 시 */
    async onNodeClick(node) {
      this.$store.commit('Splitter/TOGGLE', true);

      // 똑같은 node를 여러번 클릭해서 API가 호출되는 것을 막기 위해, node.id와 menu.id가 다를 때만 API를 호출한다.
      if (node.id !== this.menu?.id) {
        this.dataLoaded2 = false;

        await this.getMenu(node);
        this.dataLoading2();
      }
    },
    /** 트리 갱신 */
    async refreshTree() {
      this.resetMenu();
      this.menuTree = [];

      await this.listMenuTree();
    },
    /** 메뉴 조회 */
    getMenu(node) {
      return this.$http.get(`/menu/${node.id}`)
        .then(res => {
          this.menu = { ...res.data };
          this.parentMenuList = this.listParentMenu(this.$store.state.Menu.data, [])
            .filter(d => d.value !== this.menu.id);

          this.menu.regDate = this.$moment(this.menu.regDate).format('YYYY-MM-DD HH:mm:ss');
        });
    },
    /** 조회된 메뉴를 제외한 메뉴 목록 조회 */
    listParentMenu(nodes, arr) {
      return nodes.map(d => {
        return {
          value: d.id,
          text: d.name,
        };
      });
      
      // 2022.12.31. 최대 2depth로 제한해야 해서, 아래와 같은 로직이 의미가 없음. 추후 depth 확장 고려해서 로직을 주석처리만 해둠.
      // if (!nodes) return [];
      // if (!arr) arr = [];

      // for (let node of nodes) {
      //   arr.push({
      //     value: node.id,
      //     text: node.name,
      //   });

      //   this.listParentMenu(node.children, arr);
      // }

      // return arr;
    },
    /** 메뉴 추가 */
    addMenu() {
      this.resetMenu();
    },
    /** 메뉴 초기화 */
    resetMenu() {
      this.menu = {};
      this.menu.id = null;
      this.menu.parentId = 0;
      this.parentMenuList = this.listParentMenu(this.$store.state.Menu.data, []);
    },
    /** 데이타 로딩 */
    dataLoading2() {
      if (isNotEmpty(this.menu) && 0 < Object.values(this.menu).length) {
        this.dataLoaded2 = true;
      }
    },
  }
}
</script>

<style lang="scss" scoped>

</style>