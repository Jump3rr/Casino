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

// dodaj karty ze stołu
export function checkWinner(players: Player[], tableCards: Card[]) {
  console.log(players);
  players.forEach((el) => {
    const allCards = el.cards.concat(tableCards);
    let result = 0;
    if (checkForPoker(allCards) !== 0) {
      result = checkForPoker(allCards);
    } else if (checkForFourOfAKind(allCards) !== 0) {
      result = checkForFourOfAKind(allCards);
    } else if (checkForFullHouse(allCards) !== 0) {
      result = checkForFullHouse(allCards);
    } else if (checkForFlush(allCards) !== 0) {
      result = checkForFlush(allCards);
    } else if (checkForStraight(allCards) !== 0) {
      result = checkForStraight(allCards);
    } else if (checkForThreeOfAKind(allCards) !== 0) {
      result = checkForThreeOfAKind(allCards);
    } else if (checkForTwoPairs(allCards) !== 0) {
      result = checkForTwoPairs(allCards);
    } else if (checkForPair(allCards) !== 0) {
      result = checkForPair(allCards);
    }
    console.log(result);
    el.result = result;
  });
  return sortPlayers(players);
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

function checkForPoker(cards: Card[]): number {
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
      return 8;
    }
  }
  return 0;
}

function checkForFourOfAKind(cards: Card[]): number {
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
      return 7;
    }
  }
  return 0;
}

function checkForFullHouse(cards: Card[]): number {
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
    return 6;
  }

  return 0;
}

function checkForFlush(cards: Card[]): number {
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
      return 5;
    }
  }

  return 0;
}
function checkForStraight(cards: Card[]): number {
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
      return 4;
    }
  }
  return 0;
}

function checkForThreeOfAKind(cards: Card[]): number {
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
      return 3;
    }
  }

  return 0;
}

function checkForTwoPairs(cards: Card[]): number {
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
    return 2;
  }
  return 0;
}

function checkForPair(cards: Card[]): number {
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
      return 1;
    }
  }

  return 0;
}
