const {Router} = require('express');
const dotenv = require('dotenv');
const {POLYanets} = require('../util/POLYanets');
const {apiLimit} = require('../util/apiLimit');
dotenv.config();


const phase1Router = Router();

phase1Router.post('/', async (req, res) => {
    console.log("phase1 post");
    const crossSize = 11;
    const padding = 2;
    const mid = Math.floor(crossSize/2);
    const results = [];
    const apiCount = new apiLimit();

    try{
        for(let i = padding; i < crossSize-padding; i++){
            if(i === mid){
                console.log("creationg Polyanet at: [", mid, ",", mid, "]")
                await apiCount.increment();
                const response = await POLYanets.createPolyanets(mid, mid); // commentOut
                results.push(response); // commentOut
                continue;
            }
            console.log("creationg Polyanet at: [", i, ",", i, "]")
            await apiCount.increment();
            const response1 = await POLYanets.createPolyanets(i, i); // commentOut
            results.push(response1); // commentOut

            console.log("creationg Polyanet at: [", i, ",", crossSize-i-1, "]")
            await apiCount.increment();
            const response2 = await POLYanets.createPolyanets(i, crossSize-i-1); // commentOut
            results.push(response2); // commentOut
        }
        res.json({
            message: "Phase 1 Done"
        });
    } catch (error){
        console.error(error);
        res.status(500).json({
            error: "Error occured during phase 1"
        });
    }
})

module.exports = {phase1Router};