import { shallowMount } from '@vue/test-utils'
import GameBoard from '@/components/GameBoard.vue'

describe('GameBoard.vue', () => {
  it('checks 52 cards are generated', () => {

    const wrapper = shallowMount(GameBoard)

    expect(wrapper.vm.$data.deckCards.length).toBe(52)
  })
})