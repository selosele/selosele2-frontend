<template>
  <div class="widget__config">
    <button type="button" id="widget" class="btn widget__btn widget__btn--config">위젯관리</button>

    <button type="button" id="widget_save" class="btn widget__btn widget__btn--save">저장</button>

    <div id="widget_use" class="widget__list" hidden="">
      <h2>미사용 위젯</h2>

      <input type="checkbox" name="widget_use" data-id="4" id="widget_use4" value="Y" />
      <label for="widget_use4">방문자 정보</label>

      <input type="checkbox" name="widget_use" data-id="3" id="widget_use3" value="Y" />
      <label for="widget_use3">인기글</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppWidgetConfig',
};
</script>

<style lang="scss">
@import '@/assets/scss/components/widget.scss';
</style>
