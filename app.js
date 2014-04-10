
/**
 * Module dependencies.
 */
//VENDORS
var express = require('express');
var engine = require('ejs-locals')
var route_site = require('./routes/site');
var route_job = require('./routes/job');
var http = require('http');
var path = require('path');
var stylus = require('stylus');
var socket_io = require('socket.io');
var mysql = require('mysql');
//CONFIG
var conf = require('./config/config.js');

//STATIC OBJECT
var global = require('./config/global.js');


var app = express();


// all environments
app.set('env', conf.get('env'));
app.set('port', conf.get('port'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');



// use ejs-locals for all ejs templates:
app.engine('ejs', engine);


app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(stylus.middleware(__dirname + '/public'));

app.use(express.static(path.join(__dirname, 'public')));

// development only
app.configure('development', function() {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// production only
app.configure('production', function() {
  app.use(express.errorHandler());
});




//ROUTES
app.get('/', route_site.index);
app.get('/job', route_job.check);


//DEMARAGE DU SERVEUR
var server = http.createServer(app); 
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port') + ' - ' + app.get('env'));
});

//CONNECTION BDD (POOL CONNEXION)
global.pool  = mysql.createPool({
  host     : conf.get("db_host"),
  user     : conf.get("db_user"),
  password : conf.get("db_password")
});

//EVENTS
global.io = socket_io.listen(server);

global.io.configure('development', function(){
    global.io.set('log level', 1);
});

global.io.configure('production', function(){
    global.io.set('log level', 5);
});

global.io.sockets.on('connection', function (socket) {
  
  console.log('socket_id: '  + socket.id + ' has connected');
  
  //Diffuser un event (-> client)
  /*socket.emit('refreshScreenClient', { 
      hello: 'world',
      timestamp: Date.now(),
      socket_id: socket.id
  });*/
  
  //Traiter un event 
  socket.on('refreshScreenClientDone', function (data) {
    console.log('Le client '  + socket.id + ' a été mis à jour...');
  });
  
});


