const express = require("express")
const SHA256 = require("crypto-js/sha256")
const { createClient } = require("@supabase/supabase-js") 

const router = express.Router()

const supabaseURL = "https://vpphyjfdeemfzziyoqoh.supabase.co/"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwcGh5amZkZWVtZnp6aXlvcW9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY5ODY3NDAsImV4cCI6MjAzMjU2Mjc0MH0.Iyptdm7MDR2-aUBuW-rZb74nB1Lmh1IChI48m2BqAmI" 
const supabase = createClient(supabaseURL, supabaseKey)

router.get("/api/login", (req, res) => {
    if (req.session.auth === "auth") {
        res.redirect("/")
    }
})

router.post("/api/login", async (req, res) => {
    if(req.session.auth !== "aut") {
        const username = JSON.stringify(SHA256(req.body.username).words)
        const email = JSON.stringify(SHA256(req.body.email).words)
        const password = JSON.stringify(SHA256(req.body.password).words)
        
        console.log("Uname" + username, "Email" + email, "PW" + password)
        
        if (!username || !email || !password) {
            return res.status(400).send('Missing required fields');
          }
        
        try {
            const { error } = await supabase
              .from("user_data")
              .insert([{ username, email, password }]);
            
            if (error) {
                throw error;
            }

            res.status(200).send("Data inserted correctly");

        } catch (error) {
            res.status(500).send(`Error inserting data: ${error.message}`)
        }

    } else {
        res.redirect("/login")
    }
})

router.post

module.exports = router