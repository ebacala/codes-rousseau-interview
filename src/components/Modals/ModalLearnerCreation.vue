<template>
  <Modal ref="modalLearnerCreation" modal-id="modal-learner-creation">
    <template #title>Create a new learner profile</template>
    <template #body>
      <form ref="formRef" class="row">
        <div class="mb-3">
          <label for="learnerFormLastNameInput" class="form-label">Last Name</label>
          <input
            id="learnerFormLastNameInput"
            v-model="newLearner.lastName"
            type="text"
            class="form-control"
            required
          />
          <div class="invalid-feedback">Please provide a last name.</div>
        </div>

        <div class="mb-3">
          <label for="learnerFormFirstNameInput" class="form-label">First Name</label>
          <input
            id="learnerFormFirstNameInput"
            v-model="newLearner.firstName"
            type="text"
            class="form-control"
            required
          />
          <div class="invalid-feedback">Please provide a first name.</div>
        </div>

        <div class="mb-3">
          <label for="learnerFormDateInput" class="form-label">Birth Date</label>
          <input id="learnerFormDateInput" v-model="newLearner.birthDate" type="date" class="form-control" required />
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

  // For some unknown reason, the form validation messages stopped working on their own, so this is a bypass
  for (const element of formRef.value.elements) {
    if (!element.checkValidity()) {
      element.classList.add('is-invalid')
    }
  }

  if (formRef.value.checkValidity()) {
    if (store.canCreateNewLearner({ ...newLearner.value, birthDate: new Date(newLearner.value.birthDate) })) {
      store.createLearner({ ...newLearner.value, birthDate: new Date(newLearner.value.birthDate) })

      newLearner.value = ''
      modalLearnerCreation.value.closeModal()
    } else {
      window.alert('This learner aleady exists!')
    }
  }
}
</script>
