
const {chromium, webkit, firefox, devices} = require('playwright');
const { test, expect } = require('@playwright/test');

const iPhone13ProMax = devices["iPhone 13 Pro Max"];

const HomePage = require('../pages/HomePage');
const LoginPage = require('../pages/LoginPage');

test.describe('sauce Lab Demo', () => {
    let browser = null;
    let context = null;
    let page = null;
    let homePage = null;
    let loginPage = null;
    let browserType = null;

    test.beforeEach(async () => {
        for (browserType of [chromium, webkit]) {
            browser = await browserType.launch({headless: true});
            context = await browser.newContext({
                ...iPhone13ProMax,
                locale: "de-DE",
            });
            page = await context.newPage();

            homePage = new HomePage(page);
            loginPage = new LoginPage(page);
            await loginPage.navigate();
            await loginPage.login('standard_user', 'secret_sauce', 'https://www.saucedemo.com/inventory.html');
            await page.screenshot({
                path: `screenshot-${browserType.name()}.png`,
            });
        }
    });

    test.afterEach(async () => {
        await context.close();
        await browser.close();
    });

    test('Should be able to login', async () => {

        expect(await page.title()).not.toBeNull();
    })

    test('should be able to add items to card', async () => {
        await homePage.ClickOnAddToCard();

        expect(await homePage.GetTextOfCard()).toBe("1");
    })


});
