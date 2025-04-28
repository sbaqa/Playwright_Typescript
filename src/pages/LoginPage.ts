// import { expect, Page } from '@playwright/test';
// import { loginLocators } from '../locators/loginPageLocators.ts';
// import { BaseWidget } from '../helpers/baseWidget.ts';
// import { Constants } from '../helpers/constants.ts';

// export class LoginPage extends BaseWidget {

//   // page: Page;
//   // private widget: BaseWidget;

//   constructor(page: Page) {
//     super(page)
//   }

//   async assertLoginPageIsDisplayed() {
//     // await this.sleep(3000);
//     await this.page.waitForLoadState('domcontentloaded');
//     expect(this.page.locator(loginLocators.loginFormCss)).toBeVisible({ timeout: 5000 })
//     expect(loginLocators.loginFormHeader).toContain(Constants.signInHeader);
//     expect(this.page).toHaveURL(loginLocators.loginPageUrl, { timeout: 5000 });
//   }

//   async fillSignInForm() {
//     // TODO => fill sign in form

//     // await this.page.locator(loginLocators.firstNameCss).fill(Constants.firstName);
//     // await this.page.locator(loginLocators.loginEmail).fill(Constants.email, { timeout: 5000 });
//     await this.page.getByRole('textbox', {name: 'Email'}).fill(Constants.email, { timeout: 5000 });
//     // await this.page.locator(loginLocators.subjectCss).fill(Constants.subject);
//     await this.page.locator(loginLocators.loginPassword).fill(Constants.password, { timeout: 5000 });
//     // await this.sleep(2000);

//     let signInButton = this.page.locator(loginLocators.signInButton);
//     expect(signInButton).toBeVisible();
//     expect(signInButton).toBeEnabled();
//     await signInButton.click();

//     let errorMessage = this.page.locator(loginLocators.errorMessageLocator);
//     expect(errorMessage).toContainText(Constants.credentialsErrorMessage);

//     // // Click issue due to incorrect button tag in html tree
//     // await this.page.getByText(ContactUsLocators.textButton).scrollIntoViewIfNeeded();
//     // await this.page.getByText(ContactUsLocators.textButton).click({force: true});

//   //   this.page.on('dialog', async dialog => {
//   //     expect (dialog.message()).toContain('Press OK to proceed!');
//   //     await dialog.accept();

//   }

// }

import BasePage from "./BasePage";
import InventoryPage from "./InventoryPage";

export default class LoginPage extends BasePage {
  private USERNAME_INPUT = "#user-name";
  private PASSWORD_INPUT = "#password";
  private LOGIN_BUTTON = "#login-button";

  async loginBySpecifiedUser(username: string, password: string): Promise<InventoryPage> {
    await this.typeText(this.USERNAME_INPUT, username);
    await this.typeText(this.PASSWORD_INPUT, password);
    await this.click(this.LOGIN_BUTTON);
    return new InventoryPage(this.page);
  }
}
