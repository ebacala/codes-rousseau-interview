<template>
  <Modal ref="modalLearnerCreation" modalId="modal-learner-creation">
    <template #title>Create a new learner profile</template>
    <template #body>
      <form ref="formRef" class="row">
        <div class="mb-3">
          <label for="learnerFormLastNameInput" class="form-label">Last Name</label>
          <input
            v-model="newLearner.lastName"
            type="text"
            class="form-control"
            id="learnerFormLastNameInput"
            required
          />
          <div class="invalid-feedback">Please provide a last name.</div>
        </div>

        <div class="mb-3">
          <label for="learnerFormFirstNameInput" class="form-label">First Name</label>
          <input
            v-model="newLearner.firstName"
            type="text"
            class="form-control"
            id="learnerFormFirstNameInput"
            required
          />
          <div class="invalid-feedback">Please provide a first name.</div>
        </div>

        <div class="mb-3">
          <label for="learnerFormDateInput" class="form-label">Birth Date</label>
          <input v-model="newLearner.birthDate" type="date" class="form-control" id="learnerFormDateInput" required />
          <div class="invalid-feedback">Please provide a valid birth date.</div>
        </div>
      </form>
    </template>
    <template #footer>
      <button class="btn btn-primary" type="submit" @click="createLearner">Create the learner's profile</button>
    </template>
  </Modal>
</template>

<script setup>
import { ref } from 'vue'
import { useLearnersStore } from '../../store/useLearnersStore'

import Modal from './Modal/Modal.vue'

const emit = defineEmits(['modalClosed'])

const store = useLearnersStore()

let newLearner = ref({
  firstName: '',
  lastName: '',
  birthDate: '',
})

const modalLearnerCreation = ref(null)
const formRef = ref(null)

const createLearner = (event) => {
  event.preventDefault()
  event.stopPropagation()

  if (formRef.value.checkValidity()) {
    if (store.canCreateNewLearner({ ...newLearner.value, birthDate: new Date(newLearner.value.birthDate) })) {
      store.createLearner({ ...newLearner.value, birthDate: new Date(newLearner.value.birthDate) })

      newLearner.value = ''
      modalLearnerCreation.value.closeModal()
      emit('modalClosed')
    } else {
      window.alert('This learner aleady exists!')
    }
  }
}
</script>
