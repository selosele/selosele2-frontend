<template>
  <vue-final-modal
    v-slot="{ close }"
    v-bind="$attrs"
    classes="modal-container"
    :content-class="{ 'modal-content': true, 'modal--full': full }"
    :name="name"
    >
    <ui-icon-button
      :icon="'xi-close'"
      :text="'팝업 닫기'"
      title="팝업 닫기"
      :class="'modal__close'"
      @click="close"
    />

    <h2 class="modal__title">
      {{ title }}
    </h2>
    
    <div class="modal__content">
      <slot />
    </div>
  </vue-final-modal>
</template>

<script>
import { VueFinalModal } from 'vue-final-modal';

export default {
  name: 'UiModal',
  props: {
    /** Modal title */
    title: String,
    /** Modal name */
    name: String,
    /** Modal 화면을 꽉 채울지 여부 */
    full: {
      type: Boolean,
      default: false
    },
  },
  components: {
    VueFinalModal,
  },
}
</script>

<style lang="scss" scoped>
:deep(.modal-container) {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 4rem);
  margin: auto;

  .modal {
    &__title {
      display: block;
      margin: 0 2rem 1rem 0;
      font-size: 1.3rem;
      font-weight: 700;
    }

    &__close {
      position: absolute;
      top: 0;
      right: 0;
      width: 2rem;
      min-width: 0;
      height: 2rem;
      padding: 0;
      background-color: transparent;
      box-shadow: none;
      text-shadow: none;
    }

    &--full {
      width: 100%;
    }
  }
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

.dark-mode div:deep(.modal-content) {
  border-color: #2d3748;
  background-color: #1a202c;
}
</style>