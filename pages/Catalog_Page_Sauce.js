const {BasePage} = require('./Base_Class');

class order_cls extends BasePage{
    constructor(page)
    {
        super(page);
        this.page = page;
        this.catalog_link = page.getByRole ('link', {name: 'Catalog'} );
        this.catalog_product_text = page.locator('#page-content > h1');
        this.product_to_order = page.locator('#product-1 > h3');
        this.product_to_order = page.locator('#product-1 > h3');
        
    }

    async catalog_navigation_page()
    {
        await this.catalog_link.click();
    }

     async click_product()
    {
        await this.product_to_order.click();
    }
}

module.exports = {order_cls};