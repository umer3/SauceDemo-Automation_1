const { assert } = require('console');
const { url } = require('inspector');
const { title } = require('process')

class login_page_class{

    constructor(page)
    {
        this.page=page;
        this.url_main_page = "https://sauce-demo.myshopify.com/";
        this.login_btn = page.getByRole('link', {name: 'Log In' })
        this.customer_text = page.locator('#customer > h1');
        this.email = page.locator('#customer_email');
        this.password = page.locator('#customer_password');
        this.click_login_btn = page.locator('#customer_login > div.action_bottom > input');
        this.validation_message = page.locator('#customer_login > div.errors');
        this.captcha = page.locator("body > div > div.interface-challenge > div.button-submit.button");

    }

    async navigation_url()
    {
        await this.page.goto(this.url_main_page);

    }

    async navigate_login_page()
    {

        await this.login_btn.click()
    
    }

    async enter_creds(email, password)
    {
        await this.email.fill(email);
        await this.password.fill(password);
    }

    async click_login()
    {
        await this.click_login_btn.click();
    }

}

module.exports = {login_page_class};