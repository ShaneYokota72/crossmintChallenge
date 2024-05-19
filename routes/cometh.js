const {Router} = require('express');
const dotenv = require('dotenv');
dotenv.config();

const comethRouter = Router();

comethRouter.post('/create', async (req, res) => {
    const {row, column, direction} = req.body;
    const body = {
        row,
        column,
        direction,
        "candidateId": process.env.CANDIDATE_ID
    }

    try{
        const response = await fetch(`${process.env.API_ENDPOINT}/comeths`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })
        if (response.ok) {
            const data = await response.json();
            res.status(200).json({ message: "Cometh created", data });
        } else {
            const error = await response.json();
            res.status(429).json({ message: "Cometh failed to create", error });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Cometh - Internal Server Error", error});
    }
})

module.exports = {comethRouter};