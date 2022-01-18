var fs = require("fs");
const logger = require("../lib/log");

module.exports = function (app) {
    var i = 0;
    fs.readdirSync(__dirname).forEach(function (file) {
        if (file == "routes.js") return;
        var name = file.substr(0, file.indexOf("."));
        logger.log("Router", `loading ${name}.js`);
        require("./" + name)(app);
        i++;
    });
    logger.log("Router", `loaded ${i} route(s)`);
};
