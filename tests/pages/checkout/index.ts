import { Page, expect, Locator } from '@playwright/test'
import { CheckoutModel } from '../../fixtures/checkoutModel' 

export class CheckoutPage {

    readonly page: Page
    readonly btnCheckout: Locator
    readonly inputFirstName: Locator
    readonly inputLastName: Locator
    readonly inputPostalCode: Locator
    readonly btnContinue: Locator
    readonly btnFinish: Locator

    constructor(page: Page) {
        this.page = page
        this.btnCheckout = page.locator('#checkout')
        this.inputFirstName = page.locator('#first-name')
        this.inputLastName = page.locator('#last-name')
        this.inputPostalCode = page.locator('#postal-code')
        this.btnContinue = page.locator('#continue')
        this.btnFinish = page.locator('#finish')
    }

    async go() {
        await this.page.goto('/cart.html')
    }

    async clickCheckout() {
        const target = this.page.getByTitle('Your Cart')
        await expect(target).toBeVisible
        await this.btnCheckout.click()
    }

    async fillInfo(user : CheckoutModel){
        const target = this.page.getByTitle('Checkout: Your Information')
        await expect(target).toBeVisible
        await this.inputFirstName.fill(user.firstName)
        await this.inputLastName.fill(user.lastName)
        await this.inputPostalCode.fill(user.zipCode)
        await this.btnContinue.click()
    }

    async checkoutOverview(){
        const overview = this.page.getByTitle('Checkout: Overview')
        await expect(overview).toBeVisible
        await this.btnFinish.click()
        const finish = this.page.getByTitle('Thank you for your order!')
        await expect(finish).toBeVisible
    }

}