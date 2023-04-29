<template>
  <div class="container">
    <table class="table">
      <thead>
        <tr>
          <th v-for="column of RESULTS_TABLE_COLUMNS" scope="col">
            {{ column }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="note of [...Array(41).keys()].reverse()">
          <td>{{ note }}</td>
          <td>
            {{
              store
                .getLearnersThatGotNote(note)
                .map((learner) => `${learner.lastName} ${learner.firstName}`)
                .join(', ')
            }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useLearnersStore } from '../store/useLearnersStore'

import { RESULTS_TABLE_COLUMNS } from '../constants/constants'

const store = useLearnersStore()
</script>

<style scoped></style>
