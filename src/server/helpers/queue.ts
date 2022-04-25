class Queue {
  private queue: any[];

  private isWorking: boolean;

  constructor() {
    this.queue = [];
    this.isWorking = false;
  }

  public enqueue(el: any): void {
    this.queue.unshift(el);
    this.run();
  }

  private dequeue(): any {
    return this.queue.pop();
  }

  private async run(): Promise<void> {
    if (this.isWorking || !this.queue.length) return;

    this.isWorking = true;
    const job = this.dequeue();

    if (!job) return;
    await job();

    this.isWorking = false;
    this.run();
  }
}

const queue = new Queue();
export default queue;
