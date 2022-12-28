<template>
    <section>
        <h2>
                <template v-if="isDealer">Dealer's Hand: </template>
                <template v-else>Player's Hand: </template>
                
                <template v-if="hand.length > 1">
                    {{score}}
                </template>
        </h2>
       
        <div class="player-hand">
            <TransitionGroup name="cards" tag="div">
                <div v-for="(card, index) in hand" :key="card">
                    <PlayingCard :card="card" :hideCard="hideLastCardForDealer(index)"/>
                </div>
            </TransitionGroup>
            <HandCardsResult :score="score"/>
        </div>
    </section>
</template>

<script>
import PlayingCard from './PlayingCard.vue';
import HandCardsResult from './HandCardsResult.vue';

export default {
    name: "HandCards",
    props: {
        hand: {
            type: Array
        },
        score: {
            type: Number,
            default: 0
        },
        isDealer: {
            type: Boolean,
            default: false
        },
        hideDealer: {
            type: Boolean,
            default: false
        }
    },
    components: { PlayingCard, HandCardsResult },
    methods: {
        hideLastCardForDealer(cardIndex) {
            return this.isDealer && cardIndex == 1 && this.hideDealer;
        }
    },
}
</script>

<style scoped>
.player-hand {
    position: relative;
}

section {
    min-height: 300px;
}
.player-hand > div {
    display: flex;
    justify-content: center;
}

section > h2 {
    text-align: center;
    color: #fff;
    font-weight: 700;
    margin-top: 1rem;
    font-size: 2rem;
    background-color: rgba(255, 255, 255, 0.2);
    padding: 0.25rem 1.25rem;
    border-radius: 1rem;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.cards-move,
.cards-enter-active,
.cards-leave-active {
    transition: all 0.5s ease;
}
.cards-enter,
.cards-leave-to {
    transform: translateY(-100vh);
}

.cards-leave-active {
  position: absolute;
}

</style>
