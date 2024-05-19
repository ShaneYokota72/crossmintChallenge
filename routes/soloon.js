const {Router} = require('express');
const dotenv = require('dotenv');
dotenv.config();

const soloonRouter = Router();

soloonRouter.post('/create', async (req, res) => {
    const {row, column, color} = req.body;
    const body = {
        row,
        column,
        color,
        "candidateId": process.env.CANDIDATE_ID
    }

    try{
        const response = await fetch(`${process.env.API_ENDPOINT}/soloons`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })
        if (response.ok) {
            const data = await response.json();
            res.status(200).json({ message: "Soloon created", data });
        } else {
            const error = await response.json();
            res.status(429).json({ message: "Soloon failed to create", error });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Soloon - Internal Server Error", error});
    }
})

module.exports = {soloonRouter};