<template>
  <aside class="sidebar">
    <ui-loading
      :activeModel="!dataLoaded"
      :fullPage="false"
      :loader="'bars'"
      :color="'#538204'"
      style="min-height: 20rem;"
    />

    <ui-sort-list
      v-model:list="storeWidget"
      :shouldCancelStart="onShouldCancelStart"
      @updateList="onUpdateList"
      v-if="dataLoaded"
    >
      <ui-sort-item v-for="(widget,i) in storeWidget" :key="widget.id"
        :index="i"
        :disabled="!widgetActive"
      >
        <div :class="[
          'sidebar__item-list',
          { 'sidebar__item-list--category': 1 === widget.id },
          { 'sidebar__item-list--tag': 2 === widget.id },
          { 'sidebar__item-list--active': widgetActive },
          { 'sidebar__item-list--disable': 'N' === widget.useYn },
        ]">
          <div class="widget widget__box">
            <h2 class="sidebar__item-title widget__title">
              <i :class="`${widget.icon} sidebar__item-title-icon`" :aria-hidden="!widgetActive">
                <span v-if="widgetActive">
                  <ui-text-field
                    :name="'icon'"
                    :title="'아이콘 클래스명'"
                    :placeholder="'아이콘 클래스명'"
                    :autocomplete="'off'"
                    :value="widget.icon"
                    v-model="widget.icon"
                  />
                </span>
              </i>

              <em
                :contenteditable="widgetActive"
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
                <router-link
                  :to="`/tag/${tag.id}`"
                  :style="{ fontSize: `${getFontSize(tag.count)}%` }">{{ tag.nm }}

                  <span class="sidebar__item-count">{{ tag.count }}</span>
                </router-link>
              </li>
            </ul>

            <ui-icon-button
              :icon="'xi-check'"
              :text="'사용 여부 선택'"
              :title="`클릭하여 위젯을 '미사용' 상태로 변경`"
              :class="'widget__use'"
              @click="onChangeUseYn($event, widget.id)"
              v-if="widgetActive"
            />
          </div>
        </div>
      </ui-sort-item>
    </ui-sort-list>
  </aside>
</template>

<script>
import { isNotEmpty, deepCopy } from '@/utils';

export default {
  name: 'AppSidebar',
  data() {
    return {
      sidebar: {},
      widgetList: [],
      categoryList: [],
      tagList: [],
    }
  },
  async created() {
    if (0 === Object.values(this.storeSidebar).length) {
      await this.init();
      return;
    }

    this.$store.dispatch('Layout/FETCH_IS_SIDEBAR_LOADED', true);

    this.widgetList = [...this.storeSidebar.widget];
    this.categoryList = this.storeSidebar.category;
    this.tagList = this.storeSidebar.tag;
  },
  computed: {
    storeSidebar: {
      get() {
        return this.$store.state.Layout.sidebar;
      },
      set(v) {}
    },
    storeWidget: {
      get() {
        return this.$store.state.Layout.sidebar.widget ?? [];
      },
      set(v) {
        this.$store.state.Layout.sidebar.widget = v;
      }
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
    dataLoaded: {
      get() {
        return this.$store.state.Layout.isSidebarLoaded;
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
    /** 초기 세팅 */
    async init() {

      // 위젯 목록을 먼저 조회하고
      await this.listWidget();

      // 카테고리, 태그 목록을 조회한다음
      await this.listCategoryAndCount();

      // 위젯 skeleton ui 표출 메서드를 실행한다.
      this.dataLoading();

      this.$store.dispatch('Layout/FETCH_SIDEBAR', this.sidebar);

      // store의 sidebar 값 변경 시, 객체라서 originalSidebar도 동시에 변경되므로 깊은 복사를 해줘야 함 
      this.$store.dispatch('Layout/FETCH_ORIGINAL_SIDEBAR', deepCopy(this.sidebar));
    },
    /** 정렬에 제외할 HTML 요소 */
    onShouldCancelStart(e) {
      const tags = [
        'input', 'textarea', 'select',
        'option', 'button', 'a'
      ];

      const classNames = [
        'widget__use',
        'sidebar__item-title-icon',
        'sidebar__item-title-text'
      ];

      return -1 !== tags.indexOf(e.target.tagName.toLowerCase())
          || -1 !== classNames.indexOf(e.target.className);
    },
    /** 위젯 명 변경 시 */
    onChangeTitle(e, id) {
      this.storeSidebar.widget.forEach(d => {
        if (id === d.id) {
          d.title = e.target.textContent;
        }
      });

      this.changeWidget.forEach(d => {
        if (id === d.id) {
          d.title = e.target.textContent;
        }
      });
    },
    /** 위젯 사용 여부 변경 시 */
    onChangeUseYn(e, id) {
      this.storeSidebar.widget.forEach(d => {
        if (id === d.id) {
          d.useYn = d.useYn === 'Y' ? 'N' : 'Y';
        }
      });

      let className = 'widget__use--disabled';

      if (e.target.classList.contains(className)) {
        e.target.classList.remove(className);
        e.target.title = `클릭하여 위젯을 '미사용' 상태로 변경`;
      } else {
        e.target.classList.add(className);
        e.target.title = `클릭하여 위젯을 '사용' 상태로 변경`;

      }
    },
    /** 위젯 정렬 종료 시 */
    onUpdateList(values) {
      
      // 정렬순서 값 변경
      values.forEach((item, idx) => {
        item.sort = idx + 1;
      });

      this.storeWidget = [...values]; // set을 해주지 않으면 순서변경사항이 시각적으로 표출되지 않음
    },
    /** 위젯 목록 조회 */
    listWidget() {
      return this.$store.dispatch('Layout/LIST_WIDGET', {
        params: {
          useYn: 'Y',
        },
      }).then(data => {
        data.forEach(d => {
          this.widgetList.push(d);
        });

        this.sidebar.widget = data;
      });
    },
    /** 카테고리, 태그 목록 및 개수 조회 */
    async listCategoryAndCount() {
      const storeCategoryList = await this.$store.dispatch('Category/LIST_CATEGORY');

      this.sidebar.category = isNotEmpty(storeCategoryList) ? storeCategoryList[0] : [];
      this.sidebar.tag = isNotEmpty(storeCategoryList) ? storeCategoryList[1] : [];
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
    /** 데이터 로딩 */
    dataLoading() {
      if (0 < this.storeSidebar?.widget?.length && 0 < this.categoryList?.length && 0 < this.tagList?.length) {
        this.$store.dispatch('Layout/FETCH_IS_SIDEBAR_LOADED', true);
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/sidebar.scss';
</style>
