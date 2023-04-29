import { beforeEach, describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import ModalLearnerCreation from './ModalLearnerCreation.vue'

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

describe('ModalLearnerCreation', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    const store = useLearnersStore()
    store.learners = [learner1]
  })

  test('Title contains correct test', async () => {
    const wrapper = mount(ModalLearnerCreation)

    expect(wrapper.html()).toContain("Create a new learner profile")
  })

  test('Invalid form shows invalid feedback message', async () => {
    const wrapper = mount(ModalLearnerCreation)

    await wrapper.find('#learnerFormFirstNameInput').setValue("")
    await wrapper.find('#modal-learner-creation-submit-button').trigger('click')

    expect(wrapper.find('#learnerFormFirstNameInput-invalid-feedback').isVisible()).toBeTruthy()
    expect(wrapper.find('#learnerFormFirstNameInput').classes()).toContain('is-invalid')
    expect(wrapper.find('#learnerFormFirstNameInput-invalid-feedback').html()).toContain('Please provide a first name.')
  })

  test('Valid form submission adds a learner', async () => {
    const wrapper = mount(ModalLearnerCreation)

    const store = useLearnersStore()

    await wrapper.find('#learnerFormLastNameInput').setValue("CREATION")
    await wrapper.find('#learnerFormFirstNameInput').setValue("Creation")
    await wrapper.find('#learnerFormBirthDateInput').setValue("1998-08-18")
    await wrapper.find('#modal-learner-creation-submit-button').trigger('click')

    expect(store.learners).toHaveLength(2)
    expect(store.learners).toEqual([
      learner1,
      {
        id: 2,
        lastName: "CREATION",
        firstName: 'Creation',
        birthDate: new Date('1998-08-18'),
        notes: []
      }
    ])
  })
})
