console.clear();

class Card {
    constructor(v, s) {
        this.v = v;
        this.s = s;
    }
}

let deck = [];

// init deck
for (var s = 0; s < 4; s++) {
    for (var v = 0; v < 13; v++) {
        deck.push(new Card(v,s));
    }
}
// shuffle
let currentCard = 0;
for (var sh = 0; s < 30; s++){
    let nextCard = currentCard + Math.floor(Math.random() * 30) + 1;
    if (nextCard > deck.length) {
        currentCard = 0;
        continue;
    };
    let nextCount = Math.floor(Math.random() * 30) + 1;
    if (nextCard + nextCount > deck.length) nextCount = deck.length - nextCard;
    let cardsToMove = deck.slice(currentCard, nextCard);
    deck.splice(nextCard + nextCount, 0, ...cardsToMove);
    deck.splice(currentCard, nextCard - currentCard);
    currentCard = nextCard + nextCount;

    // cut deck
    let firstHalf = deck.splice(0, (Math.floor(Math.random() * 26)) + 13);
    deck.push(...firstHalf);
}

console.log('deck',deck);
console.log(deck.length);