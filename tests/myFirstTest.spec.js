// @ts-check
import { test, expect } from '@playwright/test';


test('login check', async ({ page }) => {
  await page.goto('https://facebook.com/');

  await page.locator('//input[@id="email"]').fill('9844631633');
  await page.locator('//input[@id="pass"]').fill('dhostainoobgaming2');

   await page.locator('//button[@name="login"]').click();
   await page.waitForTimeout(6000);

  // You can check for invalid login message
  const loginError = page.locator('text=The email or mobile number you entered isn’t connected');
  if (await loginError.count() > 0) {
    console.log('Login failed as expected with test credentials');
  } else {
    console.log('Login might have succeeded or failed silently');
  }
});

