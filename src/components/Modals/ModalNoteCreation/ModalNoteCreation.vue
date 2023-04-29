<template>
  <Modal ref="modalNoteCreation" modal-id="modal-note-creation">
    <template #title>Add a note to {{ learner.firstName }} {{ learner.lastName }}'s profile</template>
    <template #body>
      <form ref="formRef" class="row">
        <div class="mb-3">
          <label for="noteFormDateInput" class="form-label">Date</label>
          <input id="noteFormDateInput" v-model="note.inputDate" type="date" class="form-control" required />
          <div class="invalid-feedback">Please provide a valid date.</div>
        </div>
        <div class="mb-3">
          <label for="noteFormNoteInput" class="form-label">Note (between 0 and 40)</label>
          <input id="noteFormNoteInput" v-model="note.value" type="number" class="form-control" min="0" max="40" />
          <div class="invalid-feedback">Please provide a note between 0 and 40.</div>
        </div>
      </form>
    </template>
    <template #footer>
      <button class="btn btn-primary" type="submit" @click="addNote">Add note</button>
    </template>
  </Modal>
</template>

<script setup>
import { ref } from 'vue'
import { useLearnersStore } from '../../../store/useLearnersStore'

import Modal from '@/components/Modals/Modal/Modal.vue'

const props = defineProps(['learner'])

const store = useLearnersStore()

let note = ref({
  value: 0,
  inputDate: new Date().toISOString().substring(0, 10),
})

const modalNoteCreation = ref(null)
const formRef = ref(null)

const addNote = (event) => {
  event.preventDefault()
  event.stopPropagation()

  // For some unknown reason, the form validation messages stopped working on their own, so this is a bypass
  for (const element of formRef.value.elements) {
    if (!element.checkValidity()) {
      element.classList.add('is-invalid')
    }
  }

  if (formRef.value.checkValidity()) {
    store.addNoteToLearner(props.learner.id, {
      value: note.value.value,
      inputDate: new Date(note.value.inputDate),
    })

    note.value = {
      value: 0,
      inputDate: new Date().toISOString().substring(0, 10),
    }
    modalNoteCreation.value.closeModal()
  }
}
</script>
