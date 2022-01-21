var fs = require("fs");
const log = require("../lib/logger");

module.exports = function (app) {
    var i = 0;
    var menubar = [];
    fs.readdirSync(__dirname).forEach(function (file) {
        if (file == "routes.js") return;
        var name = file.substr(0, file.indexOf("."));
        menubar.push(require("./" + name).infos);
    });
    fs.readdirSync(__dirname).forEach(function (file) {
        if (file == "routes.js") return;
        var name = file.substr(0, file.indexOf("."));
        var file_require = require("./" + name);
        file_require.page(app, menubar);
        log.info("Router", `Chargement ${name}.js (${file_require.infos.name})`);
        i++;
    });
    log.info("Router", `${i} route(s) chargée(s)`);
};
