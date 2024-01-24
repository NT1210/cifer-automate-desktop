const mongoose = require("mongoose")
// const { green } = require('console-log-colors')
require("dotenv").config()


async function connect(){
    const url = `mongodb://127.0.0.1:27017/${process.env.DB_NAME}?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1`
    
    try{
        await mongoose.connect(url)

        return "connected"
        
    }catch(e){
        throw new Error("Error")
    }
}

async function disconnect(){
    
    try{
        mongoose.connection.on('disconnected', () => console.log('disconnected'));
        await mongoose.disconnect()
    }catch(e){

    }

}


module.exports = {
    connect,
    disconnect
}