// eslint-disable-next-line @typescript-eslint/no-var-requires
const chromeLauncher = require("chrome-launcher");

const { KEEP_CHROME_INSTANCE } = process.env;

class Chrome {
  public chrome: any;

  public async runChrome() {
    if (this.chrome) {
      if (KEEP_CHROME_INSTANCE === "true") {
        return this;
      }

      await this.chrome.kill();
    }

    this.chrome = await chromeLauncher.launch({
      chromeFlags: ["--headless", "--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
    });

    return this;
  }
}

const chromeInstance = new Chrome();

export default chromeInstance;
