import { test, expect } from '@playwright/test'
import { ShoppingCartPage } from './pages/shoppingCart'
import { LoginPage } from './pages/login'
import { ProductPage } from './pages/product'
import data from './fixtures/users.json'
import { UserModel } from './fixtures/userModel'

let shoppingCart: ShoppingCartPage

test.beforeEach(async ({ page }) => {
    const user = data.standard_user as UserModel

    const loginPage = new LoginPage(page)
    await loginPage.go()
    await loginPage.login(user)

    const productPage = new ProductPage(page)
    await productPage.addingProducts()
    await productPage.showingShoppingCartBadge()

    shoppingCart = new ShoppingCartPage(page)
})

test('removing item from cart', async ({ page }) => {
    await shoppingCart.goingToCart()
    await shoppingCart.removingFromCart()
})


