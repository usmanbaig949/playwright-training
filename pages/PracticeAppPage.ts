import { expect, type FrameLocator, type Locator, type Page } from '@playwright/test';

export class PracticeAppPage {
  readonly page: Page;
  readonly frame: FrameLocator;
  readonly shopNowBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.frame = page.frameLocator('iframe').first();
    this.shopNowBtn = this.frame.getByRole('button', { name: 'Shop Now' });
  }

  async goto() {
    await this.page.goto('https://playwright-automation-practice-app.my.canva.site/');
  }

  async expectShopNowVisible() {
    await expect(this.shopNowBtn).toBeVisible({ timeout: 15000 });
    await expect(this.shopNowBtn).toBeEnabled();
  }

  async clickShopNow() {
    await this.shopNowBtn.click({ force: true });
  }
}
