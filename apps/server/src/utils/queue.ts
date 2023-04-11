import { Readable } from "stream";

export class Queue<T, R> {
  constructor(private readonly data: T[], private readonly func: (props: T) => R) { }
  result: R[];
  isRunning = false;

  readable = new Readable();

  private async runner() {
    if (this.data.length < 1) return this.readable.emit("end", this.result);
    const data = this.data.shift();
    const result = await this.func(data)
    this.result.push(result);
    this.readable.emit("data", result);
    await this.runner();
  }

  async run() {
    if(this.isRunning) return false;
    this.isRunning = true;
    this.runner();
    return this.readable;
  }

  async stop() {
    this.isRunning = false;
  }

  async getResults() {
    return this.result;
  }
}