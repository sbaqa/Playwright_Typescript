import { Page } from "@playwright/test";

export default class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async click(selector: string): Promise<void> {
    await this.page.locator(selector).click();
  }

  async typeText(selector: string, text: string): Promise<void> {
    await this.page.locator(selector).fill(text);
  }

  async getElementText(selector: string): Promise<string> {
    return await this.page.locator(selector).textContent() || "";
  }
}
