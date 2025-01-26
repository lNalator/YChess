import { reason } from "../data/gameState";

export class GameHelper {
  static getGameOverReason(reason: reason): string {
    if (reason.draw && reason.agreement) {
      return "Draw by agreement";
    } else if (reason.draw) {
      return "Draw";
    } else if (reason.resign) {
      return "Resignation";
    } else if (reason.timeout) {
      return "Timeout";
    } else if (reason.checkmate) {
      return "Checkmate";
    } else if (reason.stalemate) {
      return "Stalemate";
    } else if (reason.insufficientMaterial) {
      return "Insufficient material";
    } else if (reason.repetition) {
      return "Repetition";
    } else {
      return "Unknown reason";
    }
  }
}
