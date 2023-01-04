import { shallowMount, mount } from '@vue/test-utils'
import GameBoard from '@/components/GameBoard.vue'
import Vue from 'vue'

describe('GameBoard.vue', () => {
    let wrapper

    async function startGame (){
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
        for (let i = 0; i < 4*3; i++) {
            jest.runOnlyPendingTimers()
            await Vue.nextTick()
            jest.runOnlyPendingTimers()
            await Vue.nextTick()
            jest.runOnlyPendingTimers()
            await Vue.nextTick()
        }
    } 

    async function restartGame () {
        // Wait for game to restart
        jest.runOnlyPendingTimers()
        await Vue.nextTick()

        // Fake animation delay timers for first 4 cards dealt on start
        for (let i = 0; i < 4*3; i++) {
            jest.runOnlyPendingTimers()
            await Vue.nextTick()
            jest.runOnlyPendingTimers()
            await Vue.nextTick()
            jest.runOnlyPendingTimers()
            await Vue.nextTick()
        }
    }

    async function pressHit () {
        // Check HIT button is not disabled
        expect(wrapper.vm.$data.disableControl).toBe(false)

        // Click HIT button
        expect(wrapper.findAll('button').at(1).text()).toBe('HIT')
        await wrapper.findAll('button').at(1).trigger('click')
    }

    async function pressStand () {
        // Check stand button is not disabled
        expect(wrapper.vm.$data.disableControl).toBe(false)

        // Click Stand button
        expect(wrapper.findAll('button').at(0).text()).toBe('STAND')
        await wrapper.findAll('button').at(0).trigger('click')
    }

    beforeEach(() => {
        wrapper = mount(GameBoard)
    })
    afterEach(() => {
        wrapper.destroy();
        wrapper = null;
    });
      
  it('should generate 52 cards to deck', () => {

    expect(wrapper.vm.$data.deckCards.length).toBe(52)
  })

  it('should deal 2 cards each to player and dealer after starting game', async () => {
    await startGame()
    
    // Player and dealer should now have 2 cards each
    expect(wrapper.vm.$data.dealer.hand.length).toBe(2)
    expect(wrapper.vm.$data.dealer.hand.length).toBe(2)
  })

  it('should add a card to player hand after clicking hit button', async () => {
    await startGame()

    // Player should only have 2 cards
    expect(wrapper.vm.$data.player.hand.length).toBe(2)

    await pressHit()

    // Player should now have 3 cards
    expect(wrapper.vm.$data.player.hand.length).toBe(3)
  })

  it('should show correct player score after starting game', async () => {
    await startGame()

    let expectedScorePlayer = 0

    // Calculate player expected score
    for (let i = 0; i < wrapper.vm.$data.player.hand.length; i++) {
        let cardVal = wrapper.vm.$data.player.hand[i].slice(1)

        if (["K", "Q", "J"].includes(cardVal)) {
            expectedScorePlayer += 10
        } else if (cardVal === "A"){
            // Ace will be scored as 11 initially as adding it to hand with start 2 cards will never make it exceed 21
            expectedScorePlayer += 11
        } else {
            // Number card
            expectedScorePlayer += parseInt(cardVal)
        }
    }

    // Player score
    expect(wrapper.vm.$data.player.score).toBe(expectedScorePlayer)
    expect(wrapper.findAll('h2').at(1).html().replace(/\s/g, '')).toContain(`<h2>Player'sHand:${expectedScorePlayer}</h2>`) 
  })

  it('should show correct dealer score after starting game', async () => {
    await startGame()

    let expectedScoreDealer = 0
    let displayedScoreDealer = 0

    // Calculate player expected score
    for (let i = 0; i < wrapper.vm.$data.dealer.hand.length; i++) {
        let cardVal = wrapper.vm.$data.dealer.hand[i].slice(1)

        if (["K", "Q", "J"].includes(cardVal)) {
            expectedScoreDealer += 10
        } else if (cardVal === "A"){
            // Ace will be scored as 11 initially as adding it to hand with start 2 cards will never make it exceed 21
            expectedScoreDealer += 11
        } else {
            // Number card
            expectedScoreDealer += parseInt(cardVal)
        }

        // Displayed score on game start is only the 1st card
        if (i === 0) {
            displayedScoreDealer = expectedScoreDealer
        } 
    }

    // Dealer actual score
    expect(wrapper.vm.$data.dealer.score).toBe(expectedScoreDealer)
    
    // Dealer displayed score (first card score only)
    expect(wrapper.vm.$data.dealer.firstCardScore).toBe(displayedScoreDealer) 
    expect(wrapper.findAll('h2').at(0).html().replace(/\s/g, '')).toContain(`<h2>Dealer'sHand:${displayedScoreDealer}</h2>`)
  })

  it('should update player score after pressing hit and new card is dealt', async () => {
    await startGame()

    let currentScore = parseInt(wrapper.vm.$data.player.score)
    expect(wrapper.findAll('h2').at(1).html().replace(/\s/g, '')).toContain(`<h2>Player'sHand:${currentScore}</h2>`)

    await pressHit()

    // Get value of the card that's just been added to hand
    let cardVal = wrapper.vm.$data.player.hand.slice(-1)[0].slice(1)
    
    if (["K", "Q", "J"].includes(cardVal)) {
        currentScore += 10
    } else if (cardVal === "A"){
        // Treat ace as a 1 if adding 11 would exceed score of 21
        if (currentScore <= 10) {
            currentScore += 11
        } else {
            currentScore += 1
        }
    } else {
        // Number card
        currentScore += parseInt(cardVal)
    }

    expect(wrapper.findAll('h2').at(1).html().replace(/\s/g, '')).toContain(`<h2>Player'sHand:${currentScore}</h2>`)
  })

  it('should allow player to hit when score is less than 21, and bust when their score exceeds 21', async () => {
    await startGame()

    let currentScore = parseInt(wrapper.vm.$data.player.score)
    expect(wrapper.findAll('h2').at(1).html().replace(/\s/g, '')).toContain(`<h2>Player'sHand:${currentScore}</h2>`)

    // Continue pressing hit until score exceeds 21
    while (currentScore <= 21) {
        if (currentScore === 21) {
            // Restart game if it's a blackjack
            await restartGame()
        } else {
            // Player can hit when score is less than 21
            await pressHit()
        }
        currentScore = parseInt(wrapper.vm.$data.player.score)
    }
    
    expect(wrapper.findAll('.message').at(1).text()).toBe('BUST!')

  })

  it('should show blacjack result when player score is 21', async () => {
    await startGame()

    let currentScore = parseInt(wrapper.vm.$data.player.score)
    expect(wrapper.findAll('h2').at(1).html().replace(/\s/g, '')).toContain(`<h2>Player'sHand:${currentScore}</h2>`)

    // Continue game until blackjack reached
    while (currentScore !== 21) {
        if (currentScore === 21) {
            // Blackjack
            break;
            
        } else if (currentScore < 21) {
            await pressHit()
        } else {
            await restartGame()
        }
        currentScore = parseInt(wrapper.vm.$data.player.score)
    }
    
    expect(wrapper.findAll('.message').at(1).text()).toBe('Blackjack!')
  })

it('should allow player to stand when their score is less than 21, and evaluate a winning game result', async () => {

    // Give player a winning hand of 20 (HK, HQ), and dealer a losing hand of 22 (CK, C2, CQ)
    let modifiedDeck = ['HK', 'CK', 'HQ', 'C2', 'CQ',  ...wrapper.vm.$data.deckCards]
    await wrapper.setData({ deckCards: modifiedDeck })
    
    await startGame()

    // Press stand
    await pressStand()

    for (let i = 0; i < wrapper.vm.$data.dealer.hand.length - 2; i++) {
        jest.runOnlyPendingTimers()
        await Vue.nextTick()
        jest.runOnlyPendingTimers()
        await Vue.nextTick()
    }

    // Expect winning player score of 20, and losing dealer hand of 22
    expect(wrapper.findAll('h2').at(0).html().replace(/\s/g, '')).toContain(`<h2>Dealer'sHand:22</h2>`)
    expect(wrapper.findAll('h2').at(1).html().replace(/\s/g, '')).toContain(`<h2>Player'sHand:20</h2>`)

    expect(wrapper.findAll('.game-status').at(0).text()).toBe('You win!')
  })

  it('should allow player to stand when their score is less than 21, and evaluate a losing game result', async () => {

    // Give player a losing hand of 19 (HK, H9), and dealer a winning hand of 20 (CK, CQ)
    let modifiedDeck = ['HK', 'CK', 'H9', 'CQ',  ...wrapper.vm.$data.deckCards]
    await wrapper.setData({ deckCards: modifiedDeck })
    
    await startGame()

    // Press stand
    await pressStand()

    // Expect winning dealer hand of 20, and losing player hand of 19
    expect(wrapper.findAll('h2').at(0).html().replace(/\s/g, '')).toContain(`<h2>Dealer'sHand:20</h2>`)
    expect(wrapper.findAll('h2').at(1).html().replace(/\s/g, '')).toContain(`<h2>Player'sHand:19</h2>`)

    expect(wrapper.findAll('.game-status').at(0).text()).toBe('Dealer wins!')
  })

  it('should allow player to stand when their score is less than 21, and evaluate a PUSH game result', async () => {

    // Give player a hand of 20 (HK, HQ), and also dealer hand of 20 (CK, CQ)
    let modifiedDeck = ['HK', 'CK', 'HQ', 'CQ',  ...wrapper.vm.$data.deckCards]
    await wrapper.setData({ deckCards: modifiedDeck })
    
    await startGame()

    // Press stand
    await pressStand()

    // Expect hand of 20 for both dealer and player
    expect(wrapper.findAll('h2').at(0).html().replace(/\s/g, '')).toContain(`<h2>Dealer'sHand:20</h2>`)
    expect(wrapper.findAll('h2').at(1).html().replace(/\s/g, '')).toContain(`<h2>Player'sHand:20</h2>`)

    expect(wrapper.findAll('.game-status').at(0).text()).toBe('PUSH!')
  })
})