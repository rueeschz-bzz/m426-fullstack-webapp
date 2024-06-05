const express = require("express");
const router = express.Router();
const { Client } = require('pg');
const {response} = require("express");

router.get("/api/users", async (req, res) => {
  const client = new Client({
    user: 'postgres.vpphyjfdeemfzziyoqoh',
    host: 'aws-0-eu-central-1.pooler.supabase.com',
    database: 'postgres',
    password: '*mx5i-psSERVnZ)',
    port: 5432,
  });

  client.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

  client.query('SELECT * FROM user_data;', (error, response) => {
    console.log(error, response)
    client.end()
    res.json(response.rows).send()
  })
});


module.exports = router;
