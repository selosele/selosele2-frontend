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

      <ui-button :type="'button'"
                 :color="'secondary'"
                 @click="onClose">닫기
      </ui-button>
    </div>
  </ui-form>
</template>

<script>
import UiForm from '@/components/shared/form/UiForm.vue';

export default {
  name: 'ui-split-form',
  props: {
    name: String,         // form name
    autocomplete: String  // form autocomplete
  },
  components: {
    UiForm,
  },
  methods: {
    onClose() {
      this.$store.commit('Splitter/TOGGLE', false);
      this.$emit('onClose');
    },
  },
}
</script>

<style lang="scss" scoped>

</style>