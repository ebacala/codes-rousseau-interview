import { defineStore } from 'pinia'

export const useLearnersStore = defineStore('learners', {
  state: () => ({
    learners: [],
  }),
  actions: {
    importLearners(learners) {
      this.learners = learners.map((learner) => {
        return {
          ...learner,
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
          firstName: newLearner.firstName,
          lastName: newLearner.lastName,
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
    getLearnersWithAverageNote(state) {
      return (averageNote) => state.learners.filter((learner) => this.getLearnerAverageNote(learner.id) === averageNote)
    },
  },
})
