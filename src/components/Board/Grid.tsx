import Piece from "@/core/entities/piece.model";
import Box from "./Box";
import Row from "./Row";
import "./board.css";
import { Atom } from "jotai";
import Image from "next/image";

export default function Grid({
  piecesState,
}: Readonly<{ piecesState?: Array<any> }>) {
  const nbFiles = 8;

  const flatPiecesState = piecesState ? piecesState.flat() : [];

  return (
    <div className="grid">
      {[...Array(nbFiles)].map((_, vertical) => (
        <Row key={vertical} className="row">
          {[...Array(nbFiles)].map((_, horizontal) => {
            const piece = flatPiecesState.find(
              (p) =>
                p.init?.position?.vertical === vertical &&
                p.init?.position?.horizontal === horizontal
            );
            return (
              <Box
                key={vertical * 10 + horizontal}
                className={
                  ((vertical + horizontal) % 2 ? "light" : "dark") + " box"
                }
              >
                {piece && (
                  <Image
                    src={`/imgs/${
                      Array.from(piece.init.color.toLowerCase())[0]
                    }${Array.from(piece.init.name.toLowerCase())[0]}.png`}
                    width={100}
                    height={100}
                    alt={`${piece.init.color} piece`}
                    className="piece"
                  />
                )}
              </Box>
            );
          })}
        </Row>
      ))}
    </div>
  );
}
