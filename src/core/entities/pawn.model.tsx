import Position from "../interfaces/position";
import Piece from "./piece.model";

export default class Pawn extends Piece {

    constructor(position: Position) {
        super(position);
    }

    getMovements(canEatLeft?: boolean, canEatRight?: boolean): Array<Position> {
        const movements: Array<Position> = [];
        let newPosition: Position = this.position;

        newPosition.vertical += 1;
        movements.push(newPosition);
        if(canEatRight) {
            newPosition.horizontal = this.position.horizontal + 1;
            movements.push(newPosition);
        }
        if(canEatLeft) {
            newPosition.horizontal = this.position.horizontal - 1;
            movements.push(newPosition);
        }

        return movements;
    }
}