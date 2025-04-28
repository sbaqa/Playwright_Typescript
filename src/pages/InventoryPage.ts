import BasePage from "./BasePage";
import CartBadge from "./CartBadge";

export default class InventoryPage extends BasePage {
    private ADD_BACKPACK_BUTTON = "[data-test='add-to-cart-sauce-labs-backpack']";
    private ADD_BIKE_LIGHT_BUTTON = "[data-test='add-to-cart-sauce-labs-bike-light']";

    async addBackpackToCart(): Promise<CartBadge> {
        await this.click(this.ADD_BACKPACK_BUTTON);
        return new CartBadge(this.page);
    }

    async addBikeLightToCart(): Promise<CartBadge> {
        await this.click(this.ADD_BIKE_LIGHT_BUTTON);
        return new CartBadge(this.page);
    }
}
