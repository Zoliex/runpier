module.exports.page = function (app, menubar) {
    app.get(module.exports.infos.link, function (req, res) {
        var ejs_variables = {
            menubar,
            scripts_name: module.exports.infos.scripts_name,
            name: module.exports.infos.name
        };

        res.render("index", ejs_variables);
    });
};

module.exports.infos = {
    name: "Applications",
    icon: "fa-solid fa-house-chimney",
    link: "/",
    scripts_name: "index"
}