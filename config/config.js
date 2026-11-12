module.exports = {
    // BaseURL for the Sauce Demo application
    baseURL: 'https://sauce-demo.myshopify.com',

    // Environment-specific configurations
    env: {
        staging: {
            URL:'https://sauce-demo.myshopify.com',

    }

},
    // Timeouts
    timeouts: {
        globalTimeout: 90000,
        elementTimeout: 10000
},
    // User credentials
    credentials :{
        email: 'test@test.com',
        password: 'password'

    }

};