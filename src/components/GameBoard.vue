<template>
  <main class="game-board">
    <HandCards :isDealer="true" :hand="dealer.hand" :score="(hideDealer) ? dealer.firstCardScore : dealer.score" :hideDealer="hideDealer"/>
    <HandCards :hand="player.hand" :score="player.score"/>
    <GameControl @hitPressed="dealCard('player')" @standPressed="standPressed"/>
  </main>
</template>

<script>
import GameControl from './GameControl.vue';
import HandCards from './HandCards.vue';

export default {
    name: "GameBoard",
    components: { HandCards, GameControl },
    data() {
      return {
        deckCards: [],
        dealer: {
          hand: [],
          score: 0,
          firstCardScore: 0,
        },
        player: {
          hand: [],
          score: 0
        },
        cardCount: 0,
        hideDealer: true
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
      animationDelay(milliseconds) {
      return new Promise((resolve) => setTimeout(resolve, milliseconds));
      },
      async dealFirstTwoCards(){
        while (this.cardCount < 4) {
          // Player
          this.dealCard('player');
          await this.animationDelay(500);

          //Dealer
          this.dealCard('dealer');
          await this.animationDelay(500);
        }
      },
      dealCard(receiver){
        if (receiver === 'player') {
          this.player.hand.push(this.deckCards[this.cardCount]);
          this.calculateNewScore(this.deckCards[this.cardCount], receiver);
          this.cardCount++;
        }

        if (receiver === 'dealer') {
          this.dealer.hand.push(this.deckCards[this.cardCount]);
          this.calculateNewScore(this.deckCards[this.cardCount], receiver);
          this.cardCount++;
        }
        
      },
      calculateNewScore(cardStr, receiver){
        cardStr = cardStr.slice(1);

        if (receiver === 'player') {
          if (/^\d+$/.test(cardStr)) {
          //If it's a number card
          this.player.score += parseInt(cardStr);
          } else if (['K', 'Q', 'J'].includes(cardStr)) {
            // If it's King, Queen or Jack
            this.player.score += 10;
          } else {
            // If it's an Ace
            if (this.player.score <= 10) {
              this.player.score += 11;
            } else {
              this.player.score += 1;
            }
          }
        }
        
        if (receiver === 'dealer') {
          if (/^\d+$/.test(cardStr)) {
          //If it's a number card
          this.dealer.score += parseInt(cardStr);
          } else if (['K', 'Q', 'J'].includes(cardStr)) {
            // If it's King, Queen or Jack
            this.dealer.score += 10;
          } else {
            // If it's an Ace
            if (this.dealer.score <= 10) {
              this.dealer.score += 11;
            } else {
              this.dealer.score += 1;
            }
          }

          // If dealer's first card, record the score
          if (this.dealer.hand.length === 1) {
            this.dealer.firstCardScore += this.dealer.score;
          }
        }
      },
      standPressed(){
        this.hideDealer = false;
      }
    },
    created () {
      this.createDeck();
      this.shuffleCards();
    },
    mounted () {
      this.dealFirstTwoCards();
    },
}
</script>

<style scoped>
.game-board {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
</style>
