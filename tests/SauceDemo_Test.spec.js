const { test, expect} =  require ('@playwright/test');
const { assert } = require('console');
const {url} = require('inspector');
const { title}= require('process');
const {login_page_class} = require('../pages/login_page_sauce');
const {order_cls} = require('../pages/Catalog_Page_Sauce');
const {BasePage} = require ('../pages/Base_Class');
const {ProductPage} = require ('../pages/Product_Page');
const {CartPage} = require('../pages/Cart_Page');
const exp = require('constants');
const {CheckOutPage} = require('../pages/Checkout_Page');
const config  = require('../config/config');
const { generateEmail } = require('../utils/helpers');


test.describe('Sauce Demo - Smoke Suite;', () => {

test('@smoke Page Navigation', async function ({page}, testInfo) {

    const O  = new login_page_class(page);
    await testInfo.attach('step-1', { 
        body: 'Navigating to homepage' 
    });
    await O.navigation_url();
    await testInfo.attach('step-2', {
        body: 'Verifying URL'
    });
    await expect(page).toHaveURL("https://sauce-demo.myshopify.com/");
    console.log("Page navigation successful, Test Case Passed")
});

test ('@smoke Catalog Page Navigation', async function ({page}) {

    const O3 = new order_cls(page);
    await O3.navigate_main_page();
    await O3.catalog_navigation_page();
    await expect(O3.catalog_product_text).toHaveText('Products');
    console.log('Successfull Navigation on Catalog Page, Test Case Passed')

});

});

test.describe('Sauce Demo - Regression Suite',()=>{

test('@regression Login page navigation', async function ({page}) {

    const O1 = new login_page_class(page);
    await O1.navigation_url();
    await O1.navigate_login_page();
    await expect(page).toHaveURL("https://sauce-demo.myshopify.com/account/login");
    await expect(O1.customer_text).toHaveText('Customer Login');
    console.log('Login page success')  

});

test('@regression Login with invalid creds', async function ({page}) {
    const O2 = new login_page_class(page);
    await O2.navigation_url();
    await O2.navigate_login_page();
    await O2.enter_creds(config.credentials.email, config.credentials.password);
    await O2.click_login();
    // await expect(O2.validation_message).toHaveText('Incorrect email or password.');
    // await expect(O2.captcha).toBeVisible();
    console.log('Assetion Passed, unable to login with invalid creds');
    
});

test('@regression Place Order with invalid card number', async function({page}){

    test.slow();
    const catalog = new order_cls(page);
    const productpage = new ProductPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckOutPage(page);

    await catalog.navigate_main_page();
    await catalog.catalog_navigation_page();
    await expect(page).toHaveURL('https://sauce-demo.myshopify.com/collections/all');
    console.log('Navigated on Catalog Page');

    await catalog.click_product();
    await expect(productpage.add_to_cart_text).toHaveText('Add to Cart');
    console.log('Navigate to product page successful')

    await productpage.select_size();    
    await productpage.select_color();
    console.log('Size & Color selected')

    await productpage.add_to_cart();
    await productpage.cart_count.waitFor({state: 'visible', timeout: 12000});
    await expect(productpage.cart_count).toHaveText('(1)');
    console.log('1 Item added in cart successfully');

    await cart.goto_cart_page();
    await expect(cart.my_cart_text).toHaveText('My Cart');
    console.log('Navigated to cart page')

    await expect(cart.priceText()).toHaveText('£45.00');
    console.log('Item with price £45.00 is shown in cart page ')

    await checkout.goto_checkout();
    await expect(checkout.contact_text).toHaveText('Contact');
    console.log('Navigation to checkout page successfull');    


    const email = generateEmail('customer');

    await checkout.enter_order_details(email);
    await expect(checkout.invalid_card_text).toHaveText('Enter a valid card number')
    console.log('Invalid Card Number Validation Passed, Test Case Passed')


});

});
    