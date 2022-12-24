<template>
  <div>
    <PlayerHand/>
  </div>
</template>

<script>
import PlayerHand from './PlayerHand.vue';

export default {
    name: "GameBoard",
    components: {PlayerHand },
    data() {
      return {
        hands: {
          dealer: [],
          player: []
        },
        deckCards: [],
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
      }
    },
    created () {
      this.createDeck();
      this.shuffleCards();
    },
}
</script>

<style scoped>

</style>

<style>
  body {
    background-color: darkgreen;
  }
</style>
