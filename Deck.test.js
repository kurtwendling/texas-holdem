import {Deck} from './Deck.js';

describe("Deck", () => {

    it('Sets up a deck with 52 cards', () => {
        var testSubject = new Deck();
        expect(textSubject.Cards).toHaveLength(52);
    })
})