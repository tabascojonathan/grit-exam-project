const express = require('express')
const app = express()
const port = 3000
const session = require('express-session');

const moment = require('moment');
app.locals.moment = moment;

require('dotenv').config();

app.use(express.static('public'));

let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Specify the location of the views folder
app.set('views', './views');


app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: true
    })
);


// ROUTING
const router = require('./routes/routes');
app.use(router);

// Controllers
const posts = require('./controllers/posts');
app.use(posts);

// API Endpoints
const api = require('./api/endpoints');
app.use(api);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})