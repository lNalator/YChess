import { useEffect, useState } from "react";
import "./timer.css";

export default function Timer({
  chosenTime,
  className,
  isPlaying,
}: Readonly<{
  chosenTime: number;
  isPlaying?: boolean;
  className?: string;
}>) {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [time, setTime] = useState(chosenTime);

  const getTime = (timing: number) => {
    if (timing <= 0) {
      setMinutes(0);
      setSeconds(0);
      return true;
    }
    setTime(timing - 1);
    setMinutes(Math.floor((timing / 60) % 60));
    setSeconds(Math.floor(timing % 60));
    return false;
  };

  useEffect(() => {
    getTime(chosenTime);
  }, [chosenTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying && getTime(time)) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [time, isPlaying]);

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
