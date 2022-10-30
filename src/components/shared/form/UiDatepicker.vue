<template>
  <Datepicker
    :format="format"
    :locale="locale"
    :modelValue="dateValue"
    @cleared="$emit('onClear')"
    @update:modelValue="$emit('update:modelValue', dateValue)"
  >
  </Datepicker>
</template>

<script>
import Datepicker from '@vuepic/vue-datepicker';

export default {
  name: 'ui-datepicker',
  components: {
    Datepicker,
  },
  props: {
    format: {
      type: String,
      default: 'yyyy-MM-dd',
    },
    locale: {
      type: String,
      default: 'kr',
    },
    dateValue: String,
  },
}
</script>

<style lang="scss">

</style>