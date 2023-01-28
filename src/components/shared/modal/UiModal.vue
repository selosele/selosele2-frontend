<template>
  <vue-final-modal
    v-slot="{ close }"
    v-bind="$attrs"
    classes="modal-container"
    content-class="modal-content"
    :name="name"
    >
    <button class="modal__close" title="팝업 닫기" @click="close">
      <i class="xi-close"></i>
    </button>

    <span class="modal__title">{{ title }}</span>
    
    <div class="modal__content">
      <slot></slot>
    </div>
  </vue-final-modal>
</template>

<script>
import { VueFinalModal } from 'vue-final-modal';

export default {
  inheritAttrs: false,
  name: 'ui-modal',
  props: {
    /** Modal title */
    title: String,
    /** Modal name */
    name: String,
  },
  components: {
    VueFinalModal,
  },
}
</script>

<style scoped>
:deep(.modal-container) {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 4rem);
  margin: auto;
}
:deep(.modal-content) {
  overflow: auto;
  display: flex;
  flex-direction: column;
  position: relative;
  max-height: 100%;
  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #fff;
}
.modal__title {
  display: block;
  margin: 0 2rem 1rem 0;
  font-size: 1.3rem;
  font-weight: 700;
}
.modal__close {
  position: absolute;
  top: 0;
  right: 0;
  width: 2rem;
  height: 2rem;
  background-color: transparent;
}
.dark-mode div:deep(.modal-content) {
  border-color: #2d3748;
  background-color: #1a202c;
}
</style>