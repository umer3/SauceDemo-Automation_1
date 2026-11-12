class ProductPage{
    constructor(page){

        this.page=page;
        this.size_dropdown = page.locator('#product-select-option-0');
        this.add_to_cart_text = page.locator('#add');
        this.color_dropdown = page.locator('#product-select-option-1');
        this.add_to_cart_button = page.locator('#add');
        this.cart_count = page.locator('#cart-target-desktop');
        this.random_click = page.locator('#tagline > h3');

    }

    async select_size()
    {
        await this.size_dropdown.selectOption({value: 'L'});
    }

    async select_color()
    {
        await this.color_dropdown.selectOption({value: 'Red'});
    }

    async add_to_cart()
    {
        await this.add_to_cart_button.click();
        await this.random_click.click();

    }
}

module.exports = {ProductPage};