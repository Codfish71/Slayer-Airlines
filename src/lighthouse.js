const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

(async () => {
  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  const options = {logLevel: 'info', output: 'html', onlyCategories: ['performance'], port: chrome.port};
  const runnerResult = await lighthouse('http://localhost:4200', options);

  console.log('Report is done for', runnerResult.lhr.finalUrl);

  const performanceScore = runnerResult.lhr.categories.performance.score * 100;
  console.log('Performance score was', performanceScore);

  await chrome.kill();

  if (performanceScore < 80) {
    throw("Performance score to low for production release.");
  }
})();