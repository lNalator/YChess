import Box from "./Box";
import Row from "./Row";
import "./board.css";
import { useAtom } from "jotai";
import Image from "next/image";
import { useState } from "react";
import Piece from "@/core/entities/piece.model";
import { gameStateAtom, GameState } from "@/core/data/gameState";
import PlayerHelper from "@/core/helpers/player.helper";
import Position from "@/core/interfaces/position";

export default function Grid() {
  const [gameState, setGameState] = useAtom(gameStateAtom);
  const { players }: GameState = gameState;

  const [selectedPiece, setSelectedPiece] = useState(null as Piece | null);
  const nbFiles = 8;

  const possibleMoves = () => {
    let playingPlayer = PlayerHelper.getPlayingPlayer(players);
    let opponentPlayer = PlayerHelper.getOpponentPlayer(players);
    let possibleMoves: Array<Position> = [];
    if (selectedPiece && selectedPiece.color === playingPlayer.color) {
      possibleMoves = selectedPiece.getMovements(
        playingPlayer.pieces,
        opponentPlayer.pieces
      );
    }

    return possibleMoves;
  };

  const handleBoxClick = (
    isPossibleMove: boolean,
    selectedPiece: Piece | null,
    piece: any,
    vertical: number,
    horizontal: number
  ) => {
    if (
      selectedPiece &&
      selectedPiece.color === PlayerHelper.getPlayingPlayerColor(players) &&
      isPossibleMove
    ) {
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
      PlayerHelper.switchPlayerTurn(players);
      setGameState({ ...gameState });
    } else if (piece) {
      setSelectedPiece(piece);
    }
  };

  return (
    <div className="grid">
      {[...Array(nbFiles)].map((_, vertical) => (
        <Row key={vertical} className="row">
          {[...Array(nbFiles)].map((_, horizontal) => {
            const isPossibleMove = possibleMoves().some(
              (move: any) =>
                move.vertical === vertical && move.horizontal === horizontal
            );

            const piece = PlayerHelper.getAllPieces(players).find(
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
