<template>
    <section class="title-screen">
        <div class="title-screen-content">
          <h2>Blackjack Game</h2>
          <h3>Created by Sandesh Rai</h3>
          <button @click="$emit('startPressed')">Start game</button>
        </div>
    </section>
</template>

<script>
    export default {
        name: "TitleScreen"
    }
</script>

<style scoped>
* {
    text-align: center
}

.title-screen {
    height: 100vh;
    width: 100vw;
    position: relative;
}

.title-screen-content{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 50vh;
    width: 50vw;
    background-color: rgba(255, 255, 255, 0.25);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 32px;
    padding: 4rem;
}

h2 {
    font-size: 3rem;
    color: white;
}

h3 {
    font-size: 1.75rem;
    color: white;
}

</style>