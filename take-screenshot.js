const puppeteer = require('puppeteer');

async function takeScreenshot(url, outputPath = 'screenshot.png', options = {}) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Set viewport size (default: 1920x1080)
  await page.setViewport({
    width: options.width || 1920,
    height: options.height || 1080
  });

  try {
    console.log(`Navigating to ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

    console.log(`Taking screenshot...`);
    await page.screenshot({
      path: outputPath,
      fullPage: options.fullPage || false
    });

    console.log(`Screenshot saved to ${outputPath}`);
  } catch (error) {
    console.error('Error taking screenshot:', error.message);
  } finally {
    await browser.close();
  }
}

// Get URL from command line arguments
const url = process.argv[2];
const outputPath = process.argv[3] || 'screenshot.png';

if (!url) {
  console.log('Usage: node take-screenshot.js <url> [output-path]');
  console.log('Example: node take-screenshot.js https://example.com screenshot.png');
  process.exit(1);
}

takeScreenshot(url, outputPath, { fullPage: true });
