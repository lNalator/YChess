import { ColorEnum } from "../enums/color.enum";
import PiecesHelper from "../helpers/pieces.helper";
import Position from "../interfaces/position";
import Piece from "./piece.model";

export default class Bishop extends Piece {
    value: number;

    constructor(position: Position, color: ColorEnum, id: string) {
        super(position, color, id);
        this.value = 3;
    }

    getMovements(allPieces: Array<Piece>): Array<Position> {
        const movements: Array<Position> = [];
        let newPosition: Position = { ...this.position };
    
        const directions = [
            { dx: 1, dy: 1 },
            { dx: 1, dy: -1 },
            { dx: -1, dy: 1 },
            { dx: -1, dy: -1 }
        ];
    
        // Vérifier les mouvements diagonaux
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
                        
                        nextPosition.horizontal += direction.dx;
                        nextPosition.vertical += direction.dy;
    
                        if (PiecesHelper.isValidPosition(nextPosition, allPieces)) {
                            movements.push(nextPosition);
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