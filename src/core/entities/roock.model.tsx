import { ColorEnum } from "../enums/color.enum";
import PiecesHelper from "../helpers/pieces.helper";
import Position from "../interfaces/position";
import Piece from "./piece.model";

export default class Roock extends Piece {
    value: number;
    isFirstMove: boolean;

    constructor(position: Position, color: ColorEnum, id: string) {
        super(position, color, id);
        this.value = 5;
        this.isFirstMove = true;
    }

    public move(position: Position, piece?: Piece): void {
        this.isFirstMove = false;
        if(piece){
            this.eat(piece);
        }
        this.position = position;
    }
    
    getMovements(allPieces: Array<Piece>): Array<Position> {
        const movements: Array<Position> = [];
        let newPosition: Position = { ...this.position };
    
        const directions = [
            { dx: 0, dy: 1 },
            { dx: 0, dy: -1 },
            { dx: 1, dy: 0 },
            { dx: -1, dy: 0 }
        ];
    
        // Vérifier les mouvements horizontaux et verticaux
        for (const direction of directions) {
            newPosition = { ...this.position };
            
            do {
                newPosition.horizontal += direction.dx;
                newPosition.vertical += direction.dy;
    
                // Vérifier si la position est valide et peut être capturée
                if (PiecesHelper.isValidPosition(newPosition, allPieces)) {
                    movements.push(newPosition);
                    
                    // Si c'est une capture ennemie, vérifier s'il y a d'autres pièces ennemies à distance
                    if (PiecesHelper.isEnemyPresent(newPosition, allPieces, this.color)) {
                        let nextPosition = { ...newPosition };
                        let nextNextPosition = { ...nextPosition };
    
                        nextPosition.vertical += direction.dy;
                        nextNextPosition.horizontal += direction.dx * 2;
                        nextNextPosition.vertical += direction.dy * 2;
    
                        if (
                            PiecesHelper.isValidPosition(nextPosition, allPieces) &&
                            PiecesHelper.isValidPosition(nextNextPosition, allPieces)
                        ) {
                            movements.push(nextNextPosition);
                        }
                    }
                } else {
                    break;
                }
            } while (true);
        }
    
        return movements;
    }
}