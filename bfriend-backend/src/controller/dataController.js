const express = require("express");
const BoxSDK = require("box-node-sdk")
const {Client} = require('pg');
require("dotenv").config()

const sdk = new BoxSDK({
    clientID: process.env.ST_ID,
    clientSecret: process.env.ST_SECRET
})

const router = express.Router()
const st_client = sdk.getBasicClient(process.env.ST_ACCESS)
const db_client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false,
    }
});

db_client.connect(err => {
    if (err) {
        console.error('Connection error', err.stack);
    } else {
        console.log('Connected to the database (data)');
    }
});
/*st_client.folders.getItems("0", null, (err, data) => {
    if (err) {
        console.error("[Error]: Faild to get rootfolder items: ", err)
        return;
    }
    console.log("Folder items: ", data.entries);
})*/
router.post("/api/message", async (req, res) => {
    const username = JSON.stringify(req.body.username)
    const message = JSON.stringify(req.body.message)
    console.log(username, message)
    const query  = "SELECT username FROM user_data WHERE username = $1" 
    const values = [username];

    try {
        console.log(1)
        const result = await db_client.query(query, values)
        console.log(2)
        if (result.rows.length === 0) {
            console.log(3)
            return res.status(404).send("[Error]: User hasn't been found in database.")
        } else {
            console.log(4)
            const folderId = 269541639879;
            const fileName = `chat-${username}.log`

            st_client.folders.getItems(folderId, null, (err, data) => {
                if(err) {
                    console.error("[Error]: Couldn't get folder items: ", err);
                    return;
                }

                const fileExists = data.entries.some(entry => entry.name === fileName && entry.type === "file");
                if (fileExists) {
                    console.log("It exists")
                } else {
                    console.log("It doesn't.")
                }
            })
        }
    } catch(error) {
        res.status(500).send("[Error]: Couldn't retrieve data: ", error.message)
    }
})

router.get("/api/info/:username", (req, res) => {
    username = req.params.username 
})

module.exports = router