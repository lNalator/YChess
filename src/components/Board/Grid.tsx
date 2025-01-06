import Box from "./Box";
import Row from "./Row";
import "./board.css";

export default function Grid() {
  return (
    <div className="grid">
      {[...Array(8)].map((_, i) => (
        <Row key={i} className="row">
          {[...Array(8)].map((_, x) => (
            <Box key={x} className={((i + x) % 2 ? "light" : "dark") + " box"}>
              {i},{x}
            </Box>
          ))}
        </Row>
      ))}
    </div>
  );
}
