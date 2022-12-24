<template>
  <div>
    <PlayerHand/>
  </div>
</template>

<script>
import PlayerHand from './PlayerHand.vue';

export default {
    name: "GameBoard",
    components: {PlayerHand }
}
</script>

<style scoped>

</style>

<style>
  body {
    background-color: darkgreen;
  }
</style>
