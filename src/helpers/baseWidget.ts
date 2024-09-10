import { Page, Locator } from '@playwright/test';

export class BaseWidget {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Waits for the specific text to be present in the locator
     * @param locator - The Playwright Locator where to check for the text
     * @param expectedText - The text that should be present
     * @param timeout - Maximum time to wait for the text (in ms), default is 30 seconds
     */

    async waitForText(locator: Locator, expectedText: string, timeout: number = 30000): Promise<void> {
        const startTime = Date.now();

        while (Date.now() - startTime < timeout) {
            const textContent = await locator.textContent();

            if (textContent && textContent.includes(expectedText)) {
                return;
            }

            // Short pause before re-checking
            await this.page.waitForTimeout(500); // Wait for 500ms before retrying
        }

        throw new Error(`Text "${expectedText}" was not found in the locator within ${timeout} ms.`);
    }

    async sleep(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }
}
