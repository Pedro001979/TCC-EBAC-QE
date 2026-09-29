const path = require('node:path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '.env') });

const configuredAppPath = process.env.MOBILE_APP_PATH;
const appPath = configuredAppPath
  ? (path.isAbsolute(configuredAppPath) ? configuredAppPath : path.resolve(__dirname, configuredAppPath))
  : path.resolve(__dirname, 'apps/ebacshop.apk');

const androidCapabilities = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': process.env.ANDROID_DEVICE_NAME || 'Android Emulator',
  'appium:appPackage': 'br.com.lojaebac',
  'appium:appActivity': 'br.com.lojaebac.MainActivity',
  'appium:appWaitActivity': 'br.com.lojaebac.MainActivity',
  'appium:appWaitDuration': 30000,
  'appium:newCommandTimeout': 180,
  'appium:autoGrantPermissions': true,
  'appium:noReset': true,
  'appium:shouldTerminateApp': false,
};

if (process.env.MOBILE_PREINSTALLED_APP !== 'true') {
  androidCapabilities['appium:app'] = appPath;
}

exports.config = {
  runner: 'local',
  specs: ['./test/specs/**/*.spec.js'],
  maxInstances: 1,
  hostname: process.env.APPIUM_HOST || '127.0.0.1',
  port: Number(process.env.APPIUM_PORT || 4723),
  path: '/',
  framework: 'mocha',
  reporters: [
    'spec',
    ['allure', {
      outputDir: './allure-results',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: false,
    }],
  ],
  mochaOpts: {
    timeout: 180000,
  },
  waitforTimeout: 15000,
  capabilities: [androidCapabilities],
  afterTest: async function (_test, _context, { error }) {
    if (error) {
      await browser.takeScreenshot();
    }
  },
};
