const dotenv = require("dotenv");
dotenv.config();

class POLYanets{
    constructor(row, column){
        this.row = row;
        this.column = column;
    }

    static async createPolyanets(row, column){
        const body = {
            row,
            column,
            "candidateId": process.env.CANDIDATE_ID
        }
        try{
            const response = await fetch("https://challenge.crossmint.io/api/polyanets", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                const error = await response.json();
                throw new Error(`API request failed: ${error.message}`);
            }
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    static async deletePolyants(row, column){
        const body = {
            row,
            column,
            "candidateId": process.env.CANDIDATE_ID
        }
        try{
            const response = await fetch("https://challenge.crossmint.io/api/polyanets", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                const error = await response.json();
                throw new Error(`API request failed: ${error.message}`);
            }
        } catch (error) {
            console.error(error);
            return error;
        }
    }
}

module.exports = {POLYanets};