const {Router} = require('express');
const dotenv = require('dotenv');
dotenv.config();

const polyanetRouter = Router();

polyanetRouter.post('/create', async (req, res) => {
    const {row, column} = req.body;
    const body = {
        row,
        column,
        "candidateId": process.env.CANDIDATE_ID
    }

    try{
        const response = await fetch(`${process.env.API_ENDPOINT}/polyanets`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })

        if (response.ok) {
            const data = await response.json();
            res.status(200).json({ message: "Polyanet created", data });
        } else {
            const error = await response.json();
            res.status(429).json({ message: "Polyanet failed to create", error });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Polyanet - Internal Server Error", error});
    }
})

module.exports = {polyanetRouter};