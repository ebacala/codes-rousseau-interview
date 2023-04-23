<template>
    <div class="container">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col" v-for="column of RESULTS_TABLE_COLUMNS">
                        {{ column }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="averageNote of [...Array(40).keys()]">
                    <td>{{ averageNote }}</td>
                    <td>
                        {{
                            store
                                .getLearnersWithAverageNote(averageNote)
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
