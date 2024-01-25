
const { extract } = require("./puppeteer")
const { writeToFile } = require("./xlsx-populate")
// const { connect, disconnect } = require("./db/db")
// const mongoose = require("mongoose")
const { Cifer } = require("../db/schema")
const { coordinateObj, validateDocument } = require("./utils")
// const { green, red } = require("console-log-colors")


async function main(){
    try{
        //extract data from cifer singlewindow
        const extractedData = await extract()

        // create mongoDB documents
        const docsBefore = await coordinateObj(extractedData)
      
        const toBeAdded_toBeUpdatedArrs = await validateDocument(docsBefore) // returns array including objToBeAdded, objToBeUpdated
        const objToBeAdded = toBeAdded_toBeUpdatedArrs[0]
        const objToBeUpdated = toBeAdded_toBeUpdatedArrs[1]
        const objDeleted = toBeAdded_toBeUpdatedArrs[2]

        if(objToBeAdded.length > 0) {
            await Cifer.create(objToBeAdded)
        }
    
        // output extractedData to template excel file.
        await writeToFile(extractedData, objToBeUpdated, objToBeAdded, objDeleted)

        return "success"

    }catch(err){
        console.error(err)
        throw err
    }
}



module.exports = {
    main
}
