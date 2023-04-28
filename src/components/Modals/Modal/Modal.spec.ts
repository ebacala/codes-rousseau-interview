import { describe, expect, test } from 'vitest'
import { mount } from "@vue/test-utils";

import Modal from "./Modal.vue";

describe('Modal', () => {
  test("Slots", async () => {
   const wrapper = mount(Modal, {
      props: {
        id: 'testModal'
      },
       slots: {
          title: "Test Title",
          body: 'Test Body',
          footer: 'Test Footer'
       },
   });
   
   expect(wrapper.html()).toContain('Test Title')
   expect(wrapper.html()).toContain('Test Body')
   expect(wrapper.html()).toContain('Test Footer')
}),
test("Props and Close Button", async () => {
   const wrapper = mount(Modal, {
      props: {
        modalId: 'testModal'
      },
       slots: {
          title: "Test Title",
          body: 'Test Body',
          footer: 'Test Footer'
       },
   });

   await wrapper.find('#testModal-close-button').trigger('click')

   expect(wrapper.emitted().modalClosed).toHaveLength(1)
})
})
