const si = require('systeminformation');
const { createSpinner } = require('nanospinner');

async function run() {
	console.log(await si.system());
	console.log(await si.bios());
	console.log(await si.baseboard());
	console.log(await si.chassis());
	console.log(await si.osInfo());
	console.log(await si.versions("*"));

	const spinner = createSpinner('Run test').start()

	setTimeout(() => {
		spinner.update({
			text: 'Modified',
			color: 'cyan',
		});
		setTimeout(() => {
			spinner.stop({ text: 'Done!', mark: ':O', color: 'magenta' })
		}, 2000)
	}, 1000)
}

run();