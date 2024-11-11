import { Card } from "./GameContext";

const SUITS: string[] = ["♣", "♦", "♥", "♠"];
const CARD_VALUES: string[] = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

const CARDS: Card[] = SUITS.flatMap((suit) =>
  CARD_VALUES.map((value) => ({ suit, value }))
);

function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = deck.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const CARDS_SHUFFLED = shuffleDeck(CARDS);

export { CARDS_SHUFFLED };
