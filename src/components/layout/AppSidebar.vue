<template>
  <aside class="sidebar">
    <ui-loading :activeModel="!dataLoaded"
                :fullPage="false"
                :loader="'bars'"
                :color="'#538204'">
    </ui-loading>

    <ui-sort-list v-model:list="storeSidebar.widget"
                  :shouldCancelStart="onShouldCancelStart"
                  @updateList="onUpdateList"
                  v-if="dataLoaded">
      <ui-sort-item v-for="(widget,i) in storeSidebar.widget"
        :key="widget.id"
        :index="i"
        :disabled="!widgetActive"
      >
        <div :class="[
          'sidebar__item-list',
          { 'sidebar__item-list--category': 1 === widget.id },
          { 'sidebar__item-list--tag': 2 === widget.id },
          { 'sidebar__item-list--active': widgetActive },
        ]">
          <div class="widget widget__box">
            <h2 class="sidebar__item-title widget__title">
              <i :class="widget.icon + ' sidebar__item-title-icon'"
                 :aria-hidden="!widgetActive">
                <span v-if="widgetActive">
                  <ui-text-field :type="'text'"
                                 :name="'icon'"
                                 :title="'아이콘 클래스명'"
                                 :placeholder="'아이콘 클래스명'"
                                 :autocomplete="'off'"
                                 :value="widget.icon"
                                 v-model="widget.icon">
                  </ui-text-field>
                </span>
              </i>

              <em :contenteditable="widgetActive"
                  class="sidebar__item-title-text"
                  @input="onChangeTitle($event, widget.id)">{{ widget.title }}
              </em>
            </h2>

            <ul v-if="1 === widget.id">
              <li v-for="(category,j) in categoryList" :key="j">
                <router-link :to="`/category/${category.id}`">{{ category.nm }}
                  <span class="sidebar__item-count">{{ category.count }}</span>
                </router-link>
              </li>
            </ul>

            <ul v-if="2 === widget.id">
              <li v-for="(tag,j) in tagList" :key="j">
                <router-link :to="`/tag/${tag.id}`"
                             :style="{ fontSize: `${getFontSize(tag.count)}%` }">{{ tag.nm }}
                  <span class="sidebar__item-count">{{ tag.count }}</span>
                </router-link>
              </li>
            </ul>

            <button type="button"
                    class="widget__use"
                    :ref="`widgetUse${widget.id}`"
                    :title="'클릭하여 위젯을 \'미사용\' 상태로 변경'"
                    @click="onChangeUseYn($event, widget.id)"
                    v-if="widgetActive">
              <span class="sr-only">사용 여부 선택</span>
            </button>
          </div>
        </div>
      </ui-sort-item>
    </ui-sort-list>
  </aside>
</template>

<script>
export default {
  name: 'app-sidebar',
  data() {
    return {
      sidebar: {},
      widgetList: [],
      categoryList: [],
      tagList: [],
      dataLoaded: false,
    }
  },
  async created() {
    if (0 === Object.values(this.storeSidebar).length) {
      
      // 위젯 목록을 먼저 조회하고
      await this.listWidget();

      // 카테고리, 태그를 동시에 조회한다음
      await Promise.all([
        this.listCategoryAndCount(),
        this.listTagAndCount(),
      ]);

      // 위젯 skeleton ui 표출 메서드를 실행한다.
      this.dataLoading();

      this.$store.dispatch('Layout/FETCH_SIDEBAR', this.sidebar);
      return;
    }

    this.dataLoaded = true;
    this.widgetList = [...this.storeSidebar.widget];
    this.categoryList = [...this.storeSidebar.category];
    this.tagList = [...this.storeSidebar.tag];
  },
  computed: {
    storeSidebar: {
      get() {
        return this.$store.state.Layout.sidebar;
      },
      set(v) {}
    },
    changeWidget: {
      get() {
        return this.$store.state.Layout.changeWidget;
      },
      set(v) {}
    },
    widgetActive: {
      get() {
        return this.$store.state.Layout.isActive;
      },
      set(v) {}
    },
  },
  watch: {
    '$route'() {
      // 페이지 전환 시, 위젯관리 기능 비활성화
      this.$store.dispatch('Layout/FETCH_IS_ACTIVE', false);
    },
  },
  methods: {
    /** 정렬에 제외할 HTML 태그명 */
    onShouldCancelStart(e) {
      const tag = [
        'input', 'textarea', 'select',
        'option', 'button', 'a'
      ];

      const className = [
        'sidebar__item-title-icon',
        'sidebar__item-title-text'
      ];

      return -1 !== tag.indexOf(e.target.tagName.toLowerCase())
          || -1 !== className.indexOf(e.target.className);
    },
    /** 위젯 명 변경 시 */
    onChangeTitle(e, id) {
      this.storeSidebar.widget.map(d => {
        if (id === d.id) {
          d.title = e.target.textContent;
        }
        return d;
      });

      this.changeWidget.map(d => {
        if (id === d.id) {
          d.title = e.target.textContent;
        }
        return d;
      });
    },
    /** 위젯 사용 여부 변경 시 */
    onChangeUseYn(e, id) {
      this.storeSidebar.widget.map(d => {
        if (id === d.id) {
          d.useYn = 'Y' === d.useYn ? 'N' : 'Y';
        }
        return d;
      });

      let className = 'widget__use--disabled';

      if (e.target.classList.contains(className)) {
        e.target.classList.remove(className);
        e.target.title = '클릭하여 위젯을 \'미사용\' 상태로 변경';
      } else {
        e.target.classList.add(className);
        e.target.title = '클릭하여 위젯을 \'사용\' 상태로 변경';
      }
    },
    /** 위젯 정렬 종료 시 */
    onUpdateList(values) {
      
      // 정렬순서 값 변경
      values.forEach((item, idx) => {
        item.sort = idx + 1;
      });
    },
    /** 위젯 목록 조회 */
    listWidget() {
      return this.$store.dispatch('Layout/LIST_WIDGET', {
        params: {
          useYn: 'Y',
        },
      }).then(data => {
        data.map(d => {
          this.widgetList.push(d);
        });

        this.sidebar.widget = data;
      });
    },
    /** 카테고리 목록 및 개수 조회 */
    listCategoryAndCount() {
      return this.$http.get('/category/list/count')
      .then(res => {
        res.data.map(d => {
          this.categoryList.push(d);
        });

        this.sidebar.category = this.categoryList;
      });
    },
    /** 태그 목록 및 개수 조회 */
    listTagAndCount() {
      return this.$http.get('/tag/list/count')
      .then(res => {
        res.data.map(d => {
          this.tagList.push(d);
        });
        
        this.sidebar.tag = this.tagList;
      });
    },
    /** font-size 구하기 */
    getFontSize(cnt) {
      // 최소값
      if (4 >= cnt) return 80;
      // 최대값
      if (8 <= cnt) return 170;
      // 계산된 값
      return 25 * cnt;
    },
    /** 데이타 로딩 */
    dataLoading() {
      if (0 < this.storeSidebar?.widget?.length 
        && 0 < this.categoryList?.length 
        && 0 < this.tagList?.length) {
        this.dataLoaded = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/sidebar.scss';
</style>
