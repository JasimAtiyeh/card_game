import { useEffect, useRef } from "react";
import { useGameContext } from "../common/GameContext";
import PlayerHand from "./PlayerHand";
import styles from "../styles/GameBoard.module.css";
import PlayingCard from "./PlayingCard";

export default function GameBoard() {
  const { deck, discardPile, setDiscardPosition, players } = useGameContext();
  const discardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (discardRef.current) {
      const rect = discardRef.current.getBoundingClientRect();
      setDiscardPosition({ x: rect.left, y: rect.top });
    }
  }, []);

  useEffect(() => {
    console.log({
      deckCount: deck.length,
      discardPileCount: discardPile.length,
      total:
        players.reduce((prev, curr) => {
          return (
            prev + curr.hand.length + curr.faceDown.length + curr.faceUp.length
          );
        }, 0) +
        discardPile.length +
        deck.length,
    });
  }, [players, deck, discardPile]);

  const playerPositions = ["top", "bottom", "left", "right"];

  return (
    <div className={styles.board}>
      {players.map((player, index) => (
        <div key={index} className={styles[playerPositions[index]]}>
          <PlayerHand player={player} />
        </div>
      ))}

      <div className={styles.center}>
        <div className={styles.deck}>
          {deck.length > 0 && (
            <PlayingCard card={{ suit: "?", value: "?" }} disabled />
          )}
        </div>
        <div className={styles.discardPile} ref={discardRef}>
          {discardPile.length > 0 && (
            <PlayingCard card={discardPile[discardPile.length - 1]} disabled />
          )}
        </div>
      </div>
    </div>
  );
}
