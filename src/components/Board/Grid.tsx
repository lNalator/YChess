import PiecesHelper from "@/core/helpers/pieces.helper";
import Box from "./Box";
import Row from "./Row";
import "./board.css";
import { Atom, useStore } from "jotai";
import Image from "next/image";
import { useEffect, useState } from "react";
import Position from "@/core/interfaces/position";
import { ColorEnum } from "@/core/enums/color.enum";

export default function Grid({
  piecesState,
  isPlayer1Playing,
  setIsPlayer1Playing,
}: Readonly<{
  piecesState: Array<any>;
  isPlayer1Playing: any;
  setIsPlayer1Playing: any;
}>) {
  const [selectedPiece, setSelectedPiece] = useState(null);
  const nbFiles = 8;

  const handlePieceClick = (piece: any) => {
    setSelectedPiece(piece);
  };
  const possibleMoves =
    selectedPiece?.init?.getMovements(piecesState.map((p) => p?.init)) ?? [];

  const handleBoxClick = (
    isPossibleMove: any,
    selectedPiece: any,
    piece: any,
    vertical: number,
    horizontal: number
  ) => {
    if (isPossibleMove) {
      // Déplacez la pièce si la case est un mouvement possible
      const afterMovement = selectedPiece.init.move(
        { vertical, horizontal },
        piece?.init
      );
      // if (piece.init?.castle) {
      //   const castle: boolean = piece.init?.castle === "small";
      //   const rookVertical: number =
      //     piece.init.color === ColorEnum.WHITE ? 0 : 7;
      //   const rookPosition: Position = castle
      //     ? { vertical: rookVertical, horizontal: 7 }
      //     : { vertical: rookVertical, horizontal: 0 };
      //   const rook = PiecesHelper.getPieceByPosition(
      //     rookPosition,
      //     piecesState
      //   ) as any;
      //   const rookMove = { vertical, horizontal };
      //   rookMove.horizontal += castle ? 1 : -1;

      //   rook.init.move(rookMove);
      // }
      console.log(afterMovement);
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

            const piece = piecesState.find(
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
