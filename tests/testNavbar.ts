import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage.ts';
import { GeneralLocators } from '../src/locators/generalLocators.ts';
// import { ContactUsPage } from '../src/pages/ContactUsPage.ts';

let homePage: HomePage; // Declare the homePage variable outside the test block

test.beforeEach(async ({ page }) => {
  await page.goto(GeneralLocators.expectedHomePageUrl)
  homePage = new HomePage(page)  // Initialize the HomePage object
  await homePage.acceptCookies()
});

test.describe('TopNavigation tests', () => {
  
  test("Open 'Signup / Login' page", async () => {
    let SignUpLoginPage = await homePage.navigateToSignUpLoginPage();
    SignUpLoginPage.assertSignUpLoginPageIsDisplayed();
  });

  test.fail("Fill 'Contact us' form: test expected to fail", async () => {

    // Open 'Contact Us' Page being on Home Page and verify it was opened
    let ContactUsPage = await homePage.navigateToContactUsPage();
    await ContactUsPage.assertContactUsPageIsDisplayed();

    // Fill 'Contact us' form and verify it was filled successfully
    let contactUsFormFilled = await ContactUsPage.fillContactUsForm();
    await contactUsFormFilled.assertContactUsFormSuccessStepIsDisplayed();
  });
})





//   await page.locator('.navbar-nav').getByRole('link', { name: 'Роздуми на тему' }).click();
//   await page.locator('#post-6537').getByRole('link', { name: 'Continue reading...' }).click();
//   await page.getByRole('link', { name: 'Головна' }).click();
//   await page.getByRole('button').nth(1).click();
//   await page.locator('#header-bottom').getByRole('textbox').click();
//   await page.locator('#header-bottom').getByRole('textbox').press('CapsLock');
//   await page.locator('#header-bottom').getByRole('textbox').fill('РНБО');
//   await page.locator('#header-bottom').getByRole('textbox').press('Enter');
//   await page.getByRole('link', { name: 'Гендерне кріпосне право від РНБО ?' }).click();
//   await page.getByText('Демократія, яку ми заслужили і вона тепер поза законом').click({clickCount: 3});
