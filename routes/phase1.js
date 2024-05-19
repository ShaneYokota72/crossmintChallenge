const {Router} = require('express');
const dotenv = require('dotenv');
const { Polyanet } = require('../util/megaverse');
dotenv.config();

const phase1Router = Router();

phase1Router.post('/', async (req, res) => {
    // Cross pattern size 
    const crossSize = 11;
    const padding = 2;
    const mid = Math.floor(crossSize/2);
  
    try {
      // For loop to create Polyanets in the cross pattern
      for (let i = padding; i < crossSize-padding; i++) {
        if (i === mid) {
          console.log("creationg Polyanet at: [", mid, ",", mid, "]");
          await (new Polyanet(mid, mid)).create();
          continue;
        }
  
        console.log("creationg Polyanet at: [", i, ",", i, "]");
        await (new Polyanet(i, i)).create();
  
        console.log("creationg Polyanet at: [", i, ",", crossSize-i-1, "]");
        await (new Polyanet(i, crossSize-i-1)).create();
      }
  
      res.json({ message: "Phase 1 Done" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error occured during phase 1" });
    }
});

module.exports = {phase1Router};