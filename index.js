
//In this node js project, we are creating the server instance using express package(as the project is in localhost), we will get localhost server instance
//Then we are creating the routing in separate routes.js
//then we are creating response to the get & post request made at API endpoint: /account , 
//ie., the server returns response as json object when the user makes the request, thats why that /account is known as API endpoint
var express = require("express");
var bodyParser = require("body-parser");
let alexaVerifier = require('alexa-verifier');
var app = express();

//app.use(bodyParser.json());

app.use(bodyParser.json({
    verify: function getRawBody(req, res, buf) {
        req.rawBody = buf.toString();
    }
}));

//function - - when we call this function as "requestVerifier(req,res,next)"...the below code will be executed
function requestVerifier(req, res, next) {
    alexaVerifier(
        req.headers.signaturecertchainurl,
        req.headers.signature,
        req.rawBody,
        function verificationCallback(err) {
            if (err) {
            	console.log('verification failed');
                res.status(401).json({ message: 'Verification Failure', error: err });
            } else {
            	console.log('verification succesful');
                 next();
            }
        }
    );
}

//here when the get request is made at route '/forecast', first the requestverifier will be called
//as it is a function handler, it receives req,res,next params...where req is get request object and 
//and next is the next function handler which is ready to implement, here next handler is function(req,res)
//here requestverifier is called middleware because we are implmenting it first before regular hanlder
//remmeber every middleware must have req,res and next params
app.get('/forecast',requestVerifier,function(req, res) {
    // We'll fill this out later!
   if (req.body.request.type === 'LaunchRequest') {
    res.json({
      "version": "1.0",
      "response": {
        "shouldEndSession": true,
        "outputSpeech": {
          "type": "SSML",
          "ssml": "<speak>Hmm <break time=\"1s\"/> What day do you want to know about?</speak>"
        }
      }
    });
  }//if ended for launch request
  else if (req.body.request.type === 'IntentRequest'){
	    res.json({
	      "version": "1.0",
	      "response": {
	        "shouldEndSession": true,
	        "outputSpeech": {
	          "type": "SSML",
	          "ssml": "<speak>Looks like a great day!</speak>"
	        }
	      }
	    });
   }// else if - intent request
  else if (req.body.request.type === 'SessionEndedRequest') {
    // Per the documentation, we do NOT send ANY response... I know, awkward.
    console.log('Session ended', req.body.request.reason);
  }
  else{
  	console.log('request not received properly');
  }
  // ...
});



var server = app.listen(3000, function () {
    console.log("Listening on port %s...", server.address().port);
});

