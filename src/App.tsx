import "./styles/App.css";
import { CARDS_SHUFFLED } from "./common/constant";
import { Card, Player } from "./common/types";
import { useEffect, useState } from "react";
import StartModal from "./components/StartModal";
import PlayerHand from "./components/PlayerHand";

function App() {
  let shuffledCards: Card[] = Array.from(CARDS_SHUFFLED);
  const [players, setPlayers] = useState<Array<Player>>([]);

  // For development
  // Keeps a running count on the cards througtout the game
  useEffect(() => {
    let consoleLog: any = { deck: shuffledCards.length };
    let count = shuffledCards.length;
    players.forEach((player) => {
      consoleLog[player.name] = player.hand.length;
      count += player.hand.length;
    });
    consoleLog.totalCount = count;
    console.log(consoleLog);
  }, [players, shuffledCards.length]);

  function createPlayers(playerName: string, numberOfPlayers: number) {
    const players: Player[] = [];
    for (let i = 0; i < numberOfPlayers; i++) {
      const playerHand = shuffledCards.splice(0, 12);
      players.push({
        name: i === 0 ? playerName : `Computer_${i}`,
        hand: playerHand,
      });
    }
    setPlayers(players);
  }
  return (
    <div>
      <header>Shithead</header>
      <StartModal createPlayers={createPlayers} />
      <div className="board">
        {players.map(({ name, hand }, index) => {
          const playerName = index === 0 ? name : `Computer ${index}`;
          return (
            <PlayerHand key={index} playerName={playerName} cards={hand} />
          );
        })}
      </div>
    </div>
  );
}

export default App;
