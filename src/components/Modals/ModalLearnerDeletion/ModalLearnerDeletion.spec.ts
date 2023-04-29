import { beforeEach, describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import ModalLearnerDeletion from './ModalLearnerDeletion.vue'

import { setActivePinia, createPinia } from 'pinia'
import { useLearnersStore } from '@/store/useLearnersStore'

const learner1 = {
  id: 1,
  lastName: 'TEST',
  firstName: 'Test',
  birthDate: new Date('1998-08-18'),
  notes: [
    {
      inputDate: new Date('2000-01-01'),
      value: 20,
    },
    {
      inputDate: new Date('2001-01-01'),
      value: 30,
    },
  ],
}

describe('ModalLearnerDeletion', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    const store = useLearnersStore()
    store.learners = [learner1]
  })

  test('Title contains learner last name and first name', async () => {
    const wrapper = mount(ModalLearnerDeletion, {
      props: {
        learner: learner1,
      }
    })

    expect(wrapper.html()).toContain("Delete Test TEST's profile")
  })

  test('Click on deletion button deletes the learner', async () => {
    const wrapper = mount(ModalLearnerDeletion, {
      props: {
        learner: learner1,
      }
    })

    const store = useLearnersStore()

    await wrapper.find('#modal-learner-deletion-delete-button').trigger('click')

    expect(store.getLearner(1)).toBeUndefined()
    expect(store.learners).toHaveLength(0)
  })
})
