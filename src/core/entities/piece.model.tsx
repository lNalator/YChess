import Position from "../interfaces/position";

export default abstract class Piece {
    public position: Position;
    public inLife: boolean;
    abstract value: number;

    constructor(position: Position) {
        this.position = position;
        this.inLife = true;
    }

    public move(position: Position, piece?: Piece): void {
        if(piece){
            this.eat(piece);
        }
        this.position = position;
    }

    public eat(piece: Piece): void {
        piece.inLife = false;
    }

    abstract getMovements(): Array<Position>;
}