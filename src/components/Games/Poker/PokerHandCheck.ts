import { Card } from '../Cards/Cards';
import { Player } from './PokerGame';

const karty = [
  { rank: 8, suit: '♦' },
  { rank: 8, suit: '♦' },
  { rank: 8, suit: '♦' },
  { rank: 8, suit: '♦' },
  { rank: 8, suit: '♦' },
  { rank: 8, suit: '♦' },
  { rank: 8, suit: '♦' },
];

type PokerResult = {
  id: string;
  result: number;
  cards: number[];
};

function checkWinner(players: Player[]) {
  players.forEach((el) => {
    let result = 0;
    // while(result === 0) {
    //   result = checkForPoker(el.cards);
    //   result = checkForFourOfAKind(el.cards);

    // }
    // if (checkForPoker(el.cards) !== 0) {
    // }
  });
}

function sortPlayers(arr: any[]) {
  arr.forEach((el) => {
    el.cards.sort();
    el.cards.reverse();
  });
  arr.sort(function (x, y) {
    var n = x.result - y.result;
    if (n !== 0) {
      return n;
    }
    var m = x.cards[0].value - y.cards[0].value;
    if (m !== 0) {
      return m;
    }
    return x.cards[1].value - y.cards[1].value;
  });
  return arr.reverse();
}

function checkForPoker(cards: Card[]): boolean {
  cards.sort((a, b) => a.value - b.value);
  let consecutiveCards = 0;
  let previousCardSuit = null;

  for (let i = 0; i < cards.length; i++) {
    if (previousCardSuit === null) {
      consecutiveCards = 1;
      previousCardSuit = cards[i].suit;
    } else if (cards[i].suit === previousCardSuit) {
      if (cards[i].value === cards[i - 1].value + 1) {
        consecutiveCards++;
        previousCardSuit = cards[i].suit;
      } else {
        consecutiveCards = 1;
        previousCardSuit = cards[i].suit;
      }
    }
    if (consecutiveCards === 5) {
      return true;
    }
  }
  return false;
}

function checkForFourOfAKind(cards: Card[]): boolean {
  let cardValues: { [key: number]: number } = {};

  for (let i = 0; i < cards.length; i++) {
    let card = cards[i];
    if (cardValues[card.value]) {
      cardValues[card.value]++;
    } else {
      cardValues[card.value] = 1;
    }
  }

  for (let value in cardValues) {
    if (cardValues[value] === 4) {
      return true;
    }
  }
  return false;
}

function checkForFullHouse(cards: Card[]): boolean {
  let cardValues: { [key: number]: number } = {};
  let threeOfAKind: boolean = false;
  let twoOfAKind: boolean = false;

  for (let i = 0; i < cards.length; i++) {
    let card = cards[i];
    if (cardValues[card.value]) {
      cardValues[card.value]++;
    } else {
      cardValues[card.value] = 1;
    }
  }

  for (let value in cardValues) {
    if (cardValues[value] === 3) {
      threeOfAKind = true;
    } else if (cardValues[value] === 2) {
      twoOfAKind = true;
    }
  }

  if (threeOfAKind && twoOfAKind) {
    return true;
  }

  return false;
}

function checkForFlush(cards: Card[]): boolean {
  let cardSuits: { [key: string]: number } = {};

  for (let i = 0; i < cards.length; i++) {
    let card = cards[i];
    if (cardSuits[card.suit]) {
      cardSuits[card.suit]++;
    } else {
      cardSuits[card.suit] = 1;
    }
  }

  for (let suit in cardSuits) {
    if (cardSuits[suit] >= 5) {
      return true;
    }
  }

  return false;
}
function checkForStraight(cards: Card[]): boolean {
  cards.sort((a, b) => a.value - b.value);
  let consecutiveCards = 1;

  for (let i = 1; i < cards.length; i++) {
    if (cards[i].value === cards[i - 1].value + 1) {
      consecutiveCards++;
    } else if (cards[i].value === cards[i - 1].value) {
      continue;
    } else {
      consecutiveCards = 1;
    }
    if (consecutiveCards === 5) {
      return true;
    }
  }
  return false;
}

function checkForThreeOfAKind(cards: Card[]): boolean {
  let cardValues: { [key: number]: number } = {};

  for (let i = 0; i < cards.length; i++) {
    let card = cards[i];
    if (cardValues[card.value]) {
      cardValues[card.value]++;
    } else {
      cardValues[card.value] = 1;
    }
  }

  for (let value in cardValues) {
    if (cardValues[value] === 3) {
      return true;
    }
  }

  return false;
}

function checkForTwoPairs(cards: Card[]): boolean {
  let cardValues: { [key: number]: number } = {};
  let pairs = 0;

  for (let i = 0; i < cards.length; i++) {
    let card = cards[i];
    if (cardValues[card.value]) {
      cardValues[card.value]++;
    } else {
      cardValues[card.value] = 1;
    }
  }

  for (let value in cardValues) {
    if (cardValues[value] === 2) {
      pairs++;
    }
  }

  if (pairs >= 2) {
    return true;
  }
  return false;
}

function checkForPair(cards: Card[]): boolean {
  let cardValues: { [key: number]: number } = {};

  for (let i = 0; i < cards.length; i++) {
    let card = cards[i];
    if (cardValues[card.value]) {
      cardValues[card.value]++;
    } else {
      cardValues[card.value] = 1;
    }
  }

  for (let value in cardValues) {
    if (cardValues[value] === 2) {
      return true;
    }
  }

  return false;
}
