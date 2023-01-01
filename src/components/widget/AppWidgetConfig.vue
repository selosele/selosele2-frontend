<template>
  <div class="widget__wrapper">
    <div class="widget__config">
      <ui-button :class="'widget__btn widget__btn--config'"
                 @click="toggleList">위젯관리
      </ui-button>

      <ui-button :class="'widget__btn widget__btn--save'"
                 v-if="!listHidden">저장
      </ui-button>
  
      <div class="widget__list" v-if="!listHidden">
        <h2>미사용 위젯</h2>

        <ui-checkbox :name="'useYn'"
                     :id="'useYn2'"
                     :label="'인기글'"
                     :values="'Y,N'">
        </ui-checkbox>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app-widget-config',
  data() {
    return {
      listHidden: true,
    }
  },
  methods: {
    /** 위젯관리 버튼 클릭 시 */
    toggleList() {
      this.listHidden = !this.listHidden;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/widget.scss';
</style>
