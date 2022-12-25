<template>
    <div v-if="!hideCard" class="card" :style="(card[0] == 'H' || card[0] == 'D') ? 'color: red' : 'color: black'">
        <span class="card-val">
            {{ cardVal }}
        </span>
        <span class="card-suit">
            {{ cardSuit }}
        </span>
    </div>
    <div v-else class="card hidden-card"></div>
</template>

<script>
export default {
    name: 'PlayingCard',
    props: {
            card: String,
            hideCard: {
                type: Boolean,
                default: false
            }
        },
    
    computed: {
        cardVal() {
            return this.card.slice(1); 
        },
        cardSuit(){
            if (this.card[0] === 'S') {
                return "♠";
            } else if (this.card[0] === 'H') {
                return "♥";
            } else if (this.card[0] === 'D') {
                return "♦";
            } else if (this.card[0] === "C") {
                return "♣";
            } else {
                return "";
            }
        }
    }
}
</script>

<style scoped>
.card {
    height: 12rem;
    width: 8rem;
    position: relative;
    background-color: white;
    border-radius: 1rem;
    border: 4px solid black;
    margin: 1rem 0.5rem;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.hidden-card {
    border: 4px solid white;
    background: repeating-linear-gradient(
        45deg,
        #bc1616,
        #bc1616 10px,
        #9f0909 10px,
        #9f0909 20px
    );
}

.card > span.card-val {
    font-size: 2.5rem;
    font-weight: 700;
    position: absolute;
    top: 0.2rem;
    left: 0.5rem;
}

.card > span.card-suit {
    font-size: 4rem;
    font-weight: 700;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
