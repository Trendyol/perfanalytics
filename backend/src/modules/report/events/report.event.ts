export class ReportEvent {
  constructor(
    public readonly page: string,
    public readonly owner: string,
    public readonly domain: string,
    public readonly device: string,
    public readonly url: string,
  ) {}

  toString() {
    return JSON.stringify({
      page: this.page,
      owner: this.owner,
      domain: this.domain,
      device: this.device,
      url: this.url,
    });
  }
}
