import {Card} from './Card.js';

export class Deck {
    cards = [];
    dealtCards = [];

    constructor() {
        this.init();
    }

    init() {
        for (var s = 1; s <= 4; s++) {
            for (var v = 1; v <= 13; v++) {
                this.cards.push(new Card(v,s));
            }
        }
    }

    cutDeck() {
        let firstHalf = this.cards.splice(0, (Math.floor(Math.random() * 26)) + 13);
        this.cards.push(...firstHalf);
    }

    shuffle(shuffleTimes, changeFactor) {
        let currentCard = 0;
        for (var s = 0; s < shuffleTimes; s++){
            let nextCard = currentCard + Math.floor(Math.random() * changeFactor) + 1;
            if (nextCard > this.cards.length) {
                currentCard = 0;
                continue;
            };
            let nextCount = Math.floor(Math.random() * changeFactor) + 1;
            if (nextCard + nextCount > this.cards.length) nextCount = this.cards.length - nextCard;
            let cardsToMove = this.cards.slice(currentCard, nextCard);
            this.cards.splice(nextCard + nextCount, 0, ...cardsToMove);
            this.cards.splice(currentCard, nextCard - currentCard);
            currentCard = nextCard + nextCount;
        }

        this.cutDeck();
    }
}