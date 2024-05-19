const express = require('express');
const dotenv = require('dotenv');
const {apiRouter, challengeRouter} = require('./routes');

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use('/api', apiRouter);
app.use('/challenge', challengeRouter);

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});