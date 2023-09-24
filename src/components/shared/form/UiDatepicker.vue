<template>
  <Datepicker
    :format="format"
    :locale="locale"
    :modelValue="dateValue"
    @cleared="$emit('clear')"
    @update:modelValue="$emit('update:modelValue', dateValue)"
  />
</template>

<script>
import Datepicker from '@vuepic/vue-datepicker';

export default {
  name: 'UiDatepicker',
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

<style lang="scss" scoped>

</style>