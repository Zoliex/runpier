module.exports = function (app) {
    app.get("/", function (req, res) {
        var ejs_variables = {
            cpu_temp: 0,
            cpu_temp_bar: 0,
            date_hh_mm: "00:00",
            cpu_usage: 0,
            cpu_ram: "0.00",
            cpu_ram_total: "0.00",
            cpu_ram_bar: 0,
            disk_free: "0.00",
            disk_total: "0.00",
        };

        res.render("index", ejs_variables);
    });
};
