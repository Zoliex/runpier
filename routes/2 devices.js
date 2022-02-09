module.exports.page = function (app, menubar) {
    app.get(module.exports.infos.link, function (req, res) {
        var ejs_variables = {
            menubar
        };

        res.render("devices", ejs_variables);
    });
};

module.exports.infos = {
    name: "Appareils",
    icon: "fa-solid fa-keyboard",
    link: "/devices"
}