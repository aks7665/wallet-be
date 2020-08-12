const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('./db/mongodb.js');
const http = require("http");

const port = process.env.PORT;

const server = http.Server(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CORS Middleware
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PATCH, DELETE, PUT");
    next();
});

// Routes
const appRoutes = require('./routes/app.routes');
app.use("/api/app", appRoutes);

// 404 Error
app.get('*', (req, res) => {
    return res.status(400).send({
        status: false,
        status_code: 400,
        message: "URL Not found."
    });
});

server.listen(port, () => {
    console.log('Server is up on port ' + port);
});
