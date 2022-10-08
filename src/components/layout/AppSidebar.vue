<template>
  <aside class="sidebar">
    <div class="sidebar__item-list sidebar__item-list--tag">
      <div class="widget widget__box">
        <h2 class="sidebar__item-title widget__title">
          <i class="xi-tags" aria-hidden="true"></i>
          <em>태그</em>
        </h2>

        <ul>
          <li>
            <router-link to="" style="font-size: 90%">
              Algorithm
              <span>3</span>
            </router-link>
          </li>

          <li>
            <router-link to="">
              C
              <span>1</span>
            </router-link>
          </li>

          <li>
            <router-link to="">
              iBATIS
              <span>1</span>
            </router-link>
          </li>

          <li>
            <router-link to="" style="font-size: 180%">
              Java
              <span>6</span>
            </router-link>
          </li>

          <li>
            <router-link to="">
              Node.js
              <span>1</span>
            </router-link>
          </li>

          <li>
            <router-link to="" style="font-size: 90%">
              programmers
              <span>3</span>
            </router-link>
          </li>

          <li>
            <router-link to="">
              Spring
              <span>2</span>
            </router-link>
          </li>

          <li>
            <router-link to="" style="font-size: 90%">
              SQL
              <span>3</span>
            </router-link>
          </li>

          <li>
            <router-link to="">
              개인 프로젝트
              <span>1</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>

    <div class="sidebar__item-list sidebar__item-list--category">
      <div class="widget widget__box">
        <h2 class="sidebar__item-title widget__title">
          <i class="xi-library-books-o" aria-hidden="true"></i>
          <em>카테고리</em>
        </h2>

        <ul>
          <li>
            <router-link to="">
              개발노트
              <span>9</span>
            </router-link>
          </li>
          <li>
            <router-link to="">
              문제풀이
              <span>3</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'app-sidebar',
};
</script>

<style lang="scss">
@import '@/assets/scss/components/sidebar.scss';
</style>
