import { SyntheticEvent, useState } from "react";
import "../styles/StartModal.css";

type Props = {
  createPlayers: Function;
};

export default function StartModal({ createPlayers }: Props) {
  const [showStartModal, setShowStartModal] = useState<boolean>(true);

  function handleSubmit(event: SyntheticEvent<HTMLFormElement, SubmitEvent>) {
    event.preventDefault();
    const playerName = (event.target as HTMLFormElement)["playerName"].value;
    const numberOfPlayers = (event.target as HTMLFormElement)["numberOfPlayers"]
      .value;
    createPlayers(playerName, numberOfPlayers);
    setShowStartModal(false);
  }

  return showStartModal ? (
    <form onSubmit={handleSubmit}>
      <label htmlFor="playerName">Enter name: </label>
      <input type="text" name="playerName" />
      <label htmlFor="numberOfPlayers">Number of opponents: </label>
      <input type="number" name="numberOfPlayers" defaultValue={2} />
      <input type="submit" value="Ok" />
    </form>
  ) : null;
}
