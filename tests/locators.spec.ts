import { test, expect } from '@playwright/test';

test('Test case 1: Positive LogIn test using getbyrole & getbytext', async ({ page }) => {
  await page.goto('https://practicetestautomation.com/practice-test-login/');
 // await expect(page).toHaveTitle(/Playwright Practice App/);
 
 
 //await page.locator('#username').fill('myUser');
 await page.getByRole('textbox', { name: 'username' }).fill('student');
 await page.getByRole('textbox', { name: 'password' }).fill('Password123');
 
 await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible;
 await expect(page.getByRole('button', { name: 'Submit' })).toBeEnabled;
 
 await page.getByRole('button', { name: 'Submit'}).click();
 //await expect(page).toHaveTitle(/practicetestautomation.com/logged-in-successfully/);
 await expect(page).toHaveURL(/practicetestautomation\.com\/logged-in-successfully\//);
await expect(page.getByText(/Congratulations|successfully logged in/)).toBeVisible();
await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
  
});




test('Test case 2: Negative username test using getbylabel', async ({ page }) => {
  await page.goto('https://practicetestautomation.com/practice-test-login/');
 // await expect(page).toHaveTitle(/Playwright Practice App/);
 
 
 //await page.locator('#username').fill('myUser');
 await page.getByLabel('Username').fill('incorrectUser');
 await page.getByLabel('Password').fill('Password123');
 
 await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible;
 await expect(page.getByRole('button', { name: 'Submit' })).toBeEnabled;
 
 await page.getByRole('button', { name: 'Submit'}).click();
 // 1. Verify error message is displayed
await expect(page.locator('#error')).toBeVisible();

// 2. Verify error message text is "Your username is invalid!"
await expect(page.locator('#error')).toHaveText('Your username is invalid!');
  
});




test('Test case 3: Negative Password test using xpath', async ({ page }) => {
  await page.goto('https://practicetestautomation.com/practice-test-login/');
 // await expect(page).toHaveTitle(/Playwright Practice App/);
 
 
 //await page.locator('#username').fill('myUser');
 await page.locator('//input[@id="username"]').fill('student');
 await page.locator('//input[@id="password"]').fill('incorrectPassword');
 
 await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible;
 await expect(page.getByRole('button', { name: 'Submit' })).toBeEnabled;
 
 await page.getByRole('button', { name: 'Submit'}).click();
 // 1. Verify error message is displayed
await expect(page.locator('#error')).toBeVisible();

// 2. Verify error message text is "Your password is invalid!"
await expect(page.locator('#error')).toHaveText('Your password is invalid!');
  
});


test('Test case 4 : Verify Shop now is visible', async ({ page }) => {
  await page.goto('https://playwright-automation-practice-app.my.canva.site/');
  
  // Access content inside iframe
  const frame = page.frameLocator('iframe').first();
  const shopNowBtn = frame.getByRole('button', { name: 'Shop Now' });
  //const shopNowBtn = frame.getByTestId('shop-now-btn');
  await expect(shopNowBtn).toBeVisible({ timeout: 15000 });
  await expect(shopNowBtn).toBeEnabled();
  //await shopNowBtn.scrollIntoViewIfNeeded();
  //await page.waitForTimeout(500);
  await shopNowBtn.click({ force: true });
});
