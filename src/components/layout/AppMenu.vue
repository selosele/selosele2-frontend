<template>
  <nav id="gnb" class="gnb">
    <ul class="gnb__list" v-if="0 < menuList.length">
      <template v-for="(menu,i) in menuList" :key="i">
        <li class="gnb__list__item" v-if="'N' === menu.hasChildren">
          <router-link :to="menu.link">{{ menu.name }}</router-link>
        </li>
        <li v-else :class="[
          'gnb__list__item',
          'gnb__list__item--has-child',
          { 'gnb__list__item--active': i === activeIndex }
        ]">
          <router-link :to="menu.link" custom v-slot="{ href, isActive }">
            <a :href="href"
               :active="isActive"
               :class="{ 'router-link-active': isActive }"
               @click.prevent="toggleMenu(i)"
               ref="menuLink">{{ menu.name }}</a>
          </router-link>

          <transition name="fade" v-if="0 < menu.children.length">
            <ul class="gnb__list--depth2" v-show="i === activeIndex">
              <li class="gnb__list--depth2__list" v-for="(child,j) in menu.children" :key="j">
                <router-link :to="child.link">{{ child.name }}</router-link>
              </li>
            </ul>
          </transition>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script>
import { isNotEmpty } from '@/utils/util';

export default {
  name: 'app-menu',
  data() {
    return {
      menuList: [],
      activeIndex: -1,
    }
  },
  created() {
    this.listMenu();
  },
  mounted() {
    document.addEventListener('click', this.closeMenu);
  },
  unmounted() {
    document.removeEventListener('click', this.closeMenu);
  },
  watch: {
    '$store.state.token': function(token) {
      this.menuList = [];
      this.listMenu();
    }
  },
  methods: {
    // 메뉴 목록 조회
    listMenu() {
      let listMenuDto = {
        useYn: 'Y',
      };

      return this.$http.get('/menu', { params: listMenuDto })
        .then(res => {
          res.data.map(d => {
            this.menuList.push(d);
          });
        });
    },
    // 메뉴 Toggle
    toggleMenu(i) {
      if (i === this.activeIndex) {
        this.activeIndex = -1;
        return;
      }
      this.activeIndex = i;
    },
    // 메뉴 닫기
    closeMenu(e) {
      if (isNotEmpty(this.$refs.menuLink) && !this.$refs.menuLink.includes(e.target)) {
        this.activeIndex = -1;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/menu.scss';
</style>