<template>
    <GameBoard/>
</template>

<script>
import GameBoard from './components/GameBoard.vue'

export default {
  name: 'App',
  components: {
    GameBoard
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

html, body {
  margin: 0;
  height: 100%;
  overflow: hidden
  }

body {
  background-color: darkgreen;
  background: radial-gradient(ellipse at bottom, darkgreen 0%, #030617 100%);
}
</style>
