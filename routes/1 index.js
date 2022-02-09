module.exports.page = function (app, menubar) {
    app.get(module.exports.infos.link, function (req, res) {
        var ejs_variables = {
            menubar
        };

        res.render("index", ejs_variables);
    });
};

module.exports.infos = {
    name: "Applications",
    icon: "fa-solid fa-house-chimney",
    link: "/"
}