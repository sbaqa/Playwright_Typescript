import { expect, Page } from '@playwright/test';
import { HomeLocators } from '../locators/homePageLocators.ts';
import { GeneralLocators } from '../locators/generalLocators.ts';
import { ContactUsPage } from './ContactUsPage.ts';
import { SignUpLoginPage } from './SignUpLoginPage.ts';


export class HomePage {

  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToHomePage() {
    await this.page.goto(GeneralLocators.expectedHomePageUrl);
  }

  async acceptCookies() {
    const acceptCookiesButton = this.page.locator(HomeLocators.acceptCookiesButtonCss);
    await acceptCookiesButton.waitFor({ state: 'visible', timeout: 5000 });
    await expect(acceptCookiesButton).toBeEnabled();

    await acceptCookiesButton.click();
    await expect(acceptCookiesButton).toBeHidden()
  }

  async navigateToSignUpLoginPage() {
    let topnavSingUpLink = this.page.locator(HomeLocators.loginSignupLinkXpath);
    await expect(topnavSingUpLink).toBeVisible();
    await expect(topnavSingUpLink).toBeEnabled();
    await topnavSingUpLink.click();

    return new SignUpLoginPage(this.page)
  }

  async navigateToContactUsPage() {
    let contactUsButton = this.page.locator(HomeLocators.contactUsLink);
    await expect(contactUsButton).toBeVisible();
    await expect(contactUsButton).toBeEnabled();
    await contactUsButton.click();

    return new ContactUsPage(this.page);
  }
}
