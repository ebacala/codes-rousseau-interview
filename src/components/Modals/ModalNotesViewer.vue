<template>
  <Modal modalId="modal-notes-viewer">
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
      <div id="chart">
        <apexchart type="line" :options="chartOptions" :series="chartSeries"></apexchart>
      </div>
    </template>
  </Modal>
</template>

<script setup>
import { computed } from 'vue'

import Modal from './Modal/Modal.vue'

const props = defineProps(['learner'])

const chronologicallyInvertedSortedNotes = computed(() =>
  [...props.learner.notes].sort((a, b) => b.inputDate.getTime() - a.inputDate.getTime())
)

const chronologicallySortedNotes = computed(() =>
  [...props.learner.notes].sort((a, b) => a.inputDate.getTime() - b.inputDate.getTime())
)

const chartSeries = computed(() => [
  {
    name: 'Notes',
    data: chronologicallySortedNotes.value.map((note) => note.value),
  },
])
const chartOptions = computed(() => {
  return {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
    },
    title: {
      text: `${props.learner.lastName} ${props.learner.firstName}'s notes over time`,
      align: 'center',
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: chronologicallySortedNotes.value.map((note) => note.inputDate.toISOString().substring(0, 10)),
    },
  }
})
</script>
