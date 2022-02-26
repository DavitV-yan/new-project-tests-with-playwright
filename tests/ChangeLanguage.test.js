// https://jestjs.io/docs/expect

const { webkit, chromium, firefox, devices } = require("playwright");
const iPhone13ProMax = devices["iPhone 13 Pro Max"];
const HomePage = require('../pages/HomePage');
const LoginPage = require('../pages/LoginPage');

describe('sauce Lab Demo', () => {
    jest.setTimeout(3000);
    let browser = null;
    let context = null;
    let page = null;
    let homePage  = null;
    let loginPage  = null;
    let browserType = null;

    beforeAll( async ()=>{
        // we launch browser and navigate to the loginpage
        for( browserType of [chromium, webkit]){
            browser = await browserType.launch({headless: false});
            context = await browser.newContext({ ...iPhone13ProMax});
            }
        page = await context.newPage();
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login('standard_user','secret_sauce','https://www.saucedemo.com/inventory.html');
    });

    afterAll( async ()=>{
        jest.setTimeout(5000);
        // closing browser
        await page.screenshot({
            path: `screenshot-${browserType.name()}.png`,
          });
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