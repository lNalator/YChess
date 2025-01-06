"use client";
import Timer from "@/components/Timer/Timer";
import "./page.css";
import Grid from "@/components/Board/Grid";
import { useState } from "react";

export default function Home() {
  const [deadline, setDeadline] = useState(0);

  return (
    <main id="main" suppressHydrationWarning={true}>
      <div>
        <select
          className="menu"
          value={deadline}
          onChange={(e) => {
            console.log(e.target.value);
            setDeadline(parseInt(e.target.value));
          }}
        >
          <option value={300000}>5 min</option>
          <option value={600000}>10 min</option>
          <option value={900000}>15 min</option>
        </select>
      </div>

      <p>deadline : {deadline}</p>
      <Timer chosenDeadline={Date.now() + deadline}></Timer>
      <Grid></Grid>
      <StartButton></StartButton>
    </main>
  );
}
