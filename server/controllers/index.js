var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(function(messages) {
        res.end(JSON.stringify(messages));
      });
    }, // a function which handles a get request for all messages remember to send back as json
    post: function (req, res) {
      //access the data needed from req object and store to local variables
      var post = req.body;
      // console.log('controllers line 9 ', post);
      var content = post.message;
      var username = post.username;
      var roomname = post.roomname;

      models.messages.post(content, username, roomname, function(err, results) {
        res.sendStatus(201);
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get(function(users) {
        res.end(JSON.stringify(users));
      });
    },
    post: function (req, res) {
      var username = req.body.username;
      //console.log(username);
      models.users.post(username, function(err, results) {
        res.sendStatus(201);
      });
    }
  }
};

