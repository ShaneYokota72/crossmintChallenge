const {Router} = require('express');

const {phase1Router} = require('./phase1');

const apiRouter = Router();

apiRouter.use('/phase1', phase1Router);

module.exports = {apiRouter};