const { exec } = require('child_process');
exec('echo LabProg1 | sudo -S nodemon --exec babel-node src/index.js', (err, stdout, stderr) => {
	console.log('teste');
  if (err) {
  	console.log('teste2', err);
    // node couldn't execute the command
    return;
  }

  // the *entire* stdout and stderr (buffered)
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});