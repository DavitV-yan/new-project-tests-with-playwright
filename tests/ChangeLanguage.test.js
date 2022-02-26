// https://jestjs.io/docs/expect

const { chromium, webkit, firefox } = require('playwright');
const HomePage = require('../pages/HomePage');
const LoginPage = require('../pages/LoginPage');

describe('sauce Lab Demo', () => {
    jest.setTimeout(30000);
    let browser = null;
    let context = null;
    let page = null;
    let homePage  = null;
    let loginPage  = null;

    beforeAll( async ()=>{
        // we launch browser and navigate to the loginpage
        browser = await chromium.launch({ headless: true });
        context = await browser.newContext();
        page = await context.newPage();
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login('standard_user','secret_sauce','https://www.saucedemo.com/inventory.html');
    });

    afterAll( async ()=>{
        // closing browser
        await context.close();
        await browser.close();
    });

    it('Should be able to login', async() => {
        
        expect(await page.title()).not.toBeNull();
     })
    
     it('should be able to add items to card', async() => {
        await homePage.ClickOnAddToCard();
        
        expect(await homePage.GetTextOfCard()).toBe("1");
     })
    
    

    });
