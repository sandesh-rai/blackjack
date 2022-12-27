<template>
    <p v-if="score > 21" class="message">
        <slot name="message"></slot>
    </p>
</template>

<script>
export default {
    name: "HandCardsMessage",
    props: {
        score: {
            type: Number,
            default: 0
        }
    },
    components: { PlayingCard },
    methods: {
        hideLastCardForDealer(cardIndex) {
            return this.isDealer && cardIndex == 1 && this.hideDealer;
        }
    },
}
</script>

<style scoped>
.message {
    position: absolute;
    background-color: rgba(200, 0, 32, 0.85);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.5rem;
    padding: 2rem 11rem;
    color: white;
    border-radius: 16px;
}

</style>
