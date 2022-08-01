export class Hand {
    cards = []

    deal(card) {
        this.cards.push(card);
    }

    straightEval(cards) {
        if (!cards) {
            return {isStraight:false, rank:null}
        }
        let sorted = cards.sort((a,b) => {return a.value - b.value});
        let count = 0;
        let currentValue = -1;
        sorted.forEach(c => {
            if (c.value === currentValue + 1) {
                count++;
                currentValue++;
            }
            else {
                count = 1;
                currentValue = c.value;
            }
        });
        
        return {isStraight:count >= 5, rank:currentValue};
    }

    hand() {
        let sameValues = [];
        for (let v = 1; v <= 13; v++) {
            let filteredValues = this.cards.filter(c => c.value === v);
            if (filteredValues.length > 0) {
                sameValues.push({value:v,cards:filteredValues});
            }
        }
        
        //console.log('sameValues', sameValues);

        let sameSuites = [];
        for (let s = 1; s <= 4; s++) {
            let filteredSuites = this.cards.filter(c => c.suite === s);
            if (filteredSuites.length > 0) {
                sameSuites.push({suite:s,cards:filteredSuites});
            }
        }

        //console.log('sameSuites', sameSuites);

        let sf = sameSuites.filter(s => s.cards.length >= 5);
        let sfEval = this.straightEval(sf.cards);
        console.log('sfEval',sfEval);
        if (sfEval.isStraight) {
            return {hand:'straight-flush', rank:[sf.rank]}
        }

        let fofk = sameValues.filter(v => v.cards.length === 4);
        console.log('fofk',fofk);
        if (fofk.length > 0) {
            let rank = this.cards.sort((a,b) => {return b.value - a.value})
                .find(c => c.value !== fofk.rank);
            console.log('cards',this.cards);
            return {hand:'four-of-a-kind', rank:[fofk.value, rank.value]};
        }

        let fh = sameValues.filter(s => s.cards.length >= 2)
            .sort((a,b) => {return b.cards.value - a.cards.value})
            .sort((a,b) => {return b.cards.length - a.cards.length});
        console.log('fh',fh);
        if (fh.length >= 2 && fh.find(c => c.cards.length >= 3))
        {
            return {
                hand:'full-house', 
                rank:[
                    fh[0].value,
                    fh[1].value,
                    this.cards.sort((a,b) => {return b.value - a.value})
                        .find(c => c.value !== fh[0].value || c.value !== fh[1].value).value
                    ]
                };
        }

        let f = sameSuites.filter(s => s.cards.length >= 5)
        console.log('f',f);
        if (f.length > 0) {
            var flushCards = f[0].cards;
            flushCards.sort((a,b) => {return b.value - a.value});
            return {hand:'flush', rank:[flushCards[0].value,flushCards[4].value]};
        }

        let s = this.straightEval(this.cards);
        console.log('s',s);
        if (s.isStraight) {
            return {hand:'straight', rank:[s.rank]};
        }

        let tofk = sameValues.filter(v => v.cards.length === 3);
        console.log('tofk',tofk);
        if (tofk.length > 0) {
            let rank = this.cards.sort((a,b) => {return b.value - a.value})
                .find(c => c.value !== tofk.rank);
            console.log('cards',this.cards);
            return {hand:'four-of-a-kind', rank:[tofk[0].value, rank.value]};
        }

        let pairs = sameValues.filter(v => v.cards.length === 2);
        console.log('pairs',pairs);
        if (pairs.length > 0) {
            pairs.sort((a,b) => {return b.value - a.value});
            if (pairs.length > 1)
            {
                let rank = this.cards.sort((a,b) => {return b.value - a.value})
                    .find(c => c.value !== pairs[0].value && c.value !== pairs[1].value);
                console.log('cards',this.cards);
                return {hand:'two-pair', rank:[pairs[0].value, pairs[1].value, rank.value]}
            } else {
                let rank = this.cards.sort((a,b) => {return b.value - a.value})
                    .find(c => c.value !== pairs[0]);
                console.log('cards',this.cards);
                return {hand:'pair', rank:[pairs[0].value, rank.value]}
            }
        }

        console.log('cards',this.cards);

        return {hand:'nothing', rank:this.cards.sort((a,b) => {return b.value - a.value})
            .map(c => {return c.value})};
    }
}

/*
Possible hands are, in descending order of value:
1.	Straight-flush (five consecutive ranks of the same suit). Higher rank is better.
2.	Four-of-a-kind (four cards with the same rank). Tiebreaker is first the rank, then the rank of the remaining card.
3.	Full house (three cards with the same rank, two with another). Tiebreaker is first the rank of the three cards, then rank of the pair.
4.	Flush (five cards of the same suit). Higher ranks are better, compared from high to low rank.
5.	Straight (five consecutive ranks). Higher rank is better.
6.	Three-of-a-kind (three cards of the same rank). Tiebreaker is first the rank of the three cards, then the highest other rank, then the second-highest other rank.
7.	Two pair (two cards of the same rank, two cards of another rank). Tiebreaker is first the rank of the high pair, then the rank of the low pair and then the rank of the remaining card.
8.	Pair (two cards of the same rank). Tiebreaker is first the rank of the two cards, then the three other ranks.
9.	Nothing. Tiebreaker is the rank of the cards from high to low.
Given hole cards and community cards, complete the function hand to return the type of hand (as written above, you can ignore case) and a list of ranks in decreasing order of significance, to use for comparison against other hands of the same type, of the best possible hand.
for Straights with an Ace, only the ace-high straight is accepted. An ace-low straight is invalid (ie. A,2,3,4,5 is invalid). This is consistent with the author's reference solution. 
*/