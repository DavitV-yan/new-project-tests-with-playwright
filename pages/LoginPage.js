const BasePage = require('./BasePage');
class LoginPage extends BasePage{

    constructor(page){
        super(page);

        //locators

        this.usernameTextField = '#user-name'
        this.passwordTextField = '#password'
        this.loginButton = '#login-button'
    }

    async navigate(){
       await super.navigate('https://www.saucedemo.com/')
    }

    async login(username,password,url){

        await this.page.fill(this.usernameTextField,username)
        await this.page.fill(this.passwordTextField,password)
        await this.page.click(this.loginButton)
        await this.page.waitForURL(url);
    }
    


}
module.exports = LoginPage;