<template>
  <div ref="modalRef" class="modal fade" :id="modalId" tabindex="-1" :aria-labelledby="modalId" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" :id="modalId"><slot name="title"></slot></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>

        <div class="modal-footer">
          <slot name="footer"></slot>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { Modal } from 'bootstrap'

const props = defineProps(['modalId'])

const modalRef = ref(null)
const closeModal = () => Modal.getInstance(modalRef.value)?.hide()

defineExpose({
  closeModal,
})
</script>
