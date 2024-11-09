type Card = {
  value: string | number;
  suit: SuitIcon;
};

type SuitIcon = "♠" | "♥" | "♦" | "♣";

type Player = {
  name: string;
  hand: Card[];
};

export type { Card, SuitIcon, Player };
