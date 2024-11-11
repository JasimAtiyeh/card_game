import { Card } from "../common/GameContext";
import PlayingCard from "./PlayingCard";
import styles from "../styles/PlayerHand.module.css";

type Props = {
  title: string;
  cards: Card[];
  pile: "hand" | "faceUp" | "faceDown";
  playerName: string;
};

export default function Pile({ title, cards, pile, playerName }: Props) {
  return (
    <div className={styles.boardPile}>
      <h4>{title}</h4>
      <div className={styles.cards}>
        {cards.map((card, index) => (
          <PlayingCard
            key={index}
            playerName={playerName}
            card={card}
            pile={pile}
          />
        ))}
      </div>
    </div>
  );
}
