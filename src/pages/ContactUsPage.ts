import { expect, Page } from '@playwright/test';
import { ContactUsLocators } from '../locators/contactUsPageLocators.ts';
import { BaseWidget } from '../helpers/baseWidget.ts';
import { ContactUsFormFilledPage } from './ContactUsFormFilledPage.ts';
import { Constants } from '../helpers/constants.ts';

export class ContactUsPage extends BaseWidget {

  constructor(page: Page) {
    super(page)
  }

  async assertContactUsPageIsDisplayed() {
    await expect(this.page).toHaveURL(ContactUsLocators.contactUsPageUrl);
    await this.page.waitForSelector(ContactUsLocators.contactFormHeader);
  }

  async fillContactUsForm() {
    await this.page.locator(ContactUsLocators.firstNameCss).fill(Constants.firstName);
    await this.page.locator(ContactUsLocators.emailCss).fill(Constants.email);
    await this.page.locator(ContactUsLocators.subjectCss).fill(Constants.subject);
    await this.page.locator(ContactUsLocators.messageCss).fill(Constants.text);
    
    await expect(this.page.locator(ContactUsLocators.submitFormButtonCss)).toBeVisible();
    await expect(this.page.locator(ContactUsLocators.submitFormButtonCss)).toBeEnabled();
    await this.sleep(2000);

    // Click issue due to incorrect button tag in html tree
    await this.page.getByText(ContactUsLocators.textButton).scrollIntoViewIfNeeded();
    await this.page.getByText(ContactUsLocators.textButton).click({force: true});

    this.page.on('dialog', async dialog => {
      expect (dialog.message()).toContain('Press OK to proceed!');
      await dialog.accept();
    });

    return new ContactUsFormFilledPage(this.page);

  }

}
