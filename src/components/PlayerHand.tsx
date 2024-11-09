import { useMemo } from "react";
import { Card } from "../common/types";
import PlayingCard from "./PlayingCard";

type Props = {
  playerName: string;
  cards: Card[];
};

// Cards being removed but page not rerendering
export default function PlayerHand({ playerName, cards }: Props) {
  const playerHand = useMemo(() => cards, [cards]);

  function removeCard({ suit, value }: Card) {
    const index = cards.findIndex(
      (card) => card.suit === suit && card.value === value
    );
    cards.splice(index, 1);
    return cards;
  }

  return (
    <section>
      <div>{playerName}</div>
      {playerHand.map(({ suit, value }, index) => (
        <div onClick={() => removeCard({ suit, value })}>
          <PlayingCard key={index} suit={suit} value={value} />
        </div>
      ))}
    </section>
  );
}
