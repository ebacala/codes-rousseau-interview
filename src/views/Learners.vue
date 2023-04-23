<template>
  <div class="container">
    <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modal-learner-creation">
      New learner
    </button>
    <table class="table">
      <thead>
        <tr>
          <th scope="col" v-for="column of LEARNERS_TABLE_COLUMNS">
            {{ column }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="learner of store.learners"
          :class="{
            'green-line': hasANoteAbove35(learner.notes),
            'red-line': hasANoteBelow20(learner.notes),
          }"
        >
          <td>
            <LearnerAvatar :firstName="learner.firstName" :lastName="learner.lastName" />
          </td>
          <td>{{ learner.lastName }}</td>
          <td>{{ learner.firstName }}</td>
          <td>
            {{ learner.birthDate.toISOString().substring(0, 10) }}
          </td>
          <td>{{ store.getLearnerAverageNote(learner.id) }}</td>
          <td>
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-toggle="modal"
              data-bs-target="#modal-notes-viewer"
              @click="selectedLearner = learner"
            >
              See notes
            </button>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#modal-note-creation"
              @click="selectedLearner.value = learner"
            >
              Add a note
            </button>
            <button
              type="button"
              class="btn btn-danger"
              data-bs-toggle="modal"
              data-bs-target="#modal-learner-deletion"
              @click="selectedLearner.value = learner"
            >
              Delete learner
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <ModalNotesViewer :learner="selectedLearner" />
    <ModalNoteCreation :learner="selectedLearner" />
    <ModalLearnerDeletion :learner="selectedLearner" />
    <ModalLearnerCreation />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useLearnersStore } from '../store/useLearnersStore'

import LearnerAvatar from '../components/LearnerAvatar.vue'
import ModalNotesViewer from '../components/Modals/ModalNotesViewer.vue'
import ModalNoteCreation from '../components/Modals/ModalNoteCreation.vue'
import ModalLearnerDeletion from '../components/Modals/ModalLearnerDeletion.vue'
import ModalLearnerCreation from '../components/Modals/ModalLearnerCreation.vue'

import { LEARNERS_TABLE_COLUMNS } from '../constants/constants'

const store = useLearnersStore()

let selectedLearner = ref('')

const hasANoteAbove35 = (notes) => {
  return notes.map((note) => note.value).filter((note) => note > 35).length > 0
}

const hasANoteBelow20 = (notes) => {
  return notes.map((note) => note.value).filter((note) => note < 20).length > 0
}
</script>

<style scoped></style>
