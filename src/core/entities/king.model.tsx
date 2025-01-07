import { ColorEnum } from "../enums/color.enum";
import PiecesHelper from "../helpers/pieces.helper";
import Position from "../interfaces/position";
import Piece from "./piece.model";

export default class King extends Piece {
    value: number;

    constructor(position: Position, color: ColorEnum) {
        super(position, color);
        this.value = 100;
    }

    getMovements(allPieces: Array<Piece>): Array<Position> {
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

            if (PiecesHelper.isValidPosition(newPosition, allPieces)) {
                movements.push(newPosition);
            }
        }

        return movements;
    }
}