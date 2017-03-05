var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      db.connection.query('SELECT * FROM messages', function(err, result) {
        if (err) {
          console.log(err);
        } else {
          callback(result);
        }
      });
    }, // a function which produces all the messages
    post: function (content, username, roomname, callback) {

      var values = {username: username};

      //get userId using the username
      var selectUserId = 'SELECT id FROM users WHERE ?';

      var userId;

      db.connection.query(selectUserId, values, function(err, results) {
        if (err) {
          console.error(err);
        }
        userId = results[0].id;

        //get roomId using the roomname
      //   module.exports.rooms.getRoomId(roomname, function(roomId) {
      // });
        var post = [content, userId, roomname];

        //console.log('models 25: ', post);

        var insertQuery = 'INSERT INTO messages(content, userId, roomname) VALUES (?,?,?)';

        db.connection.query(insertQuery, post, function(err, result) {
          if (err) {
            console.log(err);
            callback(err);
          } else {
            //console.log(result);
            callback(result);
          }
        });
      });

    } // a function which can be used to insert a message into the database
  },

  users: {
    get: function (callback) {
      db.connection.query('SELECT * FROM users', function(err, result) {
        if (err) {
          console.log(err);
        } else {
          callback(result);
        }
      });
    },
    post: function (username, callback) {
      //use username to create new user in db
      var post = { username: username };
      var queryString = 'INSERT INTO users SET ?';

      db.connection.query(queryString, post, function(err, result) {
        if (err) {
          callback(err);
        } else {
          //console.log('users result ' + result.insertId);
          callback(result);
        }
      });

    }
  },

  // rooms: {
  //   //return id of -1 if noomname is not in DB
  //   getRoomId: function(roomname, callback){
  //     var values = {roomname: roomname};
  //     var selectRoomId = `SELECT id FROM rooms WHERE ?`;

  //     db.connection.query(selectRoomId, values, function(err, results) {
  //         if(err) {
  //           console.error(err);  // callback(err);
  //         }

  //         var roomId;

  //         if(results.length === 0){
  //           //add room to database
  //           module.exports.rooms.addToDb(roomname, function(results){
  //             roomId = results.insertId;
  //           });
  //         } else {
  //           roomId = results[0].id;
  //         }

  //         callback(roomId);
  //       });
  //   },
  //   addToDb: function(roomname, callback){
  //     //use roomname to create new room in db
  //     var room = { roomname: roomname };
  //     var queryString = `INSERT INTO rooms SET ?`;

  //     db.connection.query(queryString, room, function(err, result) {
  //       if(err) {
  //         console.log(err);
  //       } else {
  //         callback(result);
  //       }
  //     });
  //   }
  // }
};

