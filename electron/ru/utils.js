const { Cifer } = require("../db/schema")

function coordinateObj(arr){
    let ArrToBeReturned = []

    try{
        for(let unitArr of arr){
            let tempObj = {}

            tempObj["orderNum"] = parseInt(unitArr[0])
            tempObj["country"] = unitArr[1]
            tempObj["category"] = unitArr[2]
            tempObj["chinaRegNo"] = unitArr[3]
            tempObj["overseasRegNo"] = unitArr[4]
            tempObj["name"] = unitArr[5]
            tempObj["address"] = unitArr[6]
            tempObj["regDate"] = unitArr[7]
            tempObj["regExpiryDate"] = unitArr[8]
            tempObj["status"] = unitArr[9]

            ArrToBeReturned.push(tempObj)
            tempObj = {}
        }
    }catch (err){
        console.error(err)
    }

    

    return ArrToBeReturned
}


async function validateDocument(obj){
    let objToBeAdded = [] //array
    let objToBeUpdated = [] //array
    let objDeleted = [] //array

    for(let unitObj of obj){
        // // hijack test
        // if(unitObj.chinaRegNo === "CRUS18CS1901300007") unitObj.status = "changed!!!"
        // if(unitObj.chinaRegNo === "CRUS18CS1901300007") unitObj.regDate = "changed!!!"
        // if(unitObj.chinaRegNo === "CRUS18CS1901300007") unitObj.category = "changed!!!"

        const chinaRegNo = unitObj.chinaRegNo
        let objFromMongoDB = await Cifer.findOne({chinaRegNo: chinaRegNo})
    
        if(objFromMongoDB){
            objFromMongoDB.toObject() //coverting from mongodb object to js object
            delete objFromMongoDB._id //important
            const keys = Object.keys(unitObj)
            let toBeUpdated = {judge: false, idxs: []}

            for(let i=0; i<keys.length; i++){
                if(unitObj[keys[i]] !== objFromMongoDB[keys[i]] ){
                    toBeUpdated["judge"] = true
                    toBeUpdated["idxs"].push(i)
                }else{
                    // two objects are completely the same, do nothing
                }
            }
       
            if(toBeUpdated.judge) {
                await Cifer.findOneAndUpdate({chinaRegNo: chinaRegNo}, unitObj)
                // await Cifer.deleteOne({chinaRegNo: chinaRegNo})
                unitObj["changedIdxs"] = toBeUpdated.idxs
                objToBeUpdated.push(unitObj)
            }

        }else{
            objToBeAdded.push(unitObj)
        }
    }

    // Detect deleted doccs
    let MongoDBdocsArr = await Cifer.find({}, {_id:0, __v:0})
    if(MongoDBdocsArr.length > 0){
        for(let dbDoc of MongoDBdocsArr){
            let notDeleted = false
     
            obj.forEach(ele => {
                if(ele.chinaRegNo === dbDoc.chinaRegNo){
                    notDeleted = true
                }
            })
    
            if(!notDeleted) {
                objDeleted.push(dbDoc)
                await Cifer.findOneAndDelete({chinaRegNo: dbDoc.chinaRegNo})
            }
        }
    }

    
    return [objToBeAdded, objToBeUpdated, objDeleted]
}


function getDate(){
    const today = new Date();
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const date = today.getDate()

    return `${year}-${month}-${date}`
}



module.exports = {
    coordinateObj,
    validateDocument,
    getDate
}