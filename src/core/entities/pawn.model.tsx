import Position from "../interfaces/position";
import Piece from "./piece.model";

export default class Pawn extends Piece {

    constructor(position: Position) {
        super(position);
    }

    move(): void {
        this.position.vertical += 1;
    }

    eat(): void {
        
    }

    getAccessibleBoxes(): Array<Position> {
        let boxes: Array<Position> = [];
        if(this.position){

        }
        return boxes;
    }
}