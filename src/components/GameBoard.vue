<template>
  <div class="game-board">
    <PlayerHand/>
    <GameControl @hitPressed="hitPressed"/>
  </div>
</template>

<script>
import GameControl from './GameControl.vue';
import PlayerHand from './PlayerHand.vue';

export default {
    name: "GameBoard",
    components: { PlayerHand, GameControl },
    data() {
      return {
        deckCards: [],
        dealer: {
          hand: [],
          score: 0
        },
        player: {
          hand: [],
          score: 0
        },
        cardCount: 0
      }
    },
    methods: {
      // Create deck of cards
      createDeck() {
        const suits = ['H', 'D', 'C', 'S'];
        const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

        for (let i = 0; i < suits.length; i++) {
          for (let j = 0; j < values.length; j++) {
            this.deckCards.push(suits[i] + values[j]);
          }
        }
      },
      // Fisher-Yaytes Algorithm for sorting
      shuffleCards(){
        // From end to start, selects a random card from the deck and swaps it with the current card in the iteration
        for(let curr = this.deckCards.length - 1; curr > 0; curr--) {
          // Selects a random index to swap with
          const rand = Math.floor(Math.random() * (curr + 1));

          // Remember card at current index
          const currCard = this.deckCards[curr];

          // Swap cards at random index and current index
          this.deckCards[curr] = this.deckCards[rand];
          this.deckCards[rand] = currCard;
        }
      }, 
      dealFirstTwoCards(){
        while (this.cardCount < 4) {
          // Player
          this.player.hand.push(this.deckCards[this.cardCount]);
          this.cardCount++;

          //Dealer
          this.dealer.hand.push(this.deckCards[this.cardCount])
          this.cardCount++;
        }
      },
      hitPressed(){
        this.player.hand.push(this.deckCards[this.cardCount]);
        this.cardCount++;
        console.log('HELLO!')
      }
    },
    created () {
      this.createDeck();
      this.shuffleCards();
      this.dealFirstTwoCards();
    },
}
</script>

<style scoped>

</style>

<style>
  body {
    background-color: darkgreen;
  }

  .game-board {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
</style>
