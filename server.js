var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var express =  require('express');
var app = express();
import bodyParser from 'body-parser';
import tweetservice from './services/tweetservice'

// app.use('/', express.static('./resources/'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('resources'))

app.get('/ho', (req,res)=>{
  res.send("hi there");
});

app.get('/hola', (req,res)=>{
  res.send("hi there hola");
});

app.get('/tweets',tweetservice.getAll);

app.listen(4000, '0.0.0.0', function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log('Running at http://0.0.0.0:4000');
  });


// new WebpackDevServer(webpack(config), {
//     publicPath: config.output.publicPath
//   }).listen(4000, '0.0.0.0', function (err, result) {
//     if (err) {
//       console.log(err);
//     }
//     console.log('Running at http://0.0.0.0:4000');
//   });
