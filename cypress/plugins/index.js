const dotenvPlugin = require('cypress-dotenv');

module.exports = (on, config) => {
    on('file:preprocessor', dotenvPlugin({ configPath: '.env.test' }));
};
