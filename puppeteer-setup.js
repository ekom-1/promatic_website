const puppeteer = require('puppeteer');

async function setupBrowser() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  return { browser, page };
}

async function closeBrowser(browser) {
  await browser.close();
}

module.exports = { setupBrowser, closeBrowser };
