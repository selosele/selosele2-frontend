<template>
  <aside class="sidebar">
    <template v-if="!dataLoaded">
      <ui-skeletor height="8rem" />
      <ui-skeletor height="8rem" />
    </template>

    <template v-else>
      <template v-for="(widget,i) in widgetList" :key="i">
        <div :class="[
          'sidebar__item-list',
          { 'sidebar__item-list--category': widget.id === 1 },
          { 'sidebar__item-list--tag': widget.id === 2 },
          ]">
          <div class="widget widget__box">
            <h2 class="sidebar__item-title widget__title">
              <i :class="widget.icon" aria-hidden="true"></i>
              <em>{{ widget.title }}</em>
            </h2>
  
            <ul v-if="widget.id === 1">
              <li v-for="(category,j) in categoryList" :key="j">
                <router-link :to="`/category/${category.nm}/${category.id}`">
                  {{ category.nm }}
                  <span class="sidebar__item-count">{{ category.count }}</span>
                </router-link>
              </li>
            </ul>
  
            <ul v-if="widget.id === 2">
              <li v-for="(tag,j) in tagList" :key="j">
                <router-link
                  :to="`/tag/${tag.nm}/${tag.id}`"
                  :style="{ fontSize: `${getFontSize(tag.count)}%` }"
                  >
                  {{ tag.nm }}
                  <span class="sidebar__item-count">{{ tag.count }}</span>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </template>
  </aside>
</template>

<script>
import snackbar from '@/utils/ui/Snackbar';

export default {
  name: 'app-sidebar',
  data() {
    return {
      widgetList: [],
      categoryList: [],
      tagList: [],
      dataLoaded: false,
    }
  },
  async created() {
    // 위젯 목록을 먼저 조회하고
    await this.listWidget();

    // 위젯 skeleton ui 표출 메서드를 실행한다음
    await this.dataLoading();

    // 카테고리, 태그를 동시에 조회한다.
    await Promise.all([
      this.listCategoryAndCount(),
      this.listTagAndCount(),
    ]);
  },
  methods: {
    // 위젯 목록 조회
    listWidget() {
      let listWidgetDto = {
        useYn: 'Y',
      };

      return this.$http.get('/widget/list', { params: listWidgetDto })
        .then(res => {
          res.data.map(d => {
            this.widgetList.push(d);
          });
        });
    },
    // 카테고리 목록 및 개수 조회
    listCategoryAndCount() {
      return this.$http.get('/category/list')
        .then(res => {
          res.data.map(d => {
            this.categoryList.push(d);
          });
        });
    },
    // 태그 목록 및 개수 조회
    listTagAndCount() {
      return this.$http.get('/tag/list')
        .then(res => {
          res.data.map(d => {
            this.tagList.push(d);
          });
        });
    },
    // skeletor width 구하기
    getSkeletorWidth(num) {
      return Math.floor(Math.random() * num);
    },
    // font-size 구하기
    getFontSize(cnt) {
      // 최소값
      if (4 >= cnt) return 80;
      // 최대값
      if (8 <= cnt) return 170;
      // 계산된 값
      return 25 * cnt;
    },
    // 데이타 로딩
    dataLoading() {
      return Promise.resolve(
        setTimeout(() => {
          this.dataLoaded = true;
        }, 1000)
      );
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/components/sidebar.scss';
</style>
