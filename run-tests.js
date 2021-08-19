const { codecept: Codecept } = require('codeceptjs');
const cfg = require('config');
const bsServerExit = require('./bs-config')
// define main config
const config = {
    tests: './tests/*_test.js',
    output: './output',
    helpers: {
      Puppeteer: {
        url: cfg.get('HOST_URL'),
        show: false,
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
  };

const opts = { steps: true };

// run CodeceptJS inside async function


  
const codecept = new Codecept(config, opts);
codecept.init(__dirname);
(async () => {
  try {
    await codecept.bootstrap();
    const test = codecept.loadTests('./tests/**_test.js');
    // run tests
    await codecept.run(test);
  } catch (err) {
    console.log(err);
    process.exitCode = 1;
  } finally {
    await codecept.teardown();
    await bsServerExit();
  }    
})
();
  
  
  