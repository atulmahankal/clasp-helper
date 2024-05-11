function terminal(){
	// detect system platform
	const platform = process.platform;
	let cmd;
	if (platform === 'win32') {
		// Windows requires extra handling due to potential path issues
		cmd = 'npx.cmd'; // Use npx.cmd for Windows compatibility
	} else {
		// Unix-based systems can use npx directly
		cmd = 'npx';
	}
	return cmd;
}

module.exports.command = async (...Args) => {
	if (Array.isArray(...Args)) {
		var commandArgs = Args[0];
	} else {
		var commandArgs = Args;
	}
	
	// var commandArgs = [];
	// // Loop through each argument
	// Args.forEach(arg => {
	// 	// Push the argument to the commandArgs array
	// 	// commandArgs.push(arg);
	// 	console.log(arg)
	// });

	// // Execute the other command using child_process.spawn
	// const { spawn } = require('child_process');
	// const child = spawn(terminal(), ...Args);	//, { stdio: 'inherit' });
	// var stdout = stderr = "";

	// // Listen for stdout data event
	// child.stdout.on('data', (data) => {
	// 	// console.log(`${data}`);
	// 	stdout += data.toString();
	// });

	// // Listen for stderr data event
	// child.stderr.on('data', (data) => {
  //   // console.error(`${data.toString()}`);
	// 	stderr += data.toString();
  // });

	// // Listen for the close event
	// child.on('close', (code) => {
	// 	if(stdout){
	// 		console.log(stdout);
	// 	}
	// 	if(stderr){
	// 		console.log(stderr);
	// 	}
		
	// 	// if (code !== 0) {
	// 	// 	console.error('Other command exited with code:', code);
	// 	// }
	// });
	//////////////////////////////////////////////////////
	const { spawnSync } = require('child_process');
	const result = spawnSync(terminal(), ...Args);
	if (result.status === 0) {
    // console.log(`Command '${command}' completed successfully.\n`);
    console.log(`${result.stdout.toString()}`);
  } else {
    // console.error(`Command '${command}' failed with exit code: ${result.status}\n`);
    if (result.stderr.length > 0) {
      console.error(`${result.stderr.toString()}`);
    }
  }
}
