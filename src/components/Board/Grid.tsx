import Box from "./Box";
import Row from "./Row";
import "./board.css";

export default function Grid() {
  const nbFiles = 8;

  return (
    <div className="grid">
      {[...Array(nbFiles)].map((_, i) => (
        <Row key={i} className="row">
          {[...Array(nbFiles)].map((_, x) => (
            <Box
              key={i * 10 + x}
              className={((i + x) % 2 ? "light" : "dark") + " box"}
            >
              {i}
              {x}
            </Box>
          ))}
        </Row>
      ))}
    </div>
  );
}
