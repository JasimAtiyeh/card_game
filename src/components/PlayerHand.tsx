import { Player } from "../common/GameContext";
import styles from "../styles/PlayerHand.module.css";
import Pile from "./CardPile";

type Props = {
  player: Player;
};

export default function PlayerHand({ player }: Props) {
  const { name, faceDown, faceUp, hand } = player;
  return (
    <>
      <h3>{name}</h3>
      <div className={styles.playerHand}>
        {faceDown.length > 0 && (
          <Pile
            title="Face-Down"
            cards={faceDown}
            pile="faceDown"
            playerName={name}
          />
        )}
        {faceUp.length > 0 && (
          <Pile
            title="Face-Up"
            cards={faceUp}
            pile="faceUp"
            playerName={name}
          />
        )}
        {hand.length > 0 && !name.includes("Computer") && (
          <Pile title="Your Hand" cards={hand} pile="hand" playerName={name} />
        )}
      </div>
    </>
  );
}
