const {Router} = require('express');
const express = require('express');

const {phase1Router} = require('./phase1');
const {phase2Router} = require('./phase2');
const {polyanetRouter} = require('./polyanet');
const {soloonRouter} = require('./soloon');
const {comethRouter} = require('./cometh');
const { rateLimitCheck } = require('../middlewares/rateLimitCheck');

// Create a router for the API used when creating the megaverse objects
const apiRouter = Router();
apiRouter.use(rateLimitCheck)
apiRouter.use(express.json())
apiRouter.use('/polyanet', polyanetRouter);
apiRouter.use('/soloon', soloonRouter);
apiRouter.use('/cometh', comethRouter);

// Create a router for the challenge
const challengeRouter = Router();
challengeRouter.use('/phase1', phase1Router);
challengeRouter.use('/phase2', phase2Router);

module.exports = {apiRouter, challengeRouter};