import { shallowMount } from '@vue/test-utils'
import Message from '@/components/Message.vue'

describe('Message.vue', () => {
  it('renders props.content when passed', () => {
    const content = 'new message';
    const wrapper = shallowMount(Message, {
      propsData: { content }
    });
    expect(wrapper.text()).toMatch(content)
  });
});
