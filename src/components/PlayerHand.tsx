import { useMemo, useState } from "react";
import { Card } from "../common/types";
import PlayingCard from "./PlayingCard";

type Props = {
  playerName: string;
  cards: Card[];
};

// Cards being removed but page not rerendering
export default function PlayerHand({ playerName, cards }: Props) {
  const [playerHand, setPlayerHand] = useState(cards);

  function removeCard({ suit, value }: Card) {
    setPlayerHand((prevHand) =>
      prevHand.filter((card) => card.suit !== suit || card.value !== value)
    );
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
