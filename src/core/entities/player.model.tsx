export default class Player {
  name: string;
  color: string;
  score: number;

  constructor(name: string, color: string, score: number) {
    this.name = name;
    this.color = color;
    this.score = score;
  }

  public addScore(score: number): void {
    this.score += score;
  }

  public removeScore(score: number): void {
    this.score -= score;
  }

  public resetScore(): void {
    this.score = 0;
  }

  public setColor(color: string): void {
    this.color = color;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getScore(): number {
    return this.score;
  }

  public getName(): string {
    return this.name;
  }

  public getColor(): string {
    return this.color;
  }
}
