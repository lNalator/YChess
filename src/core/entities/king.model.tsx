import { ColorEnum } from "../enums/color.enum";
import Position from "../interfaces/position";
import Piece from "./piece.model";

export default class King extends Piece {
    value: number;

    constructor(position: Position, color: ColorEnum) {
        super(position, color);
        this.value = 100;
    }

    getMovements(): Array<Position> {
        const movements: Array<Position> = [];
        let newPosition: Position = this.position;

        const directions = [
            { dx: -1, dy: -1 },
            { dx: -1, dy: 0 },
            { dx: -1, dy: 1 },
            { dx: 0, dy: -1 },
            { dx: 0, dy: 1 },
            { dx: 1, dy: -1 },
            { dx: 1, dy: 0 },
            { dx: 1, dy: 1 }
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