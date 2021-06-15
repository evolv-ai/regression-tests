require('dotenv').config();
exports.config = {
  tests: './tests/*_test.js',
  output: './output',
  helpers: {
    Puppeteer: {
      url: process.env.HOST_URL,
      show: process.env.SHOW_BROWSER,
      windowSize: '1200x900'
    },
    "ChaiWrapper" : {
      "require": "codeceptjs-chai"
    }
  },
  include: {
    I: './steps_file.js'
  },
  bootstrap: null,
  mocha: {},
  name: 'regression-tests',
  plugins: {
    pauseOnFail: {},
    retryFailedStep: {
      enabled: true
    },
    tryTo: {
      enabled: true
    },
    screenshotOnFail: {
      enabled: true
    }
  }
}