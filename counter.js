const fs = require('fs');

let count = 0;
console.log("counter init");

function load(app) {
	count = +fs.readFileSync('./plugins/counter.txt');
	console.log(count)

	app.server.use((req, res, next) => {
		console.log("use count")
		count++;
		next();
	});

	app.server.get('/count', (req, res) => {
		console.log("get count")
		res.send({ count });
	})
}

// Save request count for next time
function unload(app) {
	fs.writeFileSync('./counter.txt', count.toString());
}

module.exports = {
	load,
	unload
};