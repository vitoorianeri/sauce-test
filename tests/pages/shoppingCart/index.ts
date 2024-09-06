import { Page, expect, Locator } from '@playwright/test'

export class ShoppingCartPage {

    readonly page: Page
    readonly btnShoppingCartLink: Locator
    readonly btnRemoveCart: Locator

    constructor(page: Page) {
        this.page = page
        this.btnShoppingCartLink = page.locator('.shopping_cart_link')
        this.btnRemoveCart = page.locator('#remove-sauce-labs-backpack')
    }

    async go() {
        await this.page.goto('/')
    }

    async goingToCart(){
        await this.btnShoppingCartLink.click
        await this.page.getByTitle('Your Cart').isVisible
    }

    async removingFromCart(){
        await this.btnRemoveCart.click
    }


}