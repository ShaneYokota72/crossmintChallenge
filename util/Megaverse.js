class Megaverse{
    constructor(row, column){
        this.row = row;
        this.column = column;
    }

    async create(){
        throw new Error("Method not implemented.");
    }

    async delete(){
        throw new Error("Method not implemented.");
    }
}

class Polyanet extends Megaverse{
    async create(){
        console.log(`Creating Polyanet at: [${this.row}, ${this.column}]`);
        const body = {
            row: this.row,
            column: this.column
        }

        const makeRequest = async (body) => {
            const response = await fetch(`${process.env.LOCAL_API_ENDPOINT}/polyanet/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
            if (response.ok) {
                const data = await response.json();
                console.log(data, "\n");
            } else {
                console.log("Polyanet create - retrying")
                const retryBody = {
                    ...body,
                    forceTimeOut: true
                }
                console.log(`RETRY - Creating Polyanet at: [${this.row}, ${this.column}]`)
                await makeRequest(retryBody);
            }
        }

        await makeRequest(body);
    }
}

class Soloon extends Megaverse{
    constructor(row, column, color){
        super(row, column);
        this.color = color;
    }

    async create(){
        console.log(`Creating Soloon at: [${this.row}, ${this.column}] with color: ${this.color}`);
        const body = {
            row: this.row,
            column: this.column,
            color: this.color
        }

        const makeRequest = async (body) => {
            const response = await fetch(`${process.env.LOCAL_API_ENDPOINT}/soloon/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
            if (response.ok) {
                const data = await response.json();
                console.log(data, "\n");
            } else {
                console.log("Soloon create - retrying")
                const retryBody = {
                    ...body,
                    forceTimeOut: true
                }
                console.log(`RETRY - Creating Soloon at: [${this.row}, ${this.column}] with color: ${this.color}`)
                await makeRequest(retryBody);
            }
        }

        await makeRequest(body);
    }
}

class Cometh extends Megaverse{
    constructor(row, column, direction){
        super(row, column);
        this.direction = direction;
    }

    async create(){
        console.log(`Creating Cometh at: [${this.row}, ${this.column}] with direction: ${this.direction}`);
        const body = {
            row: this.row,
            column: this.column,
            direction: this.direction
        }

        const makeRequest = async (body) => {
            const response = await fetch(`${process.env.LOCAL_API_ENDPOINT}/cometh/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
            if (response.ok) {
                const data = await response.json();
                console.log(data, "\n");
            } else {
                console.log("Cometh create - retrying")
                const retryBody = {
                    ...body,
                    forceTimeOut: true
                }
                console.log(`RETRY - Creating Cometh at: [${this.row}, ${this.column}] with direction: ${this.direction}`)
                await makeRequest(retryBody);
            }
        }

        await makeRequest(body);
    }
}

module.exports = {Polyanet, Soloon, Cometh};