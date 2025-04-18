import { expect } from "@playwright/test";
import BasePage from "./BasePage";
import CartPage from "./CartPage";

export default class CartBadge extends BasePage {
  private CART_BADGE = "[data-test='shopping-cart-badge']";
  private CART_LINK = ".shopping_cart_link";

  async isCartUpdated(): Promise<boolean> {
    return await this.page.locator(this.CART_BADGE).isVisible();
  }

  async cartContainsItems(number: number) {
    const itemsCount = await this.page.locator(this.CART_BADGE).innerText();
    expect(Number(itemsCount)).toBe(number);
  }

  async openCart() {
    await this.click(this.CART_LINK);
    return new CartPage(this.page);
  }
}
