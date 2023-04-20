<template>
    <div class="container">
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
                    <td>{{ learner.birthDate }}</td>
                    <td>{{ computeAverageNote(learner.notes) }}</td>
                    <td><button type="button" class="btn btn-primary">See notes</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { useLearnersStore } from '../store/useLearnersStore'

import LearnerAvatar from '../components/LearnerAvatar.vue'
import { LEARNERS_TABLE_COLUMNS } from '../constants/constants'

const store = useLearnersStore()

const computeAverageNote = (notes) => {
    if (!notes || notes.length === 0) {
        return 'N.A'
    }
    return (
        notes.map((note) => note.value).reduce((previousValue, currentValue) => previousValue + currentValue, 0) /
        notes.length
    ).toFixed(2)
}

const hasANoteAbove35 = (notes) => {
    return notes.map((note) => note.value).filter((note) => note > 35).length > 0
}

const hasANoteBelow20 = (notes) => {
    return notes.map((note) => note.value).filter((note) => note < 20).length > 0
}
</script>

<style scoped>
.green-line > td {
    background-color: var(--bs-success);
}

.red-line > td {
    background-color: var(--bs-danger);
}
</style>
