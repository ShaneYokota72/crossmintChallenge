const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

const {apiRouter} = require('./api');
app.use('/api', apiRouter);

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});