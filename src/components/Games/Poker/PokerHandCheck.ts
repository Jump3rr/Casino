import { Player } from '../../../entities/types';
import { Card } from '../Cards/Cards';

const karty = [
  { rank: 8, suit: '♦', value: 6, used: false },
  { rank: 8, suit: '♦', value: 6, used: false },
  { rank: 8, suit: '♦', value: 6, used: false },
  { rank: 8, suit: '♦', value: 6, used: false },
  { rank: 8, suit: '♦', value: 6, used: false },
  { rank: 8, suit: '♦', value: 6, used: false },
  { rank: 8, suit: '♦', value: 6, used: false },
];

const karty1 = [
  { rank: 4, suit: '♦', value: 2 },
  { rank: 10, suit: '♦', value: 8 },
];

const karty2 = [
  { rank: 5, suit: '♦', value: 3 },
  { rank: 6, suit: '♦', value: 4 },
  { rank: 4, suit: '♦', value: 2 },
  { rank: 9, suit: '♦', value: 7 },
  { rank: 6, suit: '♦', value: 4 },
];

// dodaj karty ze stołu
export function checkWinner(players: Player[], tableCards: Card[]) {
  players.forEach((el) => {
    //const copy = [el.cards.concat(tableCards)];
    const copy = JSON.parse(JSON.stringify(el.cards.concat(tableCards)));
    let result = 0;
    if (checkForPoker(copy) !== 0) {
      result = checkForPoker(el.cards.concat(tableCards));
    } else if (checkForFourOfAKind(copy) !== 0) {
      result = checkForFourOfAKind(el.cards.concat(tableCards));
    } else if (checkForFullHouse(copy) !== 0) {
      result = checkForFullHouse(el.cards.concat(tableCards));
    } else if (checkForFlush(copy) !== 0) {
      result = checkForFlush(el.cards.concat(tableCards));
    } else if (checkForStraight(copy) !== 0) {
      result = checkForStraight(el.cards.concat(tableCards));
    } else if (checkForThreeOfAKind(copy) !== 0) {
      result = checkForThreeOfAKind(el.cards.concat(tableCards));
    } else if (checkForTwoPairs(copy) !== 0) {
      result = checkForTwoPairs(el.cards.concat(tableCards));
    } else if (checkForPair(copy) !== 0) {
      result = checkForPair(el.cards.concat(tableCards));
    }
    el.result = result;
  });
  return sortPlayers(players, tableCards);
}

function sortPlayers(arr: Player[], tableCards: Card[]) {
  const sortedArr = [...arr];
  sortedArr.sort(function (x, y) {
    var n = x.result - y.result;
    if (n !== 0) {
      return n;
    }
    const first = x.cards.concat(tableCards);
    const second = y.cards.concat(tableCards);
    first
      .sort(function (a, b) {
        if (a.used !== b.used) {
          return a.used ? 1 : -1;
        }
        return a.value - b.value;
      })
      .reverse();
    second
      .sort(function (a, b) {
        if (a.used !== b.used) {
          return a.used ? 1 : -1;
        }
        return a.value - b.value;
      })
      .reverse();
    for (let i = 0; i < first.length; i++) {
      if (first[i].used && second[i].used) {
        if (first[i].value !== second[i].value)
          return first[i].value - second[i].value;
      }
      if (first[i].used) {
        return 1;
      }
      if (second[i].used) {
        return -1;
      }
      if (first[i].value !== second[i].value) {
        return first[i].value - second[i].value;
      }
    }
    return 0;
  });
  return sortedArr.reverse();
}

function checkForPoker(cards: Card[]): number {
  const userCards = [cards[0], cards[1]];
  cards.sort((a, b) => a.value - b.value);
  let consecutiveCards = 0;
  let previousCardSuit = null;
  let pokerSuit = null;
  for (let i = 0; i < cards.length; i++) {
    if (previousCardSuit === null || cards[i].suit !== previousCardSuit) {
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
      pokerSuit = previousCardSuit;
    }
  }

  for (let i = 0; i < 2; i++) {
    if (userCards[i].suit === pokerSuit) {
      userCards[i].used = true;
    }
  }

  if (pokerSuit) {
    return 8;
  }
  return 0;
}
function checkForFourOfAKind(cards: Card[]): number {
  let cardValues: { [key: number]: number } = {};
  let fourOfAKindValue = null;

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
      fourOfAKindValue = value;
    }
  }

  for (let i = 0; i < 2; i++) {
    if (cards[i].value === Number(fourOfAKindValue)) {
      cards[i].used = true;
    }
  }

  if (fourOfAKindValue) {
    return 7;
  }
  return 0;
}

function checkForFullHouse(cards: Card[]): number {
  let cardValues: { [key: number]: number } = {};
  let threeOfAKindValue = null;
  let twoOfAKindValue = null;

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
      threeOfAKindValue = value;
    } else if (cardValues[value] === 2) {
      twoOfAKindValue = value;
    }
  }

  for (let i = 0; i < 2; i++) {
    if (
      cards[i].value === Number(threeOfAKindValue) ||
      cards[i].value === Number(twoOfAKindValue)
    ) {
      cards[i].used = true;
    }
  }

  if (threeOfAKindValue && twoOfAKindValue) {
    return 6;
  }

  return 0;
}

function checkForFlush(cards: Card[]): number {
  let cardSuits: { [key: string]: number } = {};
  let flushSuit = null;

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
      flushSuit = suit;
    }
  }

  for (let i = 0; i < 2; i++) {
    if (cards[i].suit === flushSuit) {
      cards[i].used = true;
    }
  }

  if (flushSuit) {
    return 5;
  }
  return 0;
}

function checkForStraight(cards: Card[]): number {
  const userCards = [cards[0], cards[1]];
  cards.sort((a, b) => a.value - b.value);
  let consecutiveCards = 1;

  for (let i = 1; i < cards.length; i++) {
    if (cards[i].value === cards[i - 1].value + 1) {
      consecutiveCards++;
      if (i === 1) {
        if (userCards.includes(cards[i - 1])) {
          cards[i - 1].used = true;
        }
      }
      if (userCards.includes(cards[i])) {
        //console.log(cards[i]);
        cards[i].used = true;
      }
    } else if (consecutiveCards < 5 && cards[i].value === cards[i - 1].value) {
      continue;
    } else if (consecutiveCards < 5) {
      consecutiveCards = 1;
    }
    if (consecutiveCards >= 5 && i === cards.length - 1) {
      return 4;
    }
  }
  return 0;
}

function checkForThreeOfAKind(cards: Card[]): number {
  let cardValues: { [key: number]: number } = {};
  let tripleValue = null;

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
      tripleValue = value;
    }
  }

  for (let i = 0; i < 2; i++) {
    if (cards[i].value == Number(tripleValue)) {
      cards[i].used = true;
    }
  }

  if (tripleValue) {
    return 3;
  }
  return 0;
}

function checkForTwoPairs(cards: Card[]): number {
  let cardValues: { [key: number]: number } = {};
  let pairs = 0;
  let pairValues: number[] = [];

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
      pairValues.push(Number(value));
    }
  }

  for (let i = 0; i < 2; i++) {
    if (pairValues.includes(cards[i].value)) {
      cards[i].used = true;
    }
  }

  if (pairs >= 2) {
    return 2;
  }
  return 0;
}

function checkForPair(cards: Card[]): number {
  let cardValues: { [key: number]: number } = {};
  let pairValue = null;

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
      pairValue = value;
    }
  }

  for (let i = 0; i < 2; i++) {
    if (cards[i].value == Number(pairValue)) {
      cards[i].used = true;
    }
  }

  if (pairValue) {
    return 1;
  }
  return 0;
}
