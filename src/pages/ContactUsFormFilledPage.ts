import { expect, Page } from "@playwright/test";
import { ContactUsLocators } from "../locators/contactUsPageLocators";
import { Constants } from "../helpers/constants";

export class ContactUsFormFilledPage {

    page: Page;
  
    constructor(page: Page) {
        this.page = page;
    }

  async assertContactUsFormSuccessStepIsDisplayed() {
    await expect(this.page.locator(ContactUsLocators.statusOfSubmittedFormCss)).toContainText(Constants.formSubmittedSuccessfully);
  }

}
