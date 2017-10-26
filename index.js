import router from './routes';
import express from 'express';
import config from './config';
import bodyParser from 'body-parser';

var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/', express.static('../resources/static'));
app.use('/',router);

app.listen(config.port,()=>{
  console.log("connected to port "+ config.port);
})
