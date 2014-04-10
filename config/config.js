var convict = require('convict');

// define a schema

var conf = convict({
  env: {
    doc: "The applicaton environment.",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV"
  }
});


// load environment dependent configuration
var env = conf.get('env');
conf.loadFile('./config/' + env + '.json');

// perform validation
conf.validate();

module.exports = conf;