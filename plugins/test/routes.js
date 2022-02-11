const path = require("path");

module.exports.page = function (app, menubar) {
	app.get(module.exports.infos.link, function (req, res) {
		var ejs_variables = {
			menubar,
			scripts_name: module.exports.infos.scripts_name,
			name: module.exports.infos.name
		};

		res.render(path.resolve(`./plugins/test/page/index.ejs`), ejs_variables);
	});
};

module.exports.infos = {
	has_page: true,
	name: "Test",
	icon: "fa-solid fa-vial",
	link: "/test"
}