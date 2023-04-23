<template>
  <Modal modalRef="modalRef" modalId="modal-notes-viewer" @modal-closed="emit('modalClosed')">
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
        <apexchart type="line" :options="chart.chartOptions" :series="chart.chartSeries"></apexchart>
      </div>
    </template>
  </Modal>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { useLearnersStore } from '../../store/useLearnersStore'

import Modal from './Modal.vue'

const props = defineProps(['learnerId'])
const emit = defineEmits(['modalClosed'])

const store = useLearnersStore()

let learner = ref('')
let chronologicallyInvertedSortedNotes = reactive([])
let chronologicallySortedNotes = reactive([])

watch(
  () => props.learnerId,
  (learnerId) => {
    learner.value = store.getLearner(learnerId)
    chronologicallyInvertedSortedNotes = [...learner.value.notes].sort(
      (a, b) => b.inputDate.getTime() - a.inputDate.getTime()
    )
    chronologicallySortedNotes = [...learner.value.notes].sort((a, b) => a.inputDate.getTime() - b.inputDate.getTime())
  }
)

const chart = computed(() => {
  return {
    chartSeries: [
      {
        name: 'Notes',
        data: chronologicallySortedNotes.map((note) => note.value),
      },
    ],
    chartOptions: {
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
        text: `${learner.value.lastName} ${learner.value.firstName}'s notes over time`,
        align: 'center',
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: chronologicallySortedNotes.map((note) => note.inputDate.toISOString().substring(0, 10)),
      },
    },
  }
})
</script>
