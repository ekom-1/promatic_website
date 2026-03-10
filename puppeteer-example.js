const { setupBrowser, closeBrowser } = require('./puppeteer-setup');

async function example() {
  const { browser, page } = await setupBrowser();

  try {
    // Navigate to a website
    await page.goto('https://example.com', { waitUntil: 'networkidle2' });

    // Take a screenshot
    await page.screenshot({ path: 'screenshot.png' });

    // Get page title
    const title = await page.title();
    console.log('Page title:', title);

    // Example: Click a button
    // await page.click('button#submit');

    // Example: Fill a form
    // await page.type('input[name="email"]', 'test@example.com');

    // Example: Wait for an element
    // await page.waitForSelector('.result');

    // Example: Evaluate JavaScript on the page
    const content = await page.evaluate(() => {
      return document.body.innerText;
    });
    console.log('Page content:', content);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await closeBrowser(browser);
  }
}

example();
