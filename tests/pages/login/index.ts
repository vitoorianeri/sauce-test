import { Page, expect, Locator } from '@playwright/test'
import { UserModel } from '../../fixtures/userModel' 

export class LoginPage {

    readonly page: Page
    readonly inputUsername: Locator
    readonly inputPassword: Locator
    readonly btnLogin: Locator

    constructor(page: Page) {
        this.page = page
        this.inputUsername = page.getByPlaceholder('Username')
        this.inputPassword = page.getByPlaceholder('Password')
        this.btnLogin = page.locator('input[id*=login-button]')
    }

    async go() {
        await this.page.goto('/')
    }

    async login(user: UserModel) {
        await this.inputUsername.fill(user.username)
        await this.inputPassword.fill(user.password)
        await this.btnLogin.click()
    }

    async shouldShowProducts(){
        const target = this.page.getByTitle('Products')
        await expect(target).toBeVisible
    }

    async logout(){
        await this.page.locator('#react-burger-menu-btn').click()
        await this.page.locator('#logout_sidebar_link').click()
        const target =  this.page.getByTitle('Swag Labs')
        await expect(target).toBeVisible

    }
}