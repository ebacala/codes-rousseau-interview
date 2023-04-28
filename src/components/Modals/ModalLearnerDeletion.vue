<template>
  <Modal ref="modalLearnerDeletion" modalId="modal-learner-deletion">
    <template #title>Delete {{ learner.firstName }} {{ learner.lastName }}'s profile</template>
    <template #body>
      <p>Do you wish to delete {{ learner.firstName }} {{ learner.lastName }}'s profile?</p>
    </template>
    <template #footer>
      <button type="button" class="btn btn-danger" @click="deleteLearner">Confirm deletion</button>
    </template>
  </Modal>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useLearnersStore } from '../../store/useLearnersStore'

import Modal from './Modal/Modal.vue'

const props = defineProps(['learnerId'])
const emit = defineEmits(['modalClosed'])

const store = useLearnersStore()

let learner = ref('')

watch(
  () => props.learnerId,
  (learnerId) => {
    learner.value = store.getLearner(learnerId)
  }
)

const modalLearnerDeletion = ref(null)

const deleteLearner = (event) => {
  event.preventDefault()
  event.stopPropagation()

  store.deleteLearner(learner.value.id)

  modalLearnerDeletion.value.closeModal()
  emit('modalClosed')
}
</script>
