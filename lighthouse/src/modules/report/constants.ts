import * as defaultConstants from './defaultConstants';
import { Device } from './enums';

export const usefulAudits = [
  'first-contentful-paint',
  'speed-index',
  'largest-contentful-paint',
  'first-meaningful-paint',
  'total-blocking-time',
  'cumulative-layout-shift',
  'interactive',
  'performance',
];

export const defaultChromeFlags = [
  '--no-sandbox',
  '--disable-gpu',
  '--disable-dev-shm-usage',
];

export const defaultOptions = {
  output: 'html',
  onlyCategories: ['performance'],
};

export const desktopConfig = {
  extends: 'lighthouse:default',
  settings: {
    maxWaitForFcp: 60 * 1000,
    maxWaitForLoad: 60 * 1000,
    formFactor: 'desktop',
    throttling: defaultConstants.throttling.desktopDense4G,
    screenEmulation: defaultConstants.screenEmulationMetrics.desktop,
    emulatedUserAgent: defaultConstants.userAgents.desktop,
  },
};

export const mobileConfig = {
  extends: 'lighthouse:default',
  settings: {
    maxWaitForFcp: 60 * 1000,
    maxWaitForLoad: 60 * 1000,
    formFactor: 'mobile',
    screenEmulation: defaultConstants.screenEmulationMetrics.mobile,
    emulatedUserAgent: defaultConstants.userAgents.mobile,
    skipAudits: ['uses-http2'],
  },
};

export const deviceConfig = {
  [Device.DESKTOP]: desktopConfig,
  [Device.MOBILE]: mobileConfig,
};
