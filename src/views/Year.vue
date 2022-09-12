<template>
  <div class="year__wrapper">
    <h2 class="year__list-title">
      <button type="button" data-year="2022" class="year__list-btn year__list-btn--active"><span class="year__list-name">2022</span>년에 작성된 포스트 (<span class="sr-only">개수 : </span>7)</button>
    </h2>

    <ul id="list_2022" data-year="2022" class="year__list" style="display: block">
      <li>
        <router-link to="">
          <strong class="year__title">Spring 순환참조 문제 해결</strong>
          <span class="year__date">2022.08.15</span>
        </router-link>
      </li>
      <li>
        <router-link to="">
          <strong class="year__title">HttpServletRequest 객체에 직접 접근하는 방법</strong>
          <span class="year__date">2022.07.08</span>
        </router-link>
      </li>
      <li>
        <router-link to="">
          <strong class="year__title">윈도우 작업스케줄러 실행이 안되는 현상 해결</strong>
          <span class="year__date">2022.04.11</span>
        </router-link>
      </li>
      <li>
        <router-link to="">
          <strong class="year__title">iBATIS에서 테이블 join하는 방법 (with Java)</strong>
          <span class="year__date">2022.03.26</span>
        </router-link>
      </li>
      <li>
        <router-link to="">
          <strong class="year__title">C언어의 strcat 함수에 대한 이해</strong>
          <span class="year__date">2022.02.20</span>
        </router-link>
      </li>
      <li>
        <router-link to="">
          <strong class="year__title">Java 삽질기록</strong>
          <span class="year__date">2022.02.09</span>
        </router-link>
      </li>
      <li>
        <router-link to="">
          <strong class="year__title">Programmers Java 문제풀이 - 가장 큰 수</strong>
          <span class="year__date">2022.01.22</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Year',
};
</script>

<style lang="scss">
@import '@/assets/scss/components/year.scss';
</style>
