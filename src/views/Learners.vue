<template>
  <div class="container">
    <ModalNotesViewer :learner="selectedLearner" />
    <ModalNoteCreation :learnerId="selectedLearnerId" />
    <ModalLearnerDeletion :learnerId="selectedLearnerId" @modal-closed="getLearnersFromStore" />
    <ModalLearnerCreation @modal-closed="getLearnersFromStore" />
    <div class="row d-flex flex-row align-items-center justify-content-center m-2">
      <button
        type="button"
        class="btn btn-success col-sm-2 col-4"
        data-bs-toggle="modal"
        data-bs-target="#modal-learner-creation"
      >
        New learner
      </button>
    </div>
    <div v-if="windowWidth >= 768" class="row">
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
            v-for="learner of store.$state.learners"
            :class="{
              'green-line': hasANoteAbove35(learner.notes),
              'red-line': hasANoteBelow20(learner.notes),
            }"
          >
            <td class="align-middle">
              <LearnerAvatar :firstName="learner.firstName" :lastName="learner.lastName" />
            </td>
            <td class="align-middle">{{ learner.lastName }}</td>
            <td class="align-middle">{{ learner.firstName }}</td>
            <td class="align-middle">
              {{ learner.birthDate.toISOString().substring(0, 10) }}
            </td>
            <td class="align-middle">{{ store.getLearnerAverageNote(learner.id) }}</td>
            <td class="align-middle">
              <button
                type="button"
                class="btn btn-secondary m-1 col-3"
                data-bs-toggle="modal"
                data-bs-target="#modal-notes-viewer"
                @click="selectedLearner = learner"
              >
                See notes
              </button>
              <button
                type="button"
                class="btn btn-primary m-1 col-3"
                data-bs-toggle="modal"
                data-bs-target="#modal-note-creation"
                @click="selectedLearnerId = learner.id"
              >
                Add note
              </button>
              <button
                type="button"
                class="btn btn-danger m-1 col-4"
                data-bs-toggle="modal"
                data-bs-target="#modal-learner-deletion"
                @click="selectedLearnerId = learner.id"
              >
                Delete learner
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="row">
      <div class="card col-11 m-3" v-for="learner of store.learners">
        <div class="row d-flex flex-row align-items-center justify-content-between">
          <LearnerAvatar :firstName="learner.firstName" :lastName="learner.lastName" />
          <button
            type="button"
            class="btn btn-secondary w-50 m-2"
            data-bs-toggle="modal"
            data-bs-target="#modal-notes-viewer"
            @click="selectedLearner = learner"
          >
            See notes
          </button>
        </div>
        <div class="card-body">
          <div class="row d-flex flex-row align-items-center justify-content-between">
            <h5 class="card-title w-50">{{ `${learner.lastName} ${learner.firstName}` }}</h5>
            <button
              type="button"
              class="btn btn-danger w-25 m-2"
              data-bs-toggle="modal"
              data-bs-target="#modal-learner-deletion"
              @click="selectedLearnerId = learner.id"
            >
              🗑️
            </button>
          </div>

          <div class="row">
            <p class="card-text">Birth date: {{ learner.birthDate.toISOString().substring(0, 10) }}</p>
          </div>

          <div class="row d-flex flex-row align-items-center justify-content-between">
            <p class="card-text w-50">Average note: {{ store.getLearnerAverageNote(learner.id) }}</p>
            <button
              type="button"
              class="btn btn-primary w-auto"
              data-bs-toggle="modal"
              data-bs-target="#modal-note-creation"
              @click="selectedLearnerId = learner.id"
            >
              Add note
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useLearnersStore } from '../store/useLearnersStore'

import LearnerAvatar from '../components/LearnerAvatar.vue'
import ModalNotesViewer from '../components/Modals/ModalNotesViewer.vue'
import ModalNoteCreation from '../components/Modals/ModalNoteCreation.vue'
import ModalLearnerDeletion from '../components/Modals/ModalLearnerDeletion.vue'
import ModalLearnerCreation from '../components/Modals/ModalLearnerCreation.vue'

import { LEARNERS_TABLE_COLUMNS } from '../constants/constants'

const store = useLearnersStore()

let windowWidth = ref(window.innerWidth)

let selectedLearnerId = ref('')
let selectedLearner = ref({
  id: -1,
  lastName: '',
  firstName: '',
  birthDate: '',
  notes: [],
})

onMounted(() => {
  nextTick(() => {
    window.addEventListener('resize', onWindowResize)
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onWindowResize)
})

const onWindowResize = () => {
  windowWidth.value = window.innerWidth
}

const hasANoteAbove35 = (notes) => {
  return notes.map((note) => note.value).filter((note) => note > 35).length > 0
}

const hasANoteBelow20 = (notes) => {
  return notes.map((note) => note.value).filter((note) => note < 20).length > 0
}
</script>

<style scoped></style>
