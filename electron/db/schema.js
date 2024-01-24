const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Schema for Russia
const ciferSchema = new Schema({
   orderNum: {
    type: Number,
    required: true
   },
   country: {
    type: String,
    required: true
   },
   category: {
    type: String,
    required: true
   },
   chinaRegNo: {
    type: String,
    required: true
   },
   overseasRegNo: {
    type: String,
    required: true
   },
   name: {
    type: String,
    required: true
   },
   address: {
    type: String,
    required: true
   },
   regDate: {
    type: String,
    required: true
   },
   regExpiryDate: {
    type: String,
    required: true
   },
   status: {
    type: String,
    required: true
   }
})

// Schema for Korea
const ciferKorSchema = new Schema({ 
   orderNum: {
    type: Number,
    required: true
   },
   country: {
    type: String,
    required: true
   },
   category: {
    type: String,
    required: true
   },
   chinaRegNo: {
    type: String,
    required: true
   },
   overseasRegNo: {
    type: String,
    required: true
   },
   name: {
    type: String,
    required: true
   },
   address: {
    type: String,
    required: true
   },
   regDate: {
    type: String,
    required: true
   },
   regExpiryDate: {
    type: String,
    required: true
   },
   status: {
    type: String,
    required: true
   }
})

const Cifer = mongoose.model('Cifer', ciferSchema)
const CiferKor = mongoose.model('CiferKor', ciferKorSchema)



module.exports = {Cifer, CiferKor}