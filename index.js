const express = require('express');
const app = express();
const ngrok = require('ngrok');

const getRouter = require('./routes/getRoutes');

const PORT = 1339;

// middlewares

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type , Authorization');
    next();
});

app.use('/api/v1/', getRouter)

app.listen(PORT, () => {
    console.log("Server is running successfully");
});

(async function () {
    const url = await ngrok.connect({
        proto: 'http',
        addr: PORT,
        authtoken: "2Py59cfIxETQs1MHnvTgDGw0Z8G_25cL3ffZ6u4HDmp5TCmn7"
    });
    console.log(url);
})()