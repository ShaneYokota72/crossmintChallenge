# Crossmint Coding Challenge 🚀
This repository contains the code solution for the Crossmint coding challenge by Shane Yokota.

The repository contains a simple Express server that has two endpoints to make the given metaverse for the given challenge.

# Tech Stack 🗃
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

# Getting Started 📘
### Step 1: Setting up the .env file
- PORT = `<YOUR LOCAL API PORT>` (example: 3000)
- CANDIDATE_ID = `<CANDIDATE ID>` 
- LOCAL_API_ENDPOINT = `http://localhost:<PORT>/api` (example: http://localhost:3000/api  )
- API_ENDPOINT = https://challenge.crossmint.io/api

### Step 2: Starting the Express server
Installing the dependencies and starting the Express server:
```
npm i
nodemon index.js
```
### Step 3: Calling the API for Phase 1 and Phase 2(In another terminal)
#### Option 1: using cURL
```
// for Phase 1
curl -X POST http://localhost:3000/challenge/phase1

// for Phase 2
curl -X POST http://localhost:3000/challenge/phase2
```

#### Option 2: Using Postman (or any API testing tool)
For Phase 1:
- Request Type: POST
- URL: http://localhost:3000/challenge/phase1

For Phase 2:
- Request Type: POST
- URL: http://localhost:3000/challenge/phase2

# Core Code Explanation 📝
### `Megaverse.js`

* Defines the base `Megaverse` class and classes for `Polyanet`, `Soloon`, and `Cometh` astral objects.
* Implements the `.create()` method for each class to create objects by making API requests.
* Includes a retry mechanism for failed requests with `forceTimeOut` property.

### `rateLimitCheck.js`

* A middleware introduced to handle rate limiting issues when sending hundreds of API requests to the server.
* Prevents the server from rejecting requests due to "Too many requests" errors.
* Enforces a rate limit and implements a timeout to regulate the number of requests sent.