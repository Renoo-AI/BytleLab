import { test, expect } from '@playwright/test';

test.describe('ByteLearn Stability & UI Verification', () => {

  test('PC: Splash screen redirects to QR Login and blocks /login', async ({ page }) => {
    // 1. Check Splash
    await page.goto('http://localhost:3000/splash');
    // Using a more robust locator for ByteLearn text
    await expect(page.locator('text=ByteLearn').first()).toBeVisible();

    // 2. Wait for redirect to /qr-login (1.5s timeout + buffer)
    await page.waitForURL('**/qr-login', { timeout: 5000 });
    await expect(page.locator('text=Scan to Login')).toBeVisible();

    // 3. Try to access /login manually
    await page.goto('http://localhost:3000/login');
    await page.waitForURL('**/qr-login');
    expect(page.url()).toContain('/qr-login');
  });

  test('Mobile: Splash screen redirects to Login', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('http://localhost:3000/splash');
    await page.waitForURL('**/login', { timeout: 5000 });
    await expect(page.locator('text=Welcome Back')).toBeVisible();
  });

  test('PC: Global Background and Layout', async ({ page }) => {
    await page.goto('http://localhost:3000/qr-login');

    // Check background style on body
    const bodyBg = await page.evaluate(() => getComputedStyle(document.body).background);
    expect(bodyBg).toContain('linear-gradient');
  });
});
