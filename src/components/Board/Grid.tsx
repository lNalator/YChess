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
import { CastleEnum } from "@/core/enums/castle.enum";
import PiecesHelper from "@/core/helpers/pieces.helper";
import { ColorEnum } from "@/core/enums/color.enum";
import Rook from "@/core/entities/rook.model";

export default function Grid() {
  const [gameState, setGameState] = useAtom(gameStateAtom);
  const { players }: GameState = gameState;
  const playingPlayer = PlayerHelper.getPlayingPlayer(players);
  const opponentPlayer = PlayerHelper.getOpponentPlayer(players);

  const [selectedPiece, setSelectedPiece] = useState(null as Piece | null);
  const nbFiles = 8;

  const possibleMoves = () => {
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
      // Déplacer la pièce si la case est un mouvement possible
      const afterMovement = selectedPiece.move({ vertical, horizontal }, piece);
      if (afterMovement.hasEaten && afterMovement.ate) {
        PlayerHelper.eatPiece(playingPlayer, opponentPlayer, afterMovement.ate);
      }
      
      // Déplacer aussi la tour si il y a roque
      if(afterMovement?.castle === CastleEnum.SMALL){
        const rookPosition = selectedPiece.color === ColorEnum.WHITE ? { vertical: 0, horizontal: 7 } : { vertical: 7, horizontal: 7 };
        const rookNextPosition = selectedPiece.color === ColorEnum.WHITE ? { vertical: 0, horizontal: 5 } : { vertical: 7, horizontal: 5 };
        const rook = PiecesHelper.getFriendlyPiecesByPosition(rookPosition, playingPlayer.pieces) as Rook;
        rook.move(rookNextPosition);
      }
      else if(afterMovement?.castle === CastleEnum.LARGE) {
        const rookPosition = selectedPiece.color === ColorEnum.WHITE ? { vertical: 0, horizontal: 0 } : { vertical: 7, horizontal: 0 };
        const rookNextPosition = selectedPiece.color === ColorEnum.WHITE ? { vertical: 0, horizontal: 3 } : { vertical: 7, horizontal: 3 };
        const rook = PiecesHelper.getFriendlyPiecesByPosition(rookPosition, playingPlayer.pieces) as Rook;
        rook.move(rookNextPosition);
      }

      if(afterMovement?.enPassant) {
        const ennemyPawnPosition: Position = selectedPiece.color === ColorEnum.WHITE 
        ? { vertical: selectedPiece.position.vertical - 1, horizontal: selectedPiece.position.horizontal } 
        : { vertical: selectedPiece.position.vertical + 1, horizontal: selectedPiece.position.horizontal };
        const ennemyPawn = PiecesHelper.getEnemyPiecesByPosition(ennemyPawnPosition, opponentPlayer.pieces) as Piece;
        selectedPiece.eat(ennemyPawn);
        PlayerHelper.eatPiece(playingPlayer, opponentPlayer, ennemyPawn);
      }
      
      setSelectedPiece(null);
      PlayerHelper.switchPlayerTurn(players);
      setGameState({ ...gameState });
    } else if (piece) {
      setSelectedPiece(piece);
    } else {
      setSelectedPiece(null);
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
                  ((vertical + horizontal) % 2 ? "light" : "dark") + " box"
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
                <div
                  className={
                    (isPossibleMove ? "possible-move " : "") +
                    (piece ? "piece-exist" : "")
                  }
                ></div>
                {piece && (
                  <Image
                    src={`/imgs/${Array.from(piece.color.toLowerCase())[0]}${
                      Array.from(piece.name.toLowerCase())[0]
                    }.png`}
                    fill={true}
                    sizes="max-width: 100px, max-height: 100px"
                    alt={piece.color + " " + piece.name}
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
