import { Page, expect, Locator } from '@playwright/test'

export class ProductPage {

    readonly page: Page
    readonly btnAddProduct: Locator
    readonly btnRemoveProduct: Locator
    readonly cartBadge: Locator

    constructor(page: Page) {
        this.page = page
        this.btnAddProduct = page.locator('#add-to-cart-sauce-labs-backpack')
        this.btnRemoveProduct = page.locator('#remove-sauce-labs-backpack')
        this.cartBadge = page.locator('.shopping_cart_badge')
    }

    async go() {
        await this.page.goto('/inventory.html')
    }

    async addingProducts() {
        await this.btnAddProduct.click()
    }

    async showingShoppingCartBadge() {
        await expect(this.cartBadge).toBeVisible
    }

    async notShowingShoppingCartBadge() {
        await expect(this.cartBadge).toBeDisabled
    }

    async removingItem() {
        await expect(this.btnRemoveProduct).toBeVisible
        await this.btnRemoveProduct.click()
    }

}