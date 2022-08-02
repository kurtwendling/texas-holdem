import {Deck} from './Deck.js';
import {Hand} from './Hand.js';
import {Card} from './Card.js';

console.clear();

let deck = new Deck();

deck.shuffle(30,30);

//console.log('deck',deck);
//console.log('deck cards', deck.cards.length);

let hand = new Hand();

for (var i = 0; i < 7; i++) {
    hand.cards.push(...deck.dealCards());
}

console.log('hand', hand);

let handEval = hand.hand();
console.log('handEval',handEval);