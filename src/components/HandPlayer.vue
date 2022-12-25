<template>
    <section class="player-hand">
        <PlayingCard v-for="card in playerHand" :card="card" :key="card"/>
    </section>
</template>

<script>
import PlayingCard from './PlayingCard.vue';

export default {
    name: "HandPlayer",
    props: {
        playerHand: Array
    },
    components: { PlayingCard }
}
</script>

<style scoped>
.player-hand {
    display: flex;
    justify-content: center;
}
</style>
