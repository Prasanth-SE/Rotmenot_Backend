//Export all models here so anywhere we can use one db object like below to access
//const db = require("./models");

module.exports = {
    User: require("./user"),
    Ingredient: require("./ingredient"),
    Recipe: require("./recipe")
};
