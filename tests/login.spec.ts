import { test, expect } from '@playwright/test'
import { LoginPage } from './pages/login'
import data from '../tests/fixtures/users.json'
import { UserModel } from './fixtures/userModel'

let loginPage: LoginPage

test.beforeEach(({ page }) => {
    loginPage = new LoginPage(page)
})

test('validate users', async ({ page }) => {
    const user = data.standard_user as UserModel
    await loginPage.go()
    await loginPage.login(user)
    await loginPage.shouldShowProducts()
})

test('login with all users', async ({ page }) => {
    const keys = Object.keys(data)
    let user;

    for (var k in keys){
        user = data[keys[k]] as UserModel
        await loginPage.go()
        await loginPage.login(user)
        if (user.username != 'locked_out_user'){
            await loginPage.shouldShowProducts()
            await loginPage.logout()

        }
        
    }
    
})