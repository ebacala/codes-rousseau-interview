<template>
  <Modal ref="modalNoteCreation" modalId="modal-note-creation">
    <template #title>Add a note to {{ learner.firstName }} {{ learner.lastName }}'s profile</template>
    <template #body>
      <form ref="formRef" class="row">
        <div class="mb-3">
          <label for="noteFormDateInput" class="form-label">Date</label>
          <input v-model="note.inputDate" type="date" class="form-control" id="noteFormDateInput" required />
          <div class="invalid-feedback">Please provide a valid date.</div>
        </div>
        <div class="mb-3">
          <label for="noteFormNoteInput" class="form-label">Note (between 0 and 40)</label>
          <input type="number" v-model="note.value" class="form-control" id="noteFormNoteInput" min="0" max="40" />
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
import { ref, reactive } from 'vue'
import { useLearnersStore } from '../../store/useLearnersStore'

import Modal from './Modal.vue'

const props = defineProps(['learner'])
const emit = defineEmits(['modalClosed'])

const store = useLearnersStore()

const modalNoteCreation = ref(null)

const formRef = ref(null)

let note = ref({
  value: -1,
  inputDate: new Date().toISOString().substring(0, 10),
})

const addNote = (event) => {
  event.preventDefault()
  event.stopPropagation()

  if (formRef.value.checkValidity()) {
    store.addNoteToLearner(props.learner.id, { ...note.value, inputDate: new Date(note.value.inputDate) })

    note.value = ''
    modalNoteCreation.value.closeModal()
    emit('modalClosed')
  }
}
</script>
