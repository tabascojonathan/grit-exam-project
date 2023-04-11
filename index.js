const express = require('express')
const app = express()
const port = 4000

app.use(express.static('public'));

let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World! asijdpaosdkapoks')
})

app.get('/random', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.post('/login', (req, res) => {
    console.log(req.body)
    res.send('Got a POST request')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})