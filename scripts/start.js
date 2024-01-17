const fs = require('fs');
const { spawn } = require('child_process');

let server;

const startServer = () => {
  server = spawn('node', ['./bin/www'], { stdio: 'inherit' });
};

startServer();

fs.watch('./', { recursive: true }, (event, filename) => {
  if (event === 'change' && filename.endsWith('.js')) {
    console.log('Restarting server due to file change...');
    server.kill();
    startServer();
  }
});