import { Dispatch, SetStateAction, SyntheticEvent } from "react";
import "../styles/StartModal.css";
import { useGameContext } from "../common/GameContext";

type Props = { setShowStartModal: Dispatch<SetStateAction<boolean>> };

export default function StartModal({ setShowStartModal }: Props) {
  const { setPlayers, deck, setDeck } = useGameContext();

  function handleSubmit({
    target,
  }: SyntheticEvent<HTMLFormElement, SubmitEvent>) {
    const { playerName, botCount } = target as HTMLFormElement;
    const name = playerName.value;
    const botCountValue = parseInt(botCount.value, 10);
    createPlayers(name, botCountValue);
    setShowStartModal(false);
  }

  function createPlayers(playerName: string, botCount: number) {
    const numberOfPlayers = botCount + 1;
    const newPlayers = Array.from({ length: numberOfPlayers }).map((_, i) => {
      const faceDown = deck.splice(0, 4);
      const faceUp = deck.splice(0, 4);
      const hand = deck.splice(0, 4);

      return {
        name: i === 0 ? playerName : `Computer_${i}`,
        hand,
        faceUp,
        faceDown,
      };
    });

    setPlayers(newPlayers);
    setDeck(deck);
  }

  return (
    <div className="modalBackdrop">
      <div className="modalWindow">
        <form onSubmit={handleSubmit}>
          <label htmlFor="playerName">Enter name: </label>
          <input type="text" name="playerName" required />
          <label htmlFor="botCount">Number of opponents: </label>
          <input
            type="number"
            name="botCount"
            defaultValue={1}
            min="1"
            max="3"
            required
          />
          <input type="submit" value="Ok" />
        </form>
      </div>
    </div>
  );
}
