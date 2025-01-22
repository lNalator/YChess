import PiecesHelper from "@/core/helpers/pieces.helper";
import Box from "./Box";
import Row from "./Row";
import "./board.css";
import { Atom, useAtom, useStore } from "jotai";
import Image from "next/image";
import { useEffect, useState } from "react";
import Position from "@/core/interfaces/position";
import { ColorEnum } from "@/core/enums/color.enum";
import { PrimitiveAtom } from "jotai/vanilla";
import Piece from "@/core/entities/piece.model";
import { gameStateAtom } from "@/core/data/gameState";
import Player from "@/core/entities/player.model";

type GameState = {
  pieces: Array<Piece>;
  players: Array<Player>;
};

export default function Grid({
  isPlayer1Playing,
  setIsPlayer1Playing,
}: Readonly<{
  isPlayer1Playing: any;
  setIsPlayer1Playing: any;
}>) {
  const [gameState, setGameState] = useAtom(gameStateAtom);
  const { pieces, players }: GameState = gameState;
  const [selectedPiece, setSelectedPiece] = useState(null as Piece | null);
  const nbFiles = 8;
  const possibleMoves = selectedPiece?.getMovements(pieces.map((p) => p)) ?? [];

  const updatePiece = (pieceId: string, newProperties: any) => {
    setGameState((prevState: any) => {
      const updatedPieces = prevState.pieces.map((piece: Piece) =>
        piece.id === pieceId ? { ...piece, ...newProperties } : piece
      );
      return { ...prevState, pieces: updatedPieces };
    });
  };

  const handleBoxClick = (
    isPossibleMove: boolean,
    selectedPiece: Piece | null,
    piece: any,
    vertical: number,
    horizontal: number
  ) => {
    if (selectedPiece && isPossibleMove) {
      // Déplacez la pièce si la case est un mouvement possible
      const afterMovement = selectedPiece.move({ vertical, horizontal }, piece);

      //TODO : need fix castle

      // if (piece.castle !== null && piece.castle !== undefined && piece.castle) {
      //   const castle: boolean = piece.castle === "small";
      //   const rookVertical: number = piece.color === ColorEnum.WHITE ? 0 : 7;
      //   const rookPosition: Position = castle
      //     ? { vertical: rookVertical, horizontal: 7 }
      //     : { vertical: rookVertical, horizontal: 0 };
      //   const rook = PiecesHelper.getPieceByPosition(
      //     rookPosition,
      //     pieces
      //   ) as any;
      //   const rookMove = { vertical, horizontal };
      //   rookMove.horizontal += castle ? 1 : -1;

      //   rook.init.move(rookMove);
      // }

      setSelectedPiece(null);
      setIsPlayer1Playing(!isPlayer1Playing);
    } else if (piece) {
      setSelectedPiece(piece);
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

            const piece = pieces.find(
              (p) =>
                p.position?.vertical === vertical &&
                p.position?.horizontal === horizontal
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
                    src={`/imgs/${Array.from(piece.color.toLowerCase())[0]}${
                      Array.from(piece.name.toLowerCase())[0]
                    }.png`}
                    fill={true}
                    sizes="max-width: 100px, max-height: 100px"
                    alt={`${piece.color} piece`}
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
