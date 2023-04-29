import { beforeEach, describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import ModalNoteCreation from './ModalNoteCreation.vue'

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

const learner2 = {
  id: 2,
  lastName: 'TEST2',
  firstName: 'Test2',
  birthDate: new Date('2000-08-18'),
  notes: [],
}

describe('ModalNoteCreation', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    const store = useLearnersStore()
    store.learners = [learner1, learner2]
  })

  test('Title contains learner last name and first name', async () => {
    const wrapper = mount(ModalNoteCreation, {
      props: {
        learner: learner1,
      }
    })

    expect(wrapper.html()).toContain("Add a note to Test TEST's profile")
  })

  test('Invalid form shows invalid feedback message', async () => {
    const wrapper = mount(ModalNoteCreation, {
      props: {
        learner: learner1,
      }
    })

    await wrapper.find('#noteFormNoteInput').setValue(-1)
    await wrapper.find('#modal-note-creation-submit-button').trigger('click')

    expect(wrapper.find('#noteFormNoteInput-invalid-feedback').isVisible()).toBeTruthy()
    expect(wrapper.find('#noteFormNoteInput').classes()).toContain('is-invalid')
  })

  test('Valid form submission adds a note', async () => {
    const wrapper = mount(ModalNoteCreation, {
      props: {
        learner: learner1,
      }
    })

    const store = useLearnersStore()

    await wrapper.find('#noteFormNoteInput').setValue(20)
    await wrapper.find('#modal-note-creation-submit-button').trigger('click')

    expect(store.getLearner(1).notes).toHaveLength(3)
  })
})
