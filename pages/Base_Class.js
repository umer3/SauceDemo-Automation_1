const config = require('../config/config');

class BasePage{

    constructor (page){
        this.page= page;
        this.url_main_page = config.baseURL;

    }

    async navigate_main_page(){
       await this.page.goto(this.url_main_page);
    }

}
module.exports = {BasePage};