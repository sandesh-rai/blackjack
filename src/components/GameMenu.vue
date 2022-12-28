<template>
    <div class="control">
        <button @click="standPressed" :style="(disableControl) ? 'pointer-events: none; opacity: 0.5; cursor: not-allowed;' : ''">STAND</button>
        <GameMenuMessage :message="gameStatusMessage"/>
        <button @click="hitPressed" :style="(disableControl) ? 'pointer-events: none; opacity: 0.5; cursor: not-allowed;' : ''">HIT</button>
    </div>
</template>

<script>
import GameMenuMessage from './GameMenuMessage.vue';

    
    export default {
    name: "GameMenu",
    props: {
        disableControl: {
            type: Boolean,
            default: false
        },
        gameStatusMessage: {
            type: String,
            default: ''
        }
    },
    methods: {
        hitPressed() {
            if (this.disableControl) {
                return;
            }
            this.$emit("hitPressed");
        },
        standPressed() {
            if (this.disableControl) {
                return;
            }
            this.$emit("standPressed");
        },
    },
    components: { GameMenuMessage }
};
</script>

<style scoped>
.control {
    display: flex;
    justify-content: space-evenly;
    flex-grow: 1;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.25);
    margin: 3rem 3rem 0rem;
    border-top-left-radius: 100px;
    border-top-right-radius: 100px;
    max-height: 125px;
}

.control button {
    min-width: 10rem;
    border-radius: 2rem;
    font-size: 1.5rem;
    padding: 1.5rem 1rem;
    border: none;
    font-weight: 700;
    box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
    cursor: pointer;
}

.control button:hover, .control button:focus-visible {
    margin-bottom: 4px;
}

.control button:active {
  box-shadow: 0px 4px 8px #333;
  -webkit-transform: scale(0.98);
  transform: scale(0.98);
}

@media only screen and (max-width: 769px) {
  .control {
    margin: 0;
    border-radius: 0px;
  }
}

</style>