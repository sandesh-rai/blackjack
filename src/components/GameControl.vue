<template>
    <div class="control">
        <button @click="standPressed">STAND</button>
        <button @click="hitPressed">HIT</button>
    </div>
</template>

<script>    
    export default {
        name: "GameControl",
        methods: {
            hitPressed(){
                this.$emit('hitPressed');
            },
            standPressed() {
                this.$emit('standPressed');
            },
        },
    };
</script>

<style scoped>
.control {
    display: flex;
    justify-content: space-evenly;
    flex-grow: 1;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.2);
    margin-top: 3rem;
}

.control button {
    min-width: 10rem;
    border-radius: 2rem;
    font-size: 1.5rem;
    padding: 1.5rem 1rem;
    border: none;
    font-weight: 700;
    box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;

}

.control button:hover, .control button:focus-visible {
    cursor: pointer;
    margin-bottom: 4px;
}

.control button:active {
  box-shadow: 0px 4px 8px #333;
  -webkit-transform: scale(0.98);
  transform: scale(0.98);
}
</style>