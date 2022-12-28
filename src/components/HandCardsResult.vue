<template>
  <p class="message" :style="resultBackground">
    {{ result }}
  </p>
</template>

<script>
export default {
  name: "HandCardsResult",
  props: {
    score: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    result() {
      if (this.score === 21) {
        return "Blackjack!";
      } else if (this.score > 21) {
        return "BUST!";
      } else {
        return "";
      }
    },
    resultBackground() {
      if (this.score === 21) {
        return "background-color: rgba(7, 124, 52, 0.85)";
      } else if (this.score > 21) {
        return "background-color: rgba(200, 0, 32, 0.85)";
      } else {
        return "";
      }
    },
  },
};
</script>

<style scoped>
.message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  padding: 2rem 11rem;
  color: white;
  border-radius: 16px;
}
</style>
