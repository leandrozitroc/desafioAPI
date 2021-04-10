import express from "express"


class Appcontroller{
    express = express()
    
    constructor(){
        this.express = express()
    }

    middlewares(){
        this.express.use(express.json)
        this.express.use(express.urlencoded)
    }

    routes() {
        this.express.use(require('./routes'))
    }
}

export default new Appcontroller()