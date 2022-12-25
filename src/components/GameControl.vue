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
    align-items: flex-end;
    margin: 1rem;
}

.control button {
    min-width: 8rem;
    border-radius: 1rem;
    font-size: 1.25rem;
    padding: 1.5rem 1rem;
}

.control button:hover, .control button:focus-visible {
    background-color: lightgrey;
    cursor: pointer;
}
</style>