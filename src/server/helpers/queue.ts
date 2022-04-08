class Queue {
  private queue: any[];  
  private isWorking: boolean;

  constructor() {
    this.queue = [];
    this.isWorking = false;
  }

  public enqueue(el:any): void {
    this.queue.unshift(el);
    this.run();
  }

  private dequeue(): any {
    return this.queue.pop();
  }

  private async run(): Promise<any> {
    // console.log("Queue length:",this.queue.length);
    if (this.isWorking || !this.queue.length) return;

    this.isWorking = true;
    const job = this.dequeue();

    if(!job) return;
    const result = await job()

    // console.log(result);
    this.isWorking = false;
    return this.run();
  }
}

const queue = new Queue();
export { queue };