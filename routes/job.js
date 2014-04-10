var global = require('./../config/global.js');

/*
 * GET home page.
 */

var users = [
  { name: 'TJ', email: 'tj@vision-media.ca' },
  { name: 'Tobi', email: 'tobi@vision-media.ca' }
];

exports.check = function(req, res){
        
    //Bdd
    global.pool.getConnection(function(err, connection) {
        
         if (err) throw err;
         connection.query('USE bdd', function (err) {
            if (err) throw err;
            console.log("Connection database : succes");
            // Use the connection
            connection.query('SELECT * FROM bdd', function(err, rows) {
              if (err) throw err;
              
              // And done with the connection.
              connection.end();
              
              //Traitement des données              
              global.io.sockets.emit('refreshScreenClient', { dataComptes: rows });
              
            });
            
         });
          
    });    
    
    res.send(200);
    
    //On regarde la date de mise a jour des derniers bases de donnés
    //var date_now = new Date();
    //var date_maj_bdd = (new Date())-1;
    
    //if(date_maj_bdd>date_now){
        //req.emit('refreshScreenClient');
        //app.on('event:user_created', callback);
        //global.io.sockets.emit('refreshScreenClient', { hello: 'world' });
        
        res.send(200);
        //next();
    //}
};

/*
exports.list = function(req, res){
  res.render('users', { title: 'Users', users: users });
};

exports.load = function(req, res, next){
  var id = req.params.id;
  req.user = users[id];
  if (req.user) {
    next();
  } else {
    next(new Error('cannot find user ' + id));
  }
};

exports.view = function(req, res){
  res.render('users/view', {
    title: 'Viewing user ' + req.user.name,
    user: req.user
  });
};

exports.edit = function(req, res){
  res.render('users/edit', {
    title: 'Editing user ' + req.user.name,
    user: req.user
  });
};

exports.update = function(req, res){
  // Normally you would handle all kinds of
  // validation and save back to the db
  var user = req.body.user;
  req.user.name = user.name;
  req.user.email = user.email;
  res.redirect('back');
};*/