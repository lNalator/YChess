import Position from "../interfaces/position";
import Piece from "./piece.model";

export default class Knight extends Piece {
    value: number;

    constructor(position: Position) {
        super(position);
        this.value = 3;
    }

    getMovements(): Array<Position> {
        const movements: Array<Position> = [];
        let newPosition: Position;

        const directions = [
            { dx: 2, dy: 1 },
            { dx: 2, dy: -1 },
            { dx: -2, dy: 1 },
            { dx: -2, dy: -1 },
            { dx: 1, dy: 2 },
            { dx: -1, dy: 2 },
            { dx: 1, dy: -2 },
            { dx: -1, dy: -2 }
        ];

        for (const direction of directions) {
            newPosition = { ...this.position };
            
            newPosition.horizontal += direction.dx;
            newPosition.vertical += direction.dy;

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