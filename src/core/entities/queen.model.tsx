import Position from "../interfaces/position";
import Piece from "./piece.model";

export default class Queen extends Piece {
    value: number;

    constructor(position: Position) {
        super(position);
        this.value = 9;
    }

    getMovements(): Array<Position> {
        const movements: Array<Position> = [];
        let newPosition: Position;

        const directions = [
            { dx: 1, dy: 0 },
            { dx: -1, dy: 0 },
            { dx: 0, dy: 1 },
            { dx: 0, dy: -1 },
            { dx: 1, dy: 1 },
            { dx: 1, dy: -1 },
            { dx: -1, dy: 1 },
            { dx: -1, dy: -1 }
        ];

        for (const direction of directions) {
            newPosition = { ...this.position };
            
            do {
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
                } else {
                    break;
                }
            } while (true);
        }

        return movements;
    }
}