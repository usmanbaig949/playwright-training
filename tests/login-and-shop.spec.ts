import { test } from '@playwright/test';
import loginData from '../fixtures/loginData.json';
import { LoginPage } from '../pages/LoginPage';
import { PracticeAppPage } from '../pages/PracticeAppPage';

test('Test case 1: Positive LogIn test using page object model', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(loginData.validUser.username, loginData.validUser.password);
  await loginPage.expectSubmitButtonVisibleAndEnabled();
  await loginPage.submit();
  await loginPage.expectSuccessfulLogin();
});

test('Test case 2: Negative username test using page object model', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(loginData.invalidUsername.username, loginData.invalidUsername.password);
  await loginPage.expectSubmitButtonVisibleAndEnabled();
  await loginPage.submit();
  await loginPage.expectErrorText('Your username is invalid!');
});

test('Test case 3: Negative password test using page object model', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(loginData.invalidPassword.username, loginData.invalidPassword.password);
  await loginPage.expectSubmitButtonVisibleAndEnabled();
  await loginPage.submit();
  await loginPage.expectErrorText('Your password is invalid!');
});

test('Test case 04: Verify Shop now is visible using page object model', async ({ page }) => {
  const practiceAppPage = new PracticeAppPage(page);

  await practiceAppPage.goto();
  await practiceAppPage.expectShopNowVisible();
  await practiceAppPage.clickShopNow();
});
