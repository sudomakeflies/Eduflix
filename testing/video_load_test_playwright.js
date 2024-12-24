const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const numberOfUsers = 20; // Number of concurrent users
  const testDuration = 60 * 1000; // Test duration in milliseconds (1 minute)
  const startTime = Date.now();

  async function simulateUser() {
    try {
      await page.goto('http://localhost/testing/safari.html'); // Replace with your app's URL
      const videoElement = await page.$('video');
      if (videoElement) {
        await page.waitForTimeout(Math.random() * 5000); // Simulate user watching video
      }
    } catch (error) {
      console.error('Error during user simulation:', error);
    }
  }

  const userPromises = [];
  for (let i = 0; i < numberOfUsers; i++) {
    userPromises.push(simulateUser());
  }

  while (Date.now() - startTime < testDuration) {
    await Promise.all(userPromises);
  }

  await browser.close();
  console.log('Load test completed.');
})();
