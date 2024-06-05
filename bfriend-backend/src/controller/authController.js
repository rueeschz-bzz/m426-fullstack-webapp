const express = require("express")
const SHA256 = require("crypto-js/sha256")
const { Client } = require("pg");


const router = express.Router()

const client = new Client({
    user: 'postgres.vpphyjfdeemfzziyoqoh',
    host: 'aws-0-eu-central-1.pooler.supabase.com',
    database: 'postgres',
    password: '*mx5i-psSERVnZ)',
    port: 5432,
    ssl: {
        rejectUnauthorized: false,
    }
});


client.connect(err => {
    if (err) {
        console.error('Connection error', err.stack);
    } else {
        console.log('Connected to the database');
    }
});

  

router.get("/api/login", (req, res) => {
    if (req.session.auth === "auth") {
        res.redirect("/")
    } else {
        res.send("Nothing here")
    }
})

router.post("/api/login", async (req, res) => {
    if(req.session.auth !== "aut") {
        const username = JSON.stringify(req.body.username)
        const email = JSON.stringify(req.body.email)
        const password = JSON.stringify(SHA256(req.body.password).words)
        
        console.log("Uname" + username, "Email" + email, "PW" + password)
        
        if (!username || !email || !password) {
            return res.status(400).send('Missing required fields');
          }
        
        const query = "INSERT INTO user_data (username, email, password) VALUES ($1, $2, $3)";
        const values = [username, email, password]

        try {
            await client.query(query, values);
            res.status(200).send("Data inserted successfully!");
        } catch (error) {
            res.status(500).send(`Error inserting data: ${error.message}`)
        }

    } else {
        res.redirect("/login")
    }
})

router.post

module.exports = router