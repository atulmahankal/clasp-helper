module.exports.clone = async (scriptId) => {
	// Forward arguments to the other command, constructing them dynamically
	const commandArgs = ['clasp']; // Adjust path if necessary
	commandArgs.push('clone');
	commandArgs.push(scriptId);
	commandArgs.push('--rootDir', './dist');

	const {command} = require('./command');
	await command(commandArgs);
}