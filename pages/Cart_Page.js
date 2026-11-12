const { expect } = require("@playwright/test");

class CartPage{
    constructor(page){

        this.page = page;
        this.check_out_button = page.getByRole('link', {name: 'Check Out'} );
        this.my_cart_text = page.locator('#page-content > h1');
        this.random_click= page.locator('#tagline > h3');
        this.price_text= page.locator('#cart > form > div:nth-child(1) > div.row > div.two.columns.price.desktop');
        this.count_text = page.locator('#cart-target-desktop > span');
        this.check_out_button_in_page = page.locator('#checkout');

    }
    async goto_cart_page(){
       
        await this.random_click.click()
        await this.page.waitForURL('https://sauce-demo.myshopify.com/products/flower-print-jeans'); 
        await this.check_out_button.click()

    }

    priceText() {
        return this.price_text;
    }
    
}

module.exports = {CartPage};