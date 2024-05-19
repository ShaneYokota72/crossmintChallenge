const RATE_LIMIT = 9;
const TIMEOUT = 6000;
const RESET_INTERVAL = 8000;

let apiCount = 0;
let lastApiCallAt = Date.now();
let timeOut = TIMEOUT

const resetApiCount = () => {
    apiCount = 0;
    lastApiCallAt = Date.now();
    timeOut += 1500;
}

const rateLimitCheck = (req, res, next) => {
    const {forceTimeOut} = req.body;
    if(forceTimeOut){
        setTimeout(() => {
            resetApiCount();
            next();
        }, timeOut);
    }

    console.log(`API MIDDLEWARE - apiCount: ${apiCount}`)
    const currentTime = Date.now();

    if(currentTime - lastApiCallAt > RESET_INTERVAL){
        apiCount = 0;
        timeOut = TIMEOUT;
    }

    if(apiCount >= RATE_LIMIT){
        console.error(`API Limit of ${RATE_LIMIT} Reached. Waiting for ${timeOut}ms before continuing`)
        setTimeout(() => {
            resetApiCount();
            next();
        }, timeOut);
    } else {
        apiCount++;
        lastApiCallAt = currentTime;
        next();
    }
}

module.exports = {rateLimitCheck};