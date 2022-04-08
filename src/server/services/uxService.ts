const { UX_API_KEY } = process.env;
import axios from "axios";

export const collectUx = async (url, device: string) => {
  const uxURL = new URL("https://chromeuxreport.googleapis.com/v1/records:queryRecord");
  uxURL.searchParams.set("key", UX_API_KEY);
  uxURL.searchParams.set("url", url);
  uxURL.searchParams.set("formFactor", device);

  const result = await axios.post(uxURL.href);

  const metrics = result.data.record.metrics;
  return metrics;
};
