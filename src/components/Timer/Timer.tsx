import { useEffect, useState, useRef } from "react";
import Player from "@/core/entities/player.model";
import "./timer.css";

export default function Timer({
  player,
  className,
}: Readonly<{
  player: Player;
  className?: string;
}>) {
  const [time, setTime] = useState(player.time); // Local state to track time
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const getTime = (timing: number) => {
    if (timing <= 0) {
      clearInterval(intervalRef.current!);
      setTime(0);
      return true;
    }
    setTime(timing - 1);
    player.time = timing - 1; // Update player time
    return false;
  };

  useEffect(() => {
    if (player.isPlaying) {
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

  return (
    <div className={"timer " + className}>
      <div className="minute">
        <p>{minutes < 10 ? `0${minutes}` : minutes}</p>
      </div>
      <div className="second">
        <p>{seconds < 10 ? `0${seconds}` : seconds}</p>
      </div>
    </div>
  );
}
