import { useRef, useState } from "react";
import { useGameContext, Card } from "../common/GameContext";
import styles from "../styles/PlayingCard.module.css";

type Props = {
  card: Card;
  playerName?: string;
  pile?: "hand" | "faceUp" | "faceDown";
  disabled?: boolean;
};

export default function PlayingCard({
  card,
  playerName,
  pile,
  disabled = false,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [fly, setFly] = useState(false);
  const {
    players,
    setPlayers,
    discardPosition,
    discardPile,
    setDiscardPile,
    deck,
    setDeck,
    currentTurnIndex,
    setCurrentTurnIndex,
  } = useGameContext();

  function removeCardFromPile(cards: Card[], card: Card): Card[] {
    setDiscardPile((prevPile) => [...prevPile, card]);
    return cards.filter((c) => c.suit !== card.suit || c.value !== card.value);
  }

  function handleCardClick(e: any) {
    if (disabled || !card || deck.length === 0) return;

    const playerIndex = players.findIndex(
      (player) => player.name === playerName
    );
    const currentPlayer = players[playerIndex];
    const activePlayerName = players[currentTurnIndex];
    if (currentPlayer.name !== activePlayerName.name) return;

    // Check if animation should be triggered based on pile type and hand status
    const shouldAnimate =
      pile === "hand" ||
      (pile === "faceUp" && currentPlayer.hand.length === 0) ||
      (pile === "faceDown" &&
        currentPlayer.hand.length === 0 &&
        currentPlayer.faceUp.length === 0);

    if (shouldAnimate) {
      const cardRect = cardRef.current!.getBoundingClientRect();
      const x = discardPosition.x - cardRect.left;
      const y = discardPosition.y - cardRect.top;
      cardRef.current!.style.setProperty("--discard-x", `${x}px`);
      cardRef.current!.style.setProperty("--discard-y", `${y}px`);
      setFly(true);
    }

    // Delay state update to allow animation to finish
    setTimeout(
      () => {
        setPlayers((prevPlayers) => {
          const playerIndex = players.findIndex(
            (player) => player.name === playerName
          );
          const currentPlayer = prevPlayers[playerIndex];

          if (pile === "hand") {
            currentPlayer.hand = removeCardFromPile(currentPlayer.hand, card);
            const newCard = deck.pop();
            if (newCard) currentPlayer.hand.push({ ...newCard });
            setDeck([...deck]);
          } else if (pile === "faceUp" && currentPlayer.hand.length === 0) {
            currentPlayer.faceUp = removeCardFromPile(
              currentPlayer.faceUp,
              card
            );
          } else if (
            pile === "faceDown" &&
            currentPlayer.hand.length === 0 &&
            currentPlayer.faceUp.length === 0
          ) {
            currentPlayer.faceDown = removeCardFromPile(
              currentPlayer.faceDown,
              card
            );
          }

          return prevPlayers;
        });

        // setDiscardPile((prevPile) => [...prevPile, card]);
        setFly(false);
      },
      shouldAnimate ? 500 : 0
    );
    nextPlayerTurn();
  }

  const nextPlayerTurn = () => {
    const nextIndex = (currentTurnIndex + 1) % players.length;
    setCurrentTurnIndex(nextIndex);

    // Run computer's turn logic
    if (players[nextIndex].name.includes("Computer")) {
      runComputerTurn(); // Call the function that handles computer's turn
    }
  };

  const runComputerTurn = () => {
    const topCard = discardPile[discardPile.length - 1];

    // Find the computer's hand that has a card higher than the discard pile
    const activeComputerPlayer = players[currentTurnIndex];
    console.log(activeComputerPlayer, currentTurnIndex);
    const cardToPlay = activeComputerPlayer.hand.find((card) => {
      // Assuming you have a way to compare card values
      return card.value > topCard.value;
    });

    if (cardToPlay) {
      // Trigger the click event on the found card
      const cardElement = document.getElementById(
        `card-${card.suit}-${card.value}`
      );
      cardElement?.click();
    }
  };

  const { suit, value } = card;
  const className =
    pile !== "faceDown" && (suit === "♥" || suit === "♦")
      ? styles.red
      : styles.black;
  const suitToShow = pile === "faceDown" ? "?" : suit;
  const valueToShow = pile === "faceDown" ? "?" : value;

  return (
    <section
      id={`card-${suitToShow}-${valueToShow}`}
      className={`${styles.card} ${fly ? styles.fly : ""}`}
      ref={cardRef}
      onClick={handleCardClick}
    >
      <div className={className}>{suitToShow}</div>
      <div>{valueToShow as string}</div>
      <div className={className}>{suitToShow}</div>
    </section>
  );
}
