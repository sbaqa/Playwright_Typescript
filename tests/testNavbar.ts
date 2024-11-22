import { test } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage.ts';
import { GeneralLocators } from '../src/locators/generalLocators.ts';
// import { ContactUsPage } from '../src/pages/ContactUsPage.ts';

let homePage: HomePage; // Declare the homePage variable outside the test block

test.describe('TopNavigation tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(GeneralLocators.expectedHomePageUrl)
    homePage = new HomePage(page)  // Initialize the HomePage object
    // await homePage.acceptCookies()
  });
  
  test("Open 'Login' page", async () => {
    let loginPage = await homePage.navigateToLoginPage();
    loginPage.assertLoginPageIsDisplayed();
  });

  test("Fill Login page form", async () => {
    let openedLoginPage = await homePage.navigateToLoginPage();
    openedLoginPage.fillSignInForm();
  });
// })
//   test.fail("Fill 'Contact us' form: test expected to fail", async () => {

//     // Open 'Contact Us' Page being on Home Page and verify it was opened
//     let ContactUsPage = await homePage.navigateToContactUsPage();
//     await ContactUsPage.assertContactUsPageIsDisplayed();

//     // Fill 'Contact us' form and verify it was filled successfully
//     let contactUsFormFilled = await ContactUsPage.fillContactUsForm();
//     await contactUsFormFilled.assertContactUsFormSuccessStepIsDisplayed();
//   });
// })


test.afterEach(async ({ page, context }, testInfo) => {

  if (testInfo.status !== 'passed') {
    await page.screenshot({ path: `screenshots/${testInfo.title}.png` });
  }

  await context.close(); // Close all pages in the context
  });

})
