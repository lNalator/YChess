import Position from "../interfaces/position";
import Piece from "./piece.model";

export default class Knight extends Piece {
    constructor(position: Position) {
        super(position);
    }

    getMovements(): Array<Position> {
        const movements: Array<Position> = [];
        let newPosition: Position;

        const knightMoves = [
            { dx: 2, dy: 1 },
            { dx: 2, dy: -1 },
            { dx: -2, dy: 1 },
            { dx: -2, dy: -1 },
            { dx: 1, dy: 2 },
            { dx: -1, dy: 2 },
            { dx: 1, dy: -2 },
            { dx: -1, dy: -2 }
        ];

        for (const move of knightMoves) {
            newPosition = { ...this.position };
            
            newPosition.horizontal += move.dx;
            newPosition.vertical += move.dy;

            if (
                newPosition !== this.position &&
                newPosition.vertical >= 0 &&
                newPosition.vertical < 8 &&
                newPosition.horizontal >= 0 &&
                newPosition.horizontal < 8
            ) {
                movements.push(newPosition);
            }
        }

        return movements;
    }
}