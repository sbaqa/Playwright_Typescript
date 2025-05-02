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
