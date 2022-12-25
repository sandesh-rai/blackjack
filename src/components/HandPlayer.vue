<template>
    <section>
        <h2>
            <template v-if="isDealer">Dealer's Hand</template>
            <template v-else>Player's Hand</template>
            : {{score}}
        </h2>
        <div class="player-hand">
            <PlayingCard v-for="card in hand" :card="card" :key="card"/>
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
    components: { PlayingCard }
}
</script>

<style scoped>
.player-hand {
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
</style>
