<template>
  <span class="write__tag__item__wrapper">
    <span class="write__tag__item">
      <ui-hidden-field :name="'id'" :value="tag.id"></ui-hidden-field>
      <ui-hidden-field :name="'addTagYn'" :value="tag.addTagYn"></ui-hidden-field>
  
      <ui-text-field :type="'text'"
                     :name="'tag' + tag.id"
                     :class="'write__tag'"
                     :title="'태그명 입력(50자 이내)'"
                     :placeholder="'태그명 입력(50자 이내)'"
                     :rules="'max:50'"
                     :value="tag.name"
                     @onchange="onChange">
      </ui-text-field>
    </span>
  </span>
</template>

<script>
export default {
  name: 'app-save-post-tag',
  props: {
    /** 추가한 태그 */
    tag: Object,
  },
  data() {
    return {
      tagName: '',
    }
  },
  methods: {
    /** 태그명 변경 시 */
    onChange(value) {
      this.tagName = value;
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/post-save-tag.scss';
</style>