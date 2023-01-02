import { shallowMount, mount } from '@vue/test-utils'
import GameBoard from '@/components/GameBoard.vue'
import Vue from 'vue'

describe('GameBoard.vue', () => {
  it('checks 52 cards are generated', () => {

    const wrapper = shallowMount(GameBoard)

    expect(wrapper.vm.$data.deckCards.length).toBe(52)
  })

  it('deals 2 cards each to player and dealer after starting game', async () => {
    const wrapper = mount(GameBoard)

    jest.useFakeTimers();
    
    // No cards have yet been dealt to player or dealer
    expect(wrapper.vm.$data.dealer.hand.length).toBe(0)
    expect(wrapper.vm.$data.dealer.hand.length).toBe(0)

    // Trigger start game button
    expect(wrapper.findAll('button').at(1).text()).toBe('Start game')
    await wrapper.findAll('button').at(1).trigger('click')

    // Fake first animation delay timer that gets called when start button is pressed
    jest.runOnlyPendingTimers()
    await Vue.nextTick()

    // Fake animation delay timers for first 4 cards dealt on start
    for (let i = 0; i < 4; i++) {
        jest.runOnlyPendingTimers()
        await Vue.nextTick()
    }
    
    // Player and dealer should now have 2 cards each
    expect(wrapper.vm.$data.dealer.hand.length).toBe(2)
    expect(wrapper.vm.$data.dealer.hand.length).toBe(2)
  })
})