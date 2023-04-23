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
import { reactive, ref, watch } from 'vue'
import { useLearnersStore } from '../../store/useLearnersStore'

import Modal from './Modal.vue'

const props = defineProps(['learnerId'])
const emit = defineEmits(['modalClosed'])

const store = useLearnersStore()

let learner = ref('')
let chronologicallyInvertedSortedNotes = ref('')
let chronologicallySortedNotes = ref('')
let chart = reactive({
  chartSeries: [],
  chartOptions: {},
})

watch(
  () => props.learnerId,
  (learnerId) => {
    learner.value = store.getLearner(learnerId)
    chronologicallyInvertedSortedNotes.value = learner.value.notes.sort(
      (a, b) => b.inputDate.getTime() - a.inputDate.getTime()
    )
    chronologicallySortedNotes.value = learner.value.notes.sort((a, b) => a.inputDate.getTime() - b.inputDate.getTime())
    generateChart()
  }
)

const generateChart = () => {
  chart.chartSeries = [
    {
      name: 'Notes',
      data: chronologicallySortedNotes.value.map((note) => note.value),
    },
  ]

  chart.chartOptions = {
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
      categories: chronologicallySortedNotes.value?.map((note) => note.inputDate.toISOString().substring(0, 10)),
    },
  }
}
</script>
```
