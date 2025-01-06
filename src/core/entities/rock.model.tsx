import Position from "../interfaces/position";
import Piece from "./piece.model";

export default class Rock extends Piece {
    constructor(position: Position) {
        super(position);
    }
    
    getMovements(): Array<Position> {
        const movements: Array<Position> = [];
        let newPosition: Position = this.position;
        newPosition.vertical = 0;
        while(newPosition.vertical < 8) {
            newPosition.vertical += 1;
            if(newPosition !== this.position){
                movements.push(newPosition);
            }
        }
        newPosition = this.position;
        newPosition.horizontal = 0;
        while(newPosition.horizontal < 8) {
            newPosition.horizontal += 1;
            if(newPosition !== this.position){
                movements.push(newPosition);
            }
        }
        return movements;
    }
}