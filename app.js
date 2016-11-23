const express = require('express');
const app = express();
const favicon = require('serve-favicon');
const path = require('path');

const PORT = process.env.PORT || 3000;

app.use(function(req, res, next){
  if(req.headers['x-forwarded-proto'] === 'https') {
    res.redirect('http://' + req.hostname + req.url);
  } else {
    next();
  }
});
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Express server is running on port ${PORT}`)
});
