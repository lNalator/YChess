import StartButton from "@/components/StartButton/StartButton";
import "./page.css";
import Grid from "@/components/Board/Grid";

export default function Home() {
  return (
    <main id="main">
      <Grid></Grid>
      <StartButton></StartButton>
    </main>
  );
}
