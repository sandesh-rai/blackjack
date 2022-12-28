<template>
  <section class="title-screen">
    <div class="title-screen-content">
      <h2>Blackjack Game</h2>
      <h3>Created by Sandesh Rai</h3>
      <div class="cards-row">
        <PlayingCard card="HK" :card-spin="true" />
        <PlayingCard card="CQ" :card-spin="true" />
        <PlayingCard card="DJ" :card-spin="true" />
      </div>
      <div class="buttons-row">
        <button @click="openLink">View LinkedIn</button>
        <button @click="$emit('startPressed')">Start game</button>
      </div>
    </div>
  </section>
</template>

<script>
import PlayingCard from "./PlayingCard.vue";

export default {
  name: "TitleScreen",
  components: { PlayingCard },
  methods: {
    openLink() {
      window.open("https://www.linkedin.com/in/sandesh-rai", "_blank");
    },
  },
};
</script>

<style scoped>
* {
  text-align: center;
}

.title-screen {
  height: 100vh;
  width: 100vw;
  position: relative;
}

.title-screen-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: auto;
  width: 60%;
  background-color: rgba(255, 255, 255, 0.25);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 32px;
  padding: clamp(1rem, 3.5vw, 4rem);
}

h2 {
  font-size: clamp(2rem, 5.5vw, 3rem);
  color: white;
}

h3 {
  font-size: clamp(1rem, 2.5vw, 1.75rem);
  color: white;
  padding-top: 1rem;
}

.cards-row {
  display: flex;
  justify-content: center;
  transform: scale(0.8);
}

.buttons-row {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.buttons-row > button {
  width: 15rem;
  min-width: 10rem;
  margin-top: 1rem;
}

@media only screen and (max-width: 800px) {
  .title-screen-content {
    width: 75%;
  }

  .buttons-row > button {
    font-size: 1rem;
    padding: 1rem;
    width: 10rem;
  }
}
</style>
