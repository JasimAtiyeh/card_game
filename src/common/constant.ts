import { Card, SuitIcon } from "./types";

const SUITS: SuitIcon[] = ["♣", "♦", "♥", "♠"];
const CARD_VALUES: Array<string | number> = [
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  "J",
  "Q",
  "K",
  "A",
];
const CARDS: Card[] = CARD_VALUES.map((value) => {
  return SUITS.map((suit) => {
    return {
      value,
      suit,
    };
  });
}).flat();

const CARDS_SHUFFLED = (function () {
  for (let i = 0; i < CARDS.length; i++) {
    let shuffle = Math.floor(Math.random() * CARDS.length);
    [CARDS[i], CARDS[shuffle]] = [CARDS[shuffle], CARDS[i]];
  }
  return CARDS;
})();

export { CARDS_SHUFFLED };
