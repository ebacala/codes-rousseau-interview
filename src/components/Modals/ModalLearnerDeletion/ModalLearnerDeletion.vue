<template>
  <Modal ref="modalLearnerDeletion" modal-id="modal-learner-deletion">
    <template #title>Delete {{ learner.firstName }} {{ learner.lastName }}'s profile</template>
    <template #body>
      <p>Do you wish to delete {{ learner.firstName }} {{ learner.lastName }}'s profile?</p>
    </template>
    <template #footer>
      <button id="modal-learner-deletion-delete-button" type="button" class="btn btn-danger" @click="deleteLearner">
        Confirm deletion
      </button>
    </template>
  </Modal>
</template>

<script setup>
import { ref } from 'vue'
import { useLearnersStore } from '@/store/useLearnersStore'

import Modal from '@/components/Modals/Modal/Modal.vue'

const props = defineProps(['learner'])

const store = useLearnersStore()

const modalLearnerDeletion = ref(null)

const deleteLearner = (event) => {
  event.preventDefault()
  event.stopPropagation()

  store.deleteLearner(props.learner.id)

  modalLearnerDeletion.value.closeModal()
}
</script>
