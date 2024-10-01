import { test, expect } from '@playwright/test';
// import { BrowserContext } from '@playwright/test';

test.describe('navbar_tests', () => {
  test('has title', async ({ page }) => {
    await page.goto('https://playwright.dev/');
  
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
  });
  
  test('check get started link', async ({ page }) => {
    await page.goto('https://playwright.dev/');
  
    // Click the get started link and expect the URL to contain intro.
    await page.getByRole('link', { name: 'Get started' }).click();
    await expect(page).toHaveURL(/.*intro/);
  
    // Same for different link but similar functionality
    await page.getByRole('link', { name: 'Docs' }).click();
    await expect(page).toHaveURL(/.*intro/);
  });
  
  test('searchbox navigation', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await page.locator('[aria-label="Search"]').click()
    await expect(page.locator('input[id="docsearch-input"]')).toBeVisible()  //combined locator
  })

  test('github star icon click opened PW repo link in new tab', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await page.locator('span a :text-is("Star")').click() //chained locator (tag-tag:(text of the element inside of last tag))
    
    const newGithubTabOpened = await page.waitForEvent("popup");
    await newGithubTabOpened.waitForLoadState();
    await expect(newGithubTabOpened).toHaveURL("https://github.com/microsoft/playwright");
    await expect(newGithubTabOpened).toHaveTitle(
      "GitHub - microsoft/playwright: Playwright is a framework for Web Testing and Automation. It allows testing Chromium, Firefox and WebKit with a single API."
    );
    })
  })
