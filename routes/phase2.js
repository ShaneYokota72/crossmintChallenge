const {Router} = require('express');
const dotenv = require('dotenv');
const {Polyanet, Soloon, Cometh} = require('../util/megaverse');
dotenv.config();

const phase2Router = Router();

const createMegaverseObject = (apiQueue, goalMap, row, column) => {
    const object = goalMap[row][column];
    const objectList = object.split("_")
    const objectType = objectList.pop();

    // Check the object type and create the object
    if(objectType === "POLYANET"){
        apiQueue.unshift(new Polyanet(row, column));
    } else if(objectType === "SOLOON"){
        const horizontal = [0, 1, 0, -1];
        const vertical = [1, 0, -1, 0];

        // Validate Soloon object
        for(let i=0; i<4; i++){
            const newRow = row + vertical[i];
            const newColumn = column + horizontal[i];
            if(newRow < 0 || newRow >= goalMap.length || newColumn < 0 || newColumn >= goalMap[0].length){
                continue;
            }
            if(goalMap[newRow][newColumn] === "POLYANET"){
                apiQueue.push(new Soloon(row, column, objectList[0].toLowerCase()));
                return;
            }
        }
    } else if(objectType === "COMETH"){
        apiQueue.unshift(new Cometh(row, column, objectList[0].toLowerCase()));
    }
}

phase2Router.post('/', async (req, res) => {
    try {
        // Get the goal map
        const response = await fetch(`${process.env.API_ENDPOINT}/map/${process.env.CANDIDATE_ID}/goal`, {
            method: "GET",
        })
        const data = await response.json();
        const goalMap = data.goal;
    
        // Create the megaverse objects and store them in a queue(reorder the queue to create the objects in the appropriate order)
        let megaverseObjects = [];
        for(let i=0; i< goalMap.length; i++){
            for(let j=0; j< goalMap[i].length; j++){
                if(goalMap[i][j] === "SPACE"){
                    continue;
                }
                createMegaverseObject(megaverseObjects, goalMap, i, j)
            }
        }
    
        // Create the megaverse objects
        for(let i=0; i< megaverseObjects.length; i++){
            await megaverseObjects[i].create();
        }

        res.status(200).json({ message: "Phase 2 Done" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error occured during phase 2" });
    }
})

module.exports = {phase2Router};