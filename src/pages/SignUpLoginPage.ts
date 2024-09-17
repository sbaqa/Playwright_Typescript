import { expect, Page } from '@playwright/test';
import { LoginSignupLocators } from '../locators/loginSignUpPageLocators.ts';
import { BaseWidget } from '../helpers/baseWidget.ts';
import { Constants } from '../helpers/constants.ts';

export class SignUpLoginPage extends BaseWidget {

  constructor(page: Page) {
    super(page)
  }

  async assertSignUpLoginPageIsDisplayed() {
    await this.sleep(3000);
    await this.page.waitForLoadState('load');
    await expect(this.page).toHaveURL(LoginSignupLocators.signUpLoginPageUrl, { timeout: 3000 });
    await this.page.waitForSelector(LoginSignupLocators.signUpLoginFormCss);
    await expect(this.page.locator(LoginSignupLocators.signUpLoginFormHeaderCss)).toContainText(Constants.loginToAccountHeader);
  }

}
