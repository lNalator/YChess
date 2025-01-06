import Position from "../interfaces/position";

export default abstract class Piece {
    protected position: Position;

    constructor(position: Position) {
        this.position = position;
    }

    abstract move(): void;
    abstract eat(): void;
    abstract getAccessibleBoxes(): Array<Position>;
}