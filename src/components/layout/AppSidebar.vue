<template>
  <aside class="sidebar">
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
              <router-link :to="`/categories/${category.id}`">
                {{ category.nm }} <span>{{ category.count }}</span>
              </router-link>
            </li>
          </ul>

          <ul v-if="widget.id === 2">
            <li v-for="(tag,j) in tagList" :key="j">
              <router-link
                :to="`/tags/${tag.id}`"
                :style="{ fontSize: `${getFontSize(tag.count)}%` }"
                >
                {{ tag.nm }} <span>{{ tag.count }}</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
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
    }
  },
  async created() {
    // 위젯 목록을 먼저 조회하고
    await this.listWidget();

    // 카테고리, 태그 목록 및 개수를 동시에 조회한다.
    await Promise.all([
      this.listCategoryAndCount(),
      this.listTagAndCount(),
    ]);
  },
  methods: {
    // 위젯 목록 조회
    listWidget() {
      let params = {
        useYn: 'Y',
      };

      return this.$http.get('/widget/list', { params: params } )
        .then(res => {
          res.data.map(d => {
            this.widgetList.push(d);
          });
        }).catch(error => {
          snackbar.error('오류가 발생했습니다.');
        });
    },
    // 카테고리 목록 및 개수 조회
    listCategoryAndCount() {
      return this.$http.get('/category/list')
        .then(res => {
          res.data.map(d => {
            this.categoryList.push(d);
          });
        }).catch(error => {
          snackbar.error('오류가 발생했습니다.');
        });
    },
    // 태그 목록 및 개수 조회
    listTagAndCount() {
      return this.$http.get('/tag/list')
        .then(res => {
          res.data.map(d => {
            this.tagList.push(d);
          });
        }).catch(error => {
          snackbar.error('오류가 발생했습니다.');
        });
    },
    // font-size 구하기
    getFontSize(count) {
      if (count <= 4) return 80;
      if (count >= 8) return 170;
      return 25 * count;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/components/sidebar.scss';
</style>
