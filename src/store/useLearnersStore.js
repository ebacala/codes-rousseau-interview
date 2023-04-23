import { defineStore } from 'pinia'

import { capitalizeString } from '../services/string'

export const useLearnersStore = defineStore('learners', {
  state: () => ({
    learners: [],
  }),
  actions: {
    importLearners(learners) {
      this.learners = learners.map((learner) => {
        return {
          ...learner,
          firstName: capitalizeString(learner.firstName),
          lastName: learner.lastName.toUpperCase(),
          birthDate: new Date(learner.birthDate),
          notes: learner.notes.map((note) => {
            return {
              ...note,
              inputDate: new Date(note.inputDate),
            }
          }),
        }
      })
    },
    addNoteToLearner(learnerId, note) {
      this.$patch((state) => {
        const learner = this.getLearner(learnerId)
        learner.notes.push(note)
      })
    },
    deleteLearner(learnerId) {
      this.$patch((state) => {
        state.learners = state.learners.filter((learner) => learner.id !== learnerId)
      })
    },
    canCreateNewLearner(newLearner) {
      return (
        this.learners.find(
          (learner) =>
            learner.lastName === newLearner.lastName &&
            learner.firstName === newLearner.firstName &&
            learner.birthDate.getTime() === newLearner.birthDate.getTime()
        ) === undefined
      )
    },
    createLearner(newLearner) {
      this.$patch((state) => {
        state.learners.push({
          id: state.learners.length + 1,
          firstName: capitalizeString(newLearner.firstName),
          lastName: newLearner.lastName.toUpperCase(),
          birthDate: newLearner.birthDate,
          notes: [],
        })
      })
    },
  },
  getters: {
    getLearner(state) {
      return (learnerId) => state.learners.find((learner) => learner.id === learnerId)
    },
    getLearnerAverageNote(state) {
      return (learnerId) => {
        const learner = this.getLearner(learnerId)

        if (!learner.notes || learner.notes.length === 0) {
          return 'N.A'
        }

        return (
          learner.notes
            .map((note) => note.value)
            .reduce((previousValue, currentValue) => previousValue + currentValue, 0) / learner.notes.length.toFixed(2)
        )
      }
    },
    getLearnersThatGotNote(state) {
      return (pNote) => state.learners.filter((learner) => learner.notes.some((note) => note.value === pNote))
    },
  },
})
