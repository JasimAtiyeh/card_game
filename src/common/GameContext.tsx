import React, { createContext, useContext, useState, ReactNode } from "react";
import { CARDS_SHUFFLED } from "./constant";

export type Card = {
  suit: string;
  value: string;
};

export type Player = {
  name: string;
  hand: Card[];
  faceUp: Card[];
  faceDown: Card[];
};

type DiscardPosition = { x: number; y: number };

export type GameContextType = {
  deck: Card[];
  setDeck: React.Dispatch<React.SetStateAction<Card[]>>;
  players: Player[];
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  discardPile: Card[];
  setDiscardPile: React.Dispatch<React.SetStateAction<Card[]>>;
  discardPosition: DiscardPosition;
  setDiscardPosition: React.Dispatch<React.SetStateAction<DiscardPosition>>;
  currentTurnIndex: number;
  setCurrentTurnIndex: React.Dispatch<React.SetStateAction<number>>;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [deck, setDeck] = useState<Card[]>(CARDS_SHUFFLED);
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0);
  const [discardPile, setDiscardPile] = useState<Card[]>([]);
  const [discardPosition, setDiscardPosition] = useState<DiscardPosition>({
    x: 0,
    y: 0,
  });

  return (
    <GameContext.Provider
      value={{
        deck,
        setDeck,
        players,
        setPlayers,
        discardPile,
        setDiscardPile,
        discardPosition,
        setDiscardPosition,
        currentTurnIndex,
        setCurrentTurnIndex,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};
