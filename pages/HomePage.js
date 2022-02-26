const BasePage = require('./BasePage');
class HomePage extends BasePage{

    constructor(page){
        super(page)

        //locators

           this.title = '//span[@class="title"]'
           this.addToCardButton = '#add-to-cart-sauce-labs-bike-light'
           this.shoppingCardBadge = '//span[@class="shopping_cart_badge"]' 
           this.removeFromCardButton = '//button[@id="remove-sauce-labs-bike-light"]'
    }


    async ClickOnAddToCard(){
       await this.page.click(this.addToCardButton)

    }

    async ClickOnRemoveButton(button){
        await this.page.click(button)
    }

    async GetTextOfCard(){

         return this.page.innerText(this.shoppingCardBadge)
    }


}

module.exports = HomePage