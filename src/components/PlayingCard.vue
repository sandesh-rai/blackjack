<template>
    <div v-if="!hideCard" class="card" :style="(card[0] == 'H' || card[0] == 'D') ? 'color: red' : 'color: black'" :class="cardSpin ? 'card-rotate' : ''">
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
            },
            cardSpin: {
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
    border: none;
    margin: 1rem 0.5rem;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    position: relative;
}

.card-rotate {
    animation: rotateY 5s both infinite;
    animation-timing-function: linear;
    -webkit-transform-style: preserve-3d;
    -webkit-backface-visibility: hidden;
}

.card-rotate:after {
    content: '';
    right: 0px;
    bottom: 0px;
    position: absolute;
    top: 0px;
    left: 0px;
    border: 2px solid white;
    background: repeating-linear-gradient(
        45deg,
        #bc1616,
        #bc1616 10px,
        #9f0909 10px,
        #9f0909 20px
    );
    border-radius: 1rem;
    -webkit-transform: rotateY( 180deg );
    -webkit-transform-style: preserve-3d;
    -webkit-backface-visibility: hidden;
}

.card-rotate:nth-child(1) { animation-delay: 0s }
.card-rotate:nth-child(2) { animation-delay: 2.5s }
.card-rotate:nth-child(3) { animation-delay: 0s }

@-webkit-keyframes rotateY {
  to { -webkit-transform: rotateY(360deg); }
}
@keyframes rotateY {
  to { transform: rotateY(360deg); }
}

.hidden-card {
    border: 2px solid white;
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

@media only screen and (max-width: 769px) {
    .card {
    height: 9rem;
    width: 6rem;
    }

    .card > span.card-val {
        font-size: 1.75rem;
    }

    .card > span.card-suit {
        font-size: 3rem;
    }
}

@media only screen and (max-width: 900px) {
    .card {
    height: 9rem;
    width: 6rem;
    }

    .card > span.card-val {
        font-size: 1.75rem;
    }

    .card > span.card-suit {
        font-size: 3rem;
    }
}

@media only screen and (max-width: 680px) {
    .card {
    height: 7rem;
    width: 4rem;
    }

    .card > span.card-val {
        font-size: 1.75rem;
    }

    .card > span.card-suit {
        font-size: 3rem;
    }
}
</style>
