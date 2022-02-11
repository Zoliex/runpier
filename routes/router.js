const fs = require("fs");
const path = require("path");
const log = require("../lib/logger");

module.exports = function (app) {
    var i = 0;
    var menubar = [];
    fs.readdirSync(path.resolve(__dirname)).forEach(function (file) {
        if (file == "router.js") return;
        var name = file.substr(0, file.indexOf("."));
        menubar.push(require("./" + name).infos);
    });
    fs.readdirSync(path.resolve("./plugins/")).forEach(function (folder) {
        var plugin = require("../plugins/" + folder + "/routes.js");
        if (plugin.infos.has_page) {
            menubar.push(plugin.infos);
        }
    });

    fs.readdirSync(path.resolve(__dirname)).forEach(function (file) {
        if (file == "router.js") return;
        var name = file.substr(0, file.indexOf("."));
        var file_require = require("./" + name);
        file_require.page(app, menubar);
        log.info("Router", `Chargement ${name}.js (${file_require.infos.name})`);
        i++;
    });

    fs.readdirSync(path.resolve("./plugins/")).forEach(function (folder) {
        var file_require = require("../plugins/" + folder + "/routes.js");
        if (file_require.infos.has_page) {
            file_require.page(app, menubar);
            log.info("Router", `Chargement ${folder}.js (${file_require.infos.name})`);
            i++;
        }
    });
    log.info("Router", `${i} route(s) chargée(s)`);
};
