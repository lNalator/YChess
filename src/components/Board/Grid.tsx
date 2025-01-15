import Box from "./Box";
import Row from "./Row";
import "./board.css";
import { Atom } from "jotai";
import Image from "next/image";
import { useState } from "react";

export default function Grid({
  piecesState,
  isPlayer1Playing,
  setIsPlayer1Playing,
}: Readonly<{
  piecesState?: Array<any>;
  isPlayer1Playing: any;
  setIsPlayer1Playing: any;
}>) {
  const [selectedPiece, setSelectedPiece] = useState(null);
  const nbFiles = 8;
  const flatPiecesState = piecesState ? piecesState.flat() : [];

  const handlePieceClick = (piece: any) => {
    setSelectedPiece(piece);
  };
  const possibleMoves =
    selectedPiece?.init?.getMovements(flatPiecesState.map((p) => p?.init)) ??
    [];

  const handleBoxClick = (
    isPossibleMove: any,
    selectedPiece: any,
    piece: any,
    vertical: number,
    horizontal: number
  ) => {
    if (isPossibleMove) {
      // Déplacez la pièce si la case est un mouvement possible
      selectedPiece.init.move({ vertical, horizontal });
      setSelectedPiece(null);
      setIsPlayer1Playing(!isPlayer1Playing);
    } else if (piece) {
      handlePieceClick(piece);
    }
  };

  return (
    <div className="grid">
      {[...Array(nbFiles)].map((_, vertical) => (
        <Row key={vertical} className="row">
          {[...Array(nbFiles)].map((_, horizontal) => {
            const isPossibleMove = possibleMoves.some(
              (move: any) =>
                move.vertical === vertical && move.horizontal === horizontal
            );

            const piece = flatPiecesState.find(
              (p) =>
                p.init?.position?.vertical === vertical &&
                p.init?.position?.horizontal === horizontal
            );
            return (
              <Box
                key={vertical * 10 + horizontal}
                className={
                  ((vertical + horizontal) % 2 ? "light" : "dark") +
                  " box" +
                  (isPossibleMove ? " possible-move" : "")
                }
                onClick={() =>
                  handleBoxClick(
                    isPossibleMove,
                    selectedPiece,
                    piece,
                    vertical,
                    horizontal
                  )
                }
              >
                {piece && (
                  <Image
                    src={`/imgs/${
                      Array.from(piece.init.color.toLowerCase())[0]
                    }${Array.from(piece.init.name.toLowerCase())[0]}.png`}
                    fill={true}
                    sizes="max-width: 100px, max-height: 100px"
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
