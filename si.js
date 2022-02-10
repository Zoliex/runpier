const si = require('systeminformation');

async function run() {
	console.log(await si.system());
	console.log(await si.bios());
	console.log(await si.baseboard());
	console.log(await si.chassis());
	console.log(await si.osInfo());
	console.log(await si.versions("*"));
}

run();