import { test, expect } from '@playwright/test'
import { CheckoutPage } from './pages/checkout'
import data from '../tests/fixtures/checkoutUserInfo.json'
import { CheckoutModel } from './fixtures/checkoutModel'
import { LoginPage } from './pages/login'
import { ProductPage } from './pages/product'
import { ShoppingCartPage } from './pages/shoppingCart'
import userData from './fixtures/users.json'
import { UserModel } from './fixtures/userModel'

let checkoutpage: CheckoutPage

test.beforeEach(async ({ page }) => {
    const user = userData.standard_user as UserModel

    const loginPage = new LoginPage(page)
    await loginPage.go()
    await loginPage.login(user)

    const productPage = new ProductPage(page)
    await productPage.addingProducts()
    await productPage.showingShoppingCartBadge()

    const shoppingCartPage = new ShoppingCartPage(page)
    await shoppingCartPage.goingToCart() 

    checkoutpage = new CheckoutPage(page)
})

test('validate checkout', async ({ page }) => {
    const user = data.userOne as CheckoutModel
    await checkoutpage.go()
    await checkoutpage.clickCheckout()
    await checkoutpage.fillInfo(user)
    await checkoutpage.checkoutOverview()
})



