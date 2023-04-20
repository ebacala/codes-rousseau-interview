import { defineStore } from 'pinia'

export const useLearnersStore = defineStore('learners', {
    state: () => ({
        learners: [],
    }),
    actions: {
        importLearners(learners) {
            this.learners = learners
        },
    },
})
