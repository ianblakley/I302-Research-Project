// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

var exec = require('child_process').exec, child;

function thimbleImport(token, id) {
  // Remove existing files
  // Fetch archive
  // Extract
  // Restart as Thimble App
  child = exec('./import.sh', {
    env: {
      TOKEN: token,
      ID: id
    }
  }, function (error, stdout, stderr) {
    console.log(stdout);
    console.error(stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
    process.exit()
  });
}

// Check if we're a remix
if('ea4b9a75-92ac-4057-9a6e-31dde0d03682' !== process.env.PROJECT_ID) {
  console.log('remix!')
  thimbleImport(process.env.TOKEN, process.env.ID)
} else {
  console.log('Base!')
}
