import{test} from "@playwright/test";
import {LoginPage} from "../pageObject/login.po.js";
const testData = require('../fixtures/loginFixtures.json');

test.beforeEach(async ({page}) => {
    await page.goto('/'); // '/'=base URL defined in playwright.config.js
})
//k ko test ho describe garna test.describe
test.describe('valid login test', () => {
    test('should login with valid credentials', async ({ page }) => {
        const login = new LoginPage(page);
        //await login.login("aayanneupane77@gmail.com", "123456789"); // using hard-coded credentials
        await login.login(testData.validUser.userName, testData.validUser.password);//using json file
        //await login.verifyValidLogin();
        
    });
});
test.describe('Invalid login tests',()=>{
    test('login using invalid username and valid password ',async({page})=>{
        const login = new LoginPage(page);
        await login.login('aayannn','123456789');
        await login.verifyInvalidLogin();
    });
      test('login using valid username and invalid password ',async({page})=>{
        const login = new LoginPage(page);
        await login.login('aayanneupane77@gmail.com','1234567890000');
        await login.verifyInvalidLogin();
    })
      test('login using invalid username and invalid password ',async({page})=>{
        const login = new LoginPage(page);
        await login.login('aayannn','12345670089');
        await login.verifyInvalidLogin();
    })
});
