module.exports.page = function (app, menubar) {
    app.get(module.exports.infos.link, function (req, res) {
        var ejs_variables = {
            menubar,
            scripts_name: module.exports.infos.scripts_name
        };

        res.render("system", ejs_variables);
    });
};

module.exports.infos = {
    name: "Système",
    icon: "fa-solid fa-desktop",
    link: "/system",
    scripts_name: "system"
}