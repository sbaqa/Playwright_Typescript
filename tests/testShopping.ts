import { chromium, expect } from "@playwright/test";
import LoginPage from "../src/pages/LoginPage";
import { test } from "../src/fixtures/pageFixture";
import { Constants } from "../src/helpers/constants";
import { getUserCredentials } from "../src/helpers/usersHelper";

test("Login as basic user add 2 products to cart", async ({webPage}) => {
    const login = new LoginPage(webPage);
    const creds = await getUserCredentials("basicUser");

    // Sign in and add item to the cart
    const inventoryPage = await login.loginBySpecifiedUser(creds.username, creds.password);
    const cartBadge = await inventoryPage.addBackpackToCart();
    await inventoryPage.addBikeLightToCart();

    // Check items is in the cart to be 2
    expect(cartBadge.isCartUpdated()).toBeTruthy();
    expect(cartBadge.cartContainsItems(Constants.expectedCartItems));

    // Open cart and verify item count
    const cartPage = await cartBadge.openCart();
    const cartItems = await cartPage.getCartItemsCount();
    expect(cartItems).toBe(Constants.expectedCartItems);

    // Verify 2 item names in cart
    let allCartItemNames = await cartPage.getAllCartItemNames();
    expect(allCartItemNames).toStrictEqual(Constants.expectedCartNames);

    // Verify 2 item prices in cart
    let allCartItemPrices = await cartPage.getAllCartItemPrices();
    expect(allCartItemPrices).toStrictEqual(Constants.expectedCartPrices);
    
    // Log items names and prices
    console.log("Item names in cart: ", allCartItemNames);
    console.log("Item prices in cart: ", allCartItemPrices);

});

test("Just Login and add product to cart, no POM in this test", async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
  
    await page.goto("https://www.saucedemo.com/");
    await page.fill('[data-test="username"]', "standard_user");
    await page.fill('[data-test="password"]', "secret_sauce");
    await page.click('[data-test="login-button"]');
  
    // adding items to the cart
    await page.click("[data-test='add-to-cart-sauce-labs-backpack']");
    await page.click("[data-test='add-to-cart-sauce-labs-bike-light']");

    // checking that the cart badge is updated with 2 items
    const cartBadge = await page.locator(".shopping_cart_badge");
    expect(await cartBadge.textContent()).toBe("2");

    // open the cart as such
    await page.click(".shopping_cart_link");

    // checking that opened cart contains 2 items as well
    const cartItems = await page.locator(".cart_item").count();
    expect(cartItems).toBe(2);

    // checking that the cart contains the expected added items
    let itemNames = await page.locator('.cart_list .cart_item').locator('[data-test="inventory-item-name"]').allTextContents();
    expect(itemNames).toStrictEqual(["Sauce Labs Backpack", "Sauce Labs Bike Light",]);
    console.log("Item in cart named as: ", itemNames);

    let itemPrices = await page.locator('.cart_list .cart_item').locator('[data-test="inventory-item-price"]').allTextContents();
    expect(itemPrices).toStrictEqual(["$29.99", "$9.99",]);
    console.log("Item prices in cart: ", itemPrices);
  
    await context.close();
    await browser.close();
  });

test('adding cart and verify popup, no POM in this test', async () => {
    // open the browser and navigate to website
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://practicesoftwaretesting.com');

    // open the chosen item
    await page.click("//h5[text()=' Combination Pliers ']");
    await page.waitForTimeout(2000);
    
    // verify it is opened
    const currentUrl = page.url();
    console.log('Combination Pliers URL is:', currentUrl);
    expect(currentUrl).toStrictEqual('https://practicesoftwaretesting.com/product/01JQPNS2P5ZFA3C9H4GAFH0ZHY');
    
    // add item to cart
    await page.click("#btn-add-to-cart");
    
    // verify that the popup is opened
    const popupText = await page.locator("[aria-label='Product added to shopping cart.']").innerText();
    expect(popupText).toStrictEqual("Product added to shopping cart.")
    console.log("Added the item into cart popup message is: ", popupText);
});
