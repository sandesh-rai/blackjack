<template>
    <section>
        <h2>
            <template v-if="isDealer">Dealer's Hand:</template>
            <template v-else>Player's Hand</template>
            : {{score}}
        </h2>
       
        <div class="player-hand">
            <TransitionGroup name="cards" tag="div">
                <div v-for="(card, index) in hand" :key="card">
                    <PlayingCard :card="card" :hideCard="hideCardForDealer(index)"/>
                </div>
            </TransitionGroup>
        </div>
    </section>
</template>

<script>
import PlayingCard from './PlayingCard.vue';

export default {
    name: "HandPlayer",
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
        }
    },
    components: { PlayingCard },
    methods: {
        hideCardForDealer(cardIndex) {
            return this.isDealer && cardIndex == this.hand.length - 1;
        }
    },
}
</script>

<style scoped>
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
    font-weight: 800;
    margin-top: 1.5rem;
    font-size: 2rem;
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
