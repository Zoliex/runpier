var fs = require("fs");
const log = require("../lib/logger");

module.exports = function (app) {
    var i = 0;
    fs.readdirSync(__dirname).forEach(function (file) {
        if (file == "routes.js") return;
        var name = file.substr(0, file.indexOf("."));
        log.info("Router", `loading ${name}.js`);
        require("./" + name)(app);
        i++;
    });
    log.info("Router", `loaded ${i} route(s)`);
};
