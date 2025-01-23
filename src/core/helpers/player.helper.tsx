import Piece from "../entities/piece.model";
import Player from "../entities/player.model";

export default class PlayerHelper {
  static getOpponentColor(color: string): string {
    return color === "white" ? "black" : "white";
  }

  static getAllPieces(players: Array<Player>): Array<Piece> {
    return players.reduce(
      (acc: Array<Piece>, player: Player) => [...acc, ...player.pieces],
      []
    );
  }

  static getPlayingPlayer(players: Array<Player>): Player {
    return players.find((player) => player.isPlaying) as Player;
  }

  static getOpponentPlayer(players: Array<Player>): Player {
    return players.find((player) => !player.isPlaying) as Player;
  }

  static getPlayerByColor(players: Array<Player>, color: string): Player {
    return players.find((player) => player.color === color) as Player;
  }

  static getPlayingPlayerColor(players: Array<Player>): string {
    return this.getPlayingPlayer(players).color;
  }

  static getOpponentPieces(
    players: Array<Player>,
    color: string
  ): Array<Piece> {
    console.log(this.getPlayerByColor(players, this.getOpponentColor(color)));
    return this.getPlayerByColor(players, this.getOpponentColor(color)).pieces;
  }

  static switchPlayerTurn(players: Array<Player>): void {
    players.forEach((player) => {
      player.isPlaying = !player.isPlaying;
    });
  }

  static setPlayerTime(players: Array<Player>, time: number): void {
    players.forEach((player) => {
      player.time = time;
    });
  }
}
