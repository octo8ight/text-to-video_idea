const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

const router = require('./router');

const PORT = 5000;

app.use('/api', router);

app.listen(5000, () => {
    console.log('Server is running port at 5000')
})