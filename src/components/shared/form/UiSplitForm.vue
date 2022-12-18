<template>
  <ui-form :name="name"
           :ref="name"
           :autocomplete="autocomplete"
           v-slot="{ validateAll, validateField }"
  >
    <slot :validateAll="validateAll"
          :validateField="validateField">
    </slot>

    <div class="d-flex gap--10 mt--15">
      <ui-button :type="'submit'"
                 :color="'primary'">저장
      </ui-button>

      <ui-button :color="'dark'"
                 @click="onRemove"
                 v-if="btnRemove">삭제
      </ui-button>

      <ui-button :color="'secondary'"
                 @click="onClose">닫기
      </ui-button>
    </div>
  </ui-form>
</template>

<script>
export default {
  name: 'ui-split-form',
  props: {
    /** form name */
    name: String,
    /** form autocomplete */
    autocomplete: String,
    /** 삭제 버튼 사용 여부 */
    btnRemove: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    /** 닫기 */
    onClose() {
      this.$store.commit('Splitter/TOGGLE', false);
      this.$emit('onClose');
    },
    /** 삭제 */
    onRemove() {
      this.$emit('onRemove', this.getFormValues(this.$refs[this.name].$el));
    },
    /** form values 가져오기 */
    getFormValues(form) {
      return Object.fromEntries(new FormData(form));
    }
  },
}
</script>

<style lang="scss" scoped>

</style>