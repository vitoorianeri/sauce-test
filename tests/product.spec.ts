import { test, expect } from '@playwright/test'
import { ProductPage } from './pages/product'
import { LoginPage } from './pages/login'
import data from '../tests/fixtures/users.json'
import { UserModel } from '../tests/fixtures/userModel'

let productPage: ProductPage

test.beforeEach(async ({ page }) => {
    const user = data.standard_user as UserModel
    
    const loginPage = new LoginPage(page)
    await loginPage.go()
    await loginPage.login(user)

    productPage = new ProductPage(page)
})

test.describe('product', () => {

    test('Validated when add product in the shopping cart', async ({ page }) => {
        await productPage.addingProducts()
        await productPage.showingShoppingCartBadge()
    })

    test('removing item added', async ({ page }) => {
        await productPage.addingProducts()
        await productPage.showingShoppingCartBadge()
        await productPage.removingItem()
        await productPage.notShowingShoppingCartBadge()
    })

})
