// eslint-disable-next-line @typescript-eslint/no-var-requires
const chromeLauncher = require("chrome-launcher");

class Chrome {
  public chrome: any;

  public async runChrome() {
    if (this.chrome) {
      return this;
    }

    this.chrome = await chromeLauncher.launch({
      chromeFlags: ["--headless", "--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
    });

    return this;
  }
}

const chromeInstance = new Chrome();

export default chromeInstance;
