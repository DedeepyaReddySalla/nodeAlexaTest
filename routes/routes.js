
//All API endpoints will appear in this file.
//the app variable is passed from index.js and this code is executed when index.js is executed because, from index.js 
//we are calling this function
var appRouter = function(app) {
	//here app parameter is the express instance, ie., server instance..
	app.get("/", function(req, res) {
    res.send("Hello World from exports project 2");
   });


	app.get("/account", function(req, res) {
		console.log('get request made');
    var accountMock = {
        "username": "nraboy",
        "password": "1234",
        "twitter": "@nraboy"
    }
    if(!req.query.username) {
        return res.send({"status": "error", "message": "missing username"});
    } else if(req.query.username != accountMock.username) {
        return res.send({"status": "error", "message": "wrong username"});
    } else {
        return res.send(accountMock);
    }
});


	app.post("/account", function(req, res) {
		console.log('post request made');
      if(!req.body.username) {
      	console.log('error in post' + req.body.username);
      	return res.send(req.body);
      }else{
      	console.log('no error in post ' + req.body.username);
      	return res.send(req.body);
      }
        
});

}

module.exports = appRouter;