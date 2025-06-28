const puppeteer = require('puppeteer');

exports.runPuppeteer = async (url, id) => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/usr/bin/chromium',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });
  await page.waitForSelector('video');
  const screenshotPath = `screenshots/${id}.png`;
  await page.screenshot({ path: screenshotPath });
  await browser.close();
  return screenshotPath;
};
