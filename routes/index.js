module.exports = function (app) {
    app.get("/", function (req, res) {
        var ejs_variables = {
            menubar: [
                {
                    name: "Applications",
                    icon: "las la-home"
                },
                {
                    name: "Statistiques",
                    icon: "las la-chart-area"
                },
                {
                    name: "Paramètres",
                    icon: "las la-cog"
                }
            ]
        };

        res.render("index", ejs_variables);
    });
};
