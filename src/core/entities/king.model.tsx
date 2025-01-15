import { ColorEnum } from "../enums/color.enum";
import PiecesHelper from "../helpers/pieces.helper";
import Position from "../interfaces/position";
import Piece from "./piece.model";

export default class King extends Piece {
    value: number;
    isChecked: boolean;
    isFirstMove: boolean;

    constructor(position: Position, color: ColorEnum, id: string) {
        super(position, color, "King", id);
        this.value = 100;
        this.isChecked = false;
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

        if(PiecesHelper.canSmallCastle(this, allPieces)) {
            newPosition = { ...this.position };
            newPosition.horizontal += 2;
            movements.push(newPosition);
        }

        if(PiecesHelper.canLargeCastle(this, allPieces)) {
            newPosition = { ...this.position };
            newPosition.horizontal -= 2;
            movements.push(newPosition);
        }

        return movements;
    }
}