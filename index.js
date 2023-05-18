const express = require('express');
const app = express();

const getRouter = require('./routes/getRouter');

const PORT = 1339;

// middlewares

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', getRouter);

app.listen(PORT, () => {
    console.log("Server is running successfully");
});