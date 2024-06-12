const express = require("express");
const BoxSDK = require("box-node-sdk")
require("dotenv").config()

const sdk = new BoxSDK({
    clientID: process.env.ST_ID,
    clientSecret: process.env.ST_SECRET
})

const router = express.Router()
const client = sdk.getBasicClient(process.env.ST_ACCESS)

client.folders.getItems("0", null, (err, data) => {
    if (err) {
        console.error("[Error]: Faild to get rootfolder items: ", err)
        return;
    }
    console.log("Folder items: ", data.entries);
})

module.exports = router