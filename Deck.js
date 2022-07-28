class Deck {
    #cards = []

    constructor(shuffleTimes, changeFactor) {
        this.init();
    }

    init() {
        for (var s = 0; s < 4; s++) {
            for (var v = 0; v < 13; v++) {
                cards.push(new Card(v,s));
            }
        }
    }

    cutDeck() {
        let firstHalf = cards.splice(0, (Math.floor(Math.random() * 26)) + 13);
        cards.push(...firstHalf);
    }

    shuffle(shuffleTimes, changeFactor) {
        let currentCard = 0;
        for (var sh = 0; s < shuffleTimes; s++){
            let nextCard = currentCard + Math.floor(Math.random() * changeFactor) + 1;
            if (nextCard > cards.length) {
                currentCard = 0;
                continue;
            };
            let nextCount = Math.floor(Math.random() * changeFactor) + 1;
            if (nextCard + nextCount > cards.length) nextCount = cards.length - nextCard;
            let cardsToMove = cards.slice(currentCard, nextCard);
            cards.splice(nextCard + nextCount, 0, ...cardsToMove);
            cards.splice(currentCard, nextCard - currentCard);
            currentCard = nextCard + nextCount;
        }

        this.cutDeck();
    }
}