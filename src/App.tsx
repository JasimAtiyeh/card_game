import { useState } from "react";
import { GameProvider, useGameContext } from "./common/GameContext"; // Ensure GameProvider is imported here
import GameBoard from "./components/GameBoard";
import StartModal from "./components/StartModal";
import "./styles/App.css";

function App() {
  const [showStartModal, setShowStartModal] = useState(true);

  return (
    <GameProvider>
      <header>
        <div className="header-title">Shithead</div>
        {!showStartModal && <GameTurnDisplay />}
      </header>
      {showStartModal ? (
        <StartModal setShowStartModal={setShowStartModal} />
      ) : (
        <GameBoard />
      )}
    </GameProvider>
  );
}

function GameTurnDisplay() {
  const { players, currentTurnIndex } = useGameContext();
  const currentPlayer = players[currentTurnIndex];
  return <div className="header-turn">Turn: {currentPlayer.name}</div>;
}

export default App;
