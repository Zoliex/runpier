const path = require("path");

module.exports.page = function (app, menubar) {
    app.get(module.exports.infos.link, function (req, res) {
        var ejs_variables = {
            menubar,
            scripts_name: module.exports.infos.scripts_name,
            name: module.exports.infos.name
        };

        res.render(path.resolve("./web/views/system.ejs"), ejs_variables);
    });
};

module.exports.infos = {
    name: "Système",
    icon: "fa-solid fa-desktop",
    link: "/system",
    scripts_name: "system"
}