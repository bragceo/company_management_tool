const logo = require('asciiart-logo');
const promptUser = require('./utils/ui');


function init() {
    console.log(logo({ name: "Employee Manager" }).render());
    promptUser();
}


init();