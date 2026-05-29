const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  const pages = [
    { url: 'http://localhost:3000', file: '/tmp/home.png' },
    { url: 'http://localhost:3000/about', file: '/tmp/about.png' },
    { url: 'http://localhost:3000/services', file: '/tmp/services.png' },
    { url: 'http://localhost:3000/contact', file: '/tmp/contact.png' },
  ];

  for (const p of pages) {
    await page.goto(p.url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: p.file, fullPage: false });
    console.log('Done:', p.file);
  }
  await browser.close();
})();
