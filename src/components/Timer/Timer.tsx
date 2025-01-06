import { useEffect, useState } from "react";
import "./timer.css";

export default function Timer({ chosenDeadline }: { chosenDeadline: number }) {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const getTime = (deadline: number) => {
    let time = deadline - Date.now();
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    setMinutes(0);
    setSeconds(0);
    const interval = setInterval(() => getTime(chosenDeadline), 1000);

    return () => clearInterval(interval);
  }, [chosenDeadline]);
  return (
    <div className="timer">
      <div className="minute">
        <p>{minutes}</p>
      </div>
      <div className="second">
        <p>{seconds}</p>
      </div>
    </div>
  );
}
