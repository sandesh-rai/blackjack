<template>
    <div class="game-status">
        {{message}}
    </div>
</template>

<script>    
    export default {
        name: "GameMenuMessage",
        props: {
            message: {
                type: String,
                default: ''
            }
        }
    };
</script>

<style scoped>
.game-status {
    height: 60%;
    vertical-align: center;
    display: flex;
    align-items: center;
    width: 30%;
    justify-content: center;
    background-color: black;
    border: 2px solid white;
    border-radius: 16px;
    color: white;
    font-size: 2rem;
    user-select: none;
}
</style>