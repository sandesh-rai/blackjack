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
}

body {
  background: radial-gradient(ellipse at bottom, darkgreen 0%, #030617 100%);
  font-family: monospace, Helvetica,Arial, sans-serif;
}

button {
    min-width: 10rem;
    border-radius: 2rem;
    font-size: 1.5rem;
    padding: 1.5rem 1rem;
    border: none;
    font-weight: 700;
    box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
    cursor: pointer;
    font-family: monospace, Helvetica, Arial, sans-serif;
}

button:hover, button:focus-visible {
  opacity: 0.9;
}

button:active {
  box-shadow: 0px 4px 8px #333;
  -webkit-transform: scale(0.98);
  transform: scale(0.98);
}
</style>
