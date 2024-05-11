module.exports.create = async (title, options) => {
	// Forward arguments to the other command, constructing them dynamically
	const commandArgs = ['clasp']; // Adjust path if necessary
	commandArgs.push('create');
	if (options.type) {
		commandArgs.push('--type', options.type);
	} else {
		commandArgs.push('--type', 'standalone');
	}

	if (options.parentId) {
		commandArgs.push('--parentId', options.parentId);
	}
	commandArgs.push('--title', title);
	commandArgs.push('--rootDir', './dist');

	const {command} = require('./command');
	await command(commandArgs);
}