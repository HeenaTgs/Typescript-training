const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
const userRouter = require('./api/users/user.router');
const productRouter = require('./api/products/product.router');

const app = express();

app.use(cors())

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

db.sequelize.sync();

app.listen(3000, () => {
    console.log('Server up and running')
})