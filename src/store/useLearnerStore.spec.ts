import { beforeEach, describe, expect, test } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useLearnersStore } from './useLearnersStore'

const learner1 = {
        id: 1,
        lastName: 'TEST',
        firstName: 'Test',
        birthDate: new Date('1998-08-18'),
        notes: [
          {
            inputDate: new Date('2000-01-01'),
            value: 20
          },
           {
            inputDate: new Date('2001-01-01'),
            value: 30
          }
        ]
      }

const learner2 = {
        id: 2,
        lastName: 'TEST2',
        firstName: 'Test2',
        birthDate: new Date('2000-08-18'),
        notes: []
      }

describe('Learners Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    const store = useLearnersStore()
    store.learners = [
      learner1,
      learner2
    ]
  })  

  describe('Getters', () => {
    test('getLearner returns a learner', () => {
      const store = useLearnersStore()
      
      expect(store.getLearner(1)).toStrictEqual(learner1)
    })

    test('getLearner returns undefined', () => {
      const store = useLearnersStore()
      
      expect(store.getLearner(0)).toBeUndefined()
    })

    test('getLearnerAverageNote returns an average note', () => {
      const store = useLearnersStore()
      
      expect(store.getLearnerAverageNote(1)).toBe('25.00')
    })

    test('getLearnerAverageNote returns "N.A"', () => {
      const store = useLearnersStore()
      
      expect(store.getLearnerAverageNote(2)).toBe('N.A')
    })

    test('getLearnersThatGotNote returns []', () => {
      const store = useLearnersStore()
      
      expect(store.getLearnersThatGotNote(40)).toHaveLength(0)
    })

    test('getLearnersThatGotNote returns one learner', () => {
      const store = useLearnersStore()
      
      expect(store.getLearnersThatGotNote(20)).toHaveLength(1)
      expect(store.getLearnersThatGotNote(20)).toContainEqual(learner1)
    })
  })

  describe('Actions', () => {
    test('importLearners', () => {
      const store = useLearnersStore()
      store.importLearners([learner1])

      expect(store.learners).toHaveLength(1)
      expect(store.learners).toContainEqual(learner1)
    })

    test('addNoteToLearner', () => {
      const store = useLearnersStore()
      store.addNoteToLearner(1, {inputDate: new Date('2010-01-01'), value: 30})

      expect(store.getLearner(1)?.notes).toHaveLength(3)
    })

    test('deleteLearner', () => {
      const store = useLearnersStore()
      store.deleteLearner(1)

      expect(store.learners).toHaveLength(1)
      expect(store.getLearner(1)).toBeUndefined()
    })

    test('canCreateNewLearner returns true', () => {
      const store = useLearnersStore()

      expect(store.canCreateNewLearner({lastName: 'TEST', firstName: 'Test', birthDate: new Date('1999-08-18')})).toBeTruthy()
    })

    test('canCreateNewLearner returns false', () => {
      const store = useLearnersStore()

      expect(store.canCreateNewLearner({lastName: 'TEST', firstName: 'Test', birthDate: new Date('1998-08-18')})).toBeFalsy()
    })

    test('createNewLearner', () => {
      const store = useLearnersStore()

      store.createLearner({lastName: 'TEST', firstName: 'createNewLearner', birthDate: new Date('2000-08-18')})
      expect(store.learners).toHaveLength(3)
    })
  })
})