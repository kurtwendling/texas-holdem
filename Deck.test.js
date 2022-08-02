import {Deck} from './Deck.js';

describe("Deck", () => {
    let testSubject;

    beforeEach(() => {
        testSubject = new Deck();
    });

    it('Sets up a deck with 52 cards', () => {
        expect(testSubject.cards).toHaveLength(52);
        expect(testSubject.cards[0].value).toBe(testSubject.cards[1].value - 1);
    });

    it('Shuffles deck', () => {
        testSubject.shuffle();
        let first12 =testSubject.cards.slice(0,12);
        let suites = first12.map(c => {return c.suite});
        expect(suites).not.toHaveLength(1);
        let isSequence = true;
        for (let i = 0; i < 26; i++) {
            isSequence = isSequence && (testSubject.cards[i].value === testSubject.cards[i + 1].value - 1 
                || testSubject.cards[i].suite === testSubject.cards[i + 1].suite);
        }
        expect(isSequence).toBeFalsy();
    });

    it('Deals Cards and Resets Deck', () => {
        let handCards = [];
        for(let i = 0; i < 7; i ++) {
            handCards.push(...testSubject.dealCards());
        }
        expect(handCards).toHaveLength(7);
        expect(testSubject.cards).toHaveLength(52 - 7);
        expect(testSubject.dealtCards).toHaveLength(7);
        testSubject.reset();
        expect(testSubject.cards).toHaveLength(52);
        expect(testSubject.dealtCards).toHaveLength(0);
        handCards = [];
        handCards.push(...testSubject.dealCards(4));
        expect(handCards).toHaveLength(4);
        expect(testSubject.cards).toHaveLength(52 - 4);
        expect(testSubject.dealtCards).toHaveLength(4);
    });
})