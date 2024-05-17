class apiLimit{
    constructor(){
        this.timeOut = 7500;
        this.limit = 10;
        this.count = 0;
    }

    async increment() {
        this.count++;
        console.log("Count:", this.count);
      
        if (this.isLimitReached()) {
          console.log(`API Limit Reached. Waiting for ${this.timeOut}ms before continuing...(limit was ${this.limit})`);
          await new Promise(resolve => setTimeout(resolve, this.timeOut));
          this.reNew();
        }
      }

    reNew(){
        this.count = 0;
        this.timeOut *= 1.25;
    }

    isLimitReached(){
        return this.count >= this.limit;
    }
}

module.exports = {apiLimit};