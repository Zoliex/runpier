const path = require("path");

module.exports.page = function (app, menubar) {
    app.get(module.exports.infos.link, function (req, res) {
        var ejs_variables = {
            menubar,
            scripts_name: module.exports.infos.scripts_name,
            name: module.exports.infos.name
        };

        res.render(path.resolve("./web/views/devices.ejs"), ejs_variables);
    });
};

module.exports.infos = {
    name: "Appareils",
    icon: "fa-solid fa-keyboard",
    link: "/devices",
    scripts_name: "devices"
}