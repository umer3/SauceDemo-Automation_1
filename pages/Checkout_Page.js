const { expect } = require('@playwright/test');

class CheckOutPage {
    constructor(page){
        
        this.page=page;
        this.check_out_button = page.locator('#checkout');
        this.contact_text = page.locator('#contact');
        this.email = page.locator('#email');
        this.country = page.locator('select[name="countryCode"]');
        this.first_name = page.getByPlaceholder('First name (optional)');
        this.last_name = page.getByPlaceholder('Last name');
        this.company = page.getByPlaceholder('Company (optional)');
        this.address = page.getByPlaceholder('Address');
        this.appartment = page.getByLabel('Apartment, suite, etc. (optional)')
        this.city = page.getByPlaceholder('City')
        this.state = page.getByRole('combobox', { name: 'State', exact: true })
        this.zipcode = page.getByPlaceholder('ZIP code')
        this.phone = page.getByPlaceholder('Phone (optional)');
        this.invalid_card_text = page.locator('#error-for-number')

        const cardNumberFrame = this.page.frameLocator('iframe[title="Card number"]');
        const expiryFrame = this.page.frameLocator('iframe[title="Expiration date (MM / YY)"]');
        const cvcFrame = this.page.frameLocator('iframe[title="Security code"]');

        this.card_number = cardNumberFrame.getByPlaceholder('Card number'); 
        this.expiration_date = expiryFrame.getByPlaceholder('Expiration date (MM / YY)');
        this.security_code = cvcFrame.getByPlaceholder('Security code');
        this.paynow_button = page.locator('#checkout-pay-button');

    }

    async goto_checkout()
    {
        await this.check_out_button.waitFor({state: 'visible', timeout: 9000});
        await this.check_out_button.click();
        
    }

    async enter_order_details(CustomerEmail)
    {
        await this.contact_text.waitFor({state: 'visible', timeout: 9000});
        // Checkout can replace the initial country during hydration. Retry the
        // selection until the US address fields are actually rendered.
        await expect(async () => {
            await this.country.selectOption({ value: 'US' });
            await expect(this.country).toHaveValue('US', { timeout: 2000 });
            await expect(this.state).toBeVisible({ timeout: 2000 });
        }).toPass({ timeout: 20000 });
        await this.email.fill(CustomerEmail);
        await this.first_name.fill('Test First Name');
        await this.last_name.fill('Test Last Name');
        await this.company.fill('Test Company');
        await this.address.fill('Wrigley Field');
        await this.appartment.fill('1060');
        await this.city.fill('Chicago');
        await this.state.selectOption('IL');
        await this.zipcode.waitFor({ state: 'visible', timeout: 5000 });
        await this.zipcode.fill('60613');
        await this.phone.fill('(234) 567-8905');
        await this.page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });
        await this.card_number.fill('4111111111111112');
        await this.expiration_date.fill('03 / 30');
        await this.security_code.fill('111');
        await this.paynow_button.click();

        await this.page.screenshot({
            path: 'screenshots/fullPage.png',
            fullPage: true
        
    });
        

    }
}

module.exports = {CheckOutPage};