<template>
  <Form ref="form"
        @submit="$emit('onSubmit')"
        @reset="$emit('onReset')">
    <slot />
  </Form>
</template>

<script>
import { Form } from 'vee-validate';

export default {
  name: 'UiForm',
  components: {
    Form,
  },
}
</script>

<style lang="scss">

</style>