import { beforeEach, describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import ModalNotesViewer from './ModalNotesViewer.vue'

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

describe('ModalNotesViewer', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    const store = useLearnersStore()
    store.learners = [learner1]
  })

  test('Title contains learner last name and first name', async () => {
    const wrapper = mount(ModalNotesViewer, {
      props: {
        learner: learner1,
      }
    })

    expect(wrapper.html()).toContain("Test TEST's notes")
  })

  test('chronologicallyInvertedSortedNotes computed property contains notes in the proper order', async () => {
    const wrapper = mount(ModalNotesViewer, {
      props: {
        learner: learner1,
      }
    })

    expect(wrapper.vm.chronologicallyInvertedSortedNotes).toHaveLength(2)
    expect(wrapper.vm.chronologicallyInvertedSortedNotes).toEqual([
      {
        inputDate: new Date('2001-01-01'),
        value: 30,
      },
      {
        inputDate: new Date('2000-01-01'),
        value: 20,
      }
    ])
  })

  test('chronologicallySortedNotes computed property contains notes in the proper order', async () => {
    const wrapper = mount(ModalNotesViewer, {
      props: {
        learner: learner1,
      }
    })

    expect(wrapper.vm.chronologicallySortedNotes).toHaveLength(2)
    expect(wrapper.vm.chronologicallySortedNotes).toEqual([
      {
        inputDate: new Date('2000-01-01'),
        value: 20,
      },
      {
        inputDate: new Date('2001-01-01'),
        value: 30,
      }
    ])
  })
})
