# ♠️ ♥️ Blackjack ♣️ ♦️

## Introduction

This is a basic Blackjack game created with Vue.js:
- All components are custom made without any 3rd party CSS libraries
- Animations were created with Vue Transitions, and CSS animations
- Unit/component testing is performed with Vue Test Utils with Jest
- Incorporates reponsive web design
- Accessibility: game can be played with keyboard (Tab and Enter keys)

  <img src="https://github.com/sandesh-rai/blackjack/blob/main/src/assets/Game-Desktop.png" alt="game-desktop"/>
  
## Play the game 🎮🃏

https://sandesh-rai.github.io/blackjack/ 
  
## Rules/ Mechanics
- Player and dealer start with 2 cards each
- Player starts and can choose to hit as long as they don't exceed a score of 21
- When player chooses to stand, dealer draws until their score is equal to or greater than the player's score
- When either the player or dealer exceeds a score of 21, they will 'bust'
- If the score of the player and dealer are equal and less than 21, there will be a 'push'
- Rule variation: any number of cards in a hand with total score of 21 counts as a blackjack (whereas typically only a hand of 2 cards do)

## Installation

You can clone this repository using __Git__:
```bash
git clone https://github.com/sandesh-rai/blackjack.git
```

Installing the dependencies:
```bash
npm install 
# OR
yarn
```

Running the server with hot reload:
```bash
npm run serve
# OR
yarn serve
```

Vue.js development server: http://localhost:8080

Running the unit tests:
```bash
npm run test:unit
# OR
yarn test:unit
```

---

