var express = require('express');
var app = express();

var server = app.listen(process.env.PORT || 80, listen);

function listen() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at https://' + host + ':' + port);
}

app.use(express.static('public'));

app.get('/webhook', function(req, res) {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === "my_voice_is_my_password_verify_me") {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);          
  }  
});
