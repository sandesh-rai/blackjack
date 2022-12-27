<template>
  <main class="game-board">
    <HandCards :isDealer="true" :hand="dealer.hand" :score="(hideDealer) ? dealer.firstCardScore : dealer.score" :hideDealer="hideDealer"/>
    <HandCards :hand="player.hand" :score="player.score"/>
    <GameMenu @hitPressed="dealCard('player')" @standPressed="dealersTurn" :disableControl="disableControl" :gameStatusMessage="gameStatusMessage"/>
  </main>
</template>

<script>
import GameMenu from './GameMenu.vue';
import HandCards from './HandCards.vue';

export default {
    name: "GameBoard",
    components: { HandCards, GameMenu },
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
        hideDealer: true,
        disableControl: false,
        gameStatusMessage: ''
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
        this.disableControl = true;
        while (this.cardCount < 4) {
          // Player
          this.dealCard('player', true);
          await this.animationDelay(500);

          //Dealer
          this.dealCard('dealer', true);
          await this.animationDelay(500);
        }
        this.disableControl = false;
      },
      dealCard(receiver, firstCards = false){
        this.disableControl = true;

        if (receiver === 'player') {
          this.player.hand.push(this.deckCards[this.cardCount]);
          this.calculateNewScore(this.deckCards[this.cardCount], receiver);
          this.cardCount++;

          // Check new score
          if (this.player.score === 21) {
            this.dealersTurn();
          } else if (this.player.score > 21) {
            this.hideDealer = false;
            this.gameStatusMessage = 'You lose!';
            this.restartGame();
          } else {
            if (!firstCards) {
              this.disableControl = false;
            }       
          }
        }

        if (receiver === 'dealer') {
          if (this.dealer.score >= this.player.score) return;

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
      async dealersTurn(){
        this.disableControl = true;
        this.hideDealer = false;

        while (this.dealer.score < this.player.score) {
          this.dealCard('dealer');
          this.checkGameStatus();
        }

        this.checkGameStatus();

        this.restartGame();
      },
      async restartGame(){
        await this.animationDelay(2500);

        this.shuffleCards();
        this.cardCount = 0;
        this.hideDealer = true;

        this.dealer = {
          hand: [],
          score: 0,
          firstCardScore: 0,
        };

        this.player =  {
          hand: [],
          score: 0
        };
        this.gameStatusMessage = '';
        this.dealFirstTwoCards();
      },
      checkGameStatus(){
        if (this.dealer.score >= this.player.score) {
            if (this.dealer.score > 21) {
              this.gameStatusMessage = 'You win!';
            } else if (this.dealer.score === 21 && this.player.score !== 21) {
              this.gameStatusMessage = 'Dealer wins!';
            } else if ((this.dealer.score === 21 && this.player.score === 21) || (this.dealer.score === this.player.score)) {
              this.gameStatusMessage = 'PUSH!';
            } else if (this.dealer.score < 21) {
              this.gameStatusMessage= 'Dealer wins!';
            }

          }
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
