<template>
  <Modal modalRef="modalRef" id="modal-notes-viewer">
    <template #title>{{ learner.firstName }} {{ learner.lastName }}'s notes</template>
    <template #body>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Note</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="note of chronologicallyInvertedSortedNotes"
            :class="{
              'green-line': note.value > 35,
              'red-line': note.value < 20,
            }"
          >
            <td>
              {{ note.inputDate.toISOString().substring(0, 10) }}
            </td>
            <td>{{ note.value }}</td>
          </tr>
        </tbody>
      </table>
      <!-- <div id="chart">
                        <apexchart type="line" :options="chartOptions" :series="chartSeries"></apexchart>
                    </div> -->
    </template>
  </Modal>
</template>

<script setup>
import { computed } from 'vue'

import Modal from './Modal.vue'

const props = defineProps(['learner'])

const chronologicallyInvertedSortedNotes = computed(() =>
  props.learner.notes?.sort((a, b) => b.inputDate.getTime() - a.inputDate.getTime())
)
</script>
