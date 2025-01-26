import { useEffect, useState, useRef } from "react";
import Player from "@/core/entities/player.model";
import "./timer.css";
import Image from "next/image";
import PlayerHelper from "@/core/helpers/player.helper";
import { useAtom } from "jotai";
import { gameStateAtom } from "@/core/data/gameState";
import GameButtons from "../GameButtons/GameButtons";

export default function Timer({
  player,
  className,
}: Readonly<{
  player: Player;
  className?: string;
}>) {
  const [gameState, setGameState] = useAtom(gameStateAtom);
  const { players, hasGameEnded } = gameState;
  const oponnentPlayer = PlayerHelper.getOpponentPlayer(player, players);
  const [time, setTime] = useState(player.time); // Local state to track time

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const getTime = (timing: number) => {
    if (hasGameEnded) {
      clearInterval(intervalRef.current!);
      return false;
    }
    
    if (timing <= 0) {
      clearInterval(intervalRef.current!);
      setTime(0);
      handleLostByTime();
      return true;
    }
    
    setTime(timing - 1);
    player.time = timing - 1; // Update player time
    return false;
  };

  useEffect(() => {
    if (player.isPlaying && player.time > 0) {
      intervalRef.current = setInterval(() => {
        getTime(player.time);
      }, 1000);
    }

    return () => clearInterval(intervalRef.current!); // Cleanup on unmount or state change
  }, [player.isPlaying]); // Only re-run when `isPlaying` changes

  useEffect(() => {
    setTime(player.time); // Sync local time with the player's time
  }, [player.time]); // Trigger when `player.time` changes

  const minutes = Math.floor((time / 60) % 60);
  const seconds = Math.floor(time % 60);

  // Group eaten pieces by type
  const groupedEatenPieces = player.eatenPieces.reduce((acc, piece) => {
    const key = piece.color + piece.name;
    acc[key] = acc[key] || [];
    acc[key].push(piece);
    return acc;
  }, {} as Record<string, typeof player.eatenPieces>);

  const sortedGroupedEatenPieces = Object.values(groupedEatenPieces).sort(
    (a, b) => a[0].value - b[0].value
  );

  const playerPointDifference = PlayerHelper.getPlayersScoreDiff(
    player,
    oponnentPlayer
  );

  function handleLostByTime() {
    if (!hasGameEnded && time <= 0) {
      oponnentPlayer.score++;
      setGameState({
        ...gameState,
        hasGameEnded: true,
        winner: oponnentPlayer,
        reason: { timeout: true },
      });
    }
  }

  return (
    <div className={"timer " + className}>
      <div className="timer-rightSide">
        <h1 className="timer-player-name">{player.name}</h1>
        <div className="timer-player-eaten-pieces">
          {sortedGroupedEatenPieces.map((pieces, index) => (
            <div key={index} className="eaten-piece-group">
              {pieces.map((piece, i) => (
                <Image
                  key={i}
                  width={35}
                  height={35}
                  src={`/imgs/${Array.from(piece.color.toLowerCase())[0]}${
                    Array.from(piece.name.toLowerCase())[0]
                  }.png`}
                  alt={piece.color + " " + piece.name}
                  className="eatenPiece"
                />
              ))}
            </div>
          ))}
          {playerPointDifference > 0 && (
            <div className="eaten-piece-score">+ {playerPointDifference}</div>
          )}
        </div>
      </div>
      <div className="timer-score">
        <p>{player.score}</p>
      </div>
      <div className="timer-leftSide">
        <div className="time">
          <p>
            {minutes < 10 ? `0${minutes} ` : minutes + " "}:
            {seconds < 10 ? ` 0${seconds}` : " " + seconds}
          </p>
        </div>
        <GameButtons player={player} />
      </div>
    </div>
  );
}
