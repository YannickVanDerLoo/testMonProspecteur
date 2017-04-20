var express = require('express');
 
// Get the router
var router = express.Router();
var User = require('./models/user');
var Message     = require('./models/message');

// Middleware for all this routers requests
router.use(function timeLog(req, res, next) {
  console.log('Request Received: ', dateDisplayed(Date.now()));
  next();
});
 
// Welcome message for a GET at http://localhost:8080
router.get('/', function(req, res) {
    res.json({ message: 'Welcome' });   
});

// GET all messages (using a GET at http://localhost:8080/messages)
router.route('/messages')
    .get(function(req, res) {
        Message.find(function(err, messages) {
            if (err)
                res.send(err);
            res.json(messages);
        });
    });

// GET all users (using a GET at http://localhost:8080/users)
router.route('/users')
    .get(function(req, res) {
        User.find(function(err, users) {
            if (err)
                res.send(err);
            res.json(users);
        });
    });

// Create a user (using POST at http://localhost:8080/users)
router.route('/users')
    .post(function(req, res) {
        var user = new User();
        // Set values from the request
		if (req.body.firstname)
			{
	user.firstname = req.body.firstname;
	user.lastname = req.body.lastname;
	user.phone = req.body.phone;
	user.datebirth = req.body.datebirth;
	user.username = req.body.username;
	
                
			
        // Save user and check for errors
        user.save(function(err) {
            
            res.json({ message: 'User created successfully!' });
		
        });
		}
			else{
				res.status(400);
				res.send("Le champ firstname est vide, veuillez le remplir");
			}
    });

// GET user with username (using a GET at http://localhost:8080/users/:user_username)
router.route('/users/:username')
    .get(function(req, res) {
        User.findOne({username: req.params.username}, function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    });
	
module.exports = router;
 
function dateDisplayed(timestamp) {
    var date = new Date(timestamp);
    return (date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
}