var express = require('express')
var bodyParser = require('body-parser')
var routes = require('./routes')
var config = require('./config/config')
var compression = require('compression')
var morgan = require('morgan')
var fs = require('fs')
var cors = require('cors')
var path = require('path')
var app = new express()
var connection = require('./config/database');
var consoleLine = require('./plugins/consoleLine')


function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) {
    return false
  }
  return compression.filter(req, res)
}

var accessLogStream = fs.createWriteStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')
})




app.use(consoleLine);
app.use(bodyParser.urlencoded({limit: '50mb', extended: false, parameterLimit: 1000000 })) 
app.use(bodyParser.json({limit: '50mb' }))

app.use(cors());
app.use(morgan('tiny'));
app.use(morgan('combined', { stream: accessLogStream }));
app.use(compression({ filter: shouldCompress }));  // enable compress
app.use(express.static('uploads'));
app.use('/',routes);  // using routing


//Server Start
app.listen(
    process.env.PORT || config.server.port,
    config.server.host || '0.0.0.0', 
    () => console.log(`Server Started on ${ (config.server.host ? config.server.host : '0.0.0.0') }:${ process.env.PORT ? process.env.PORT : config.server.port }`)
)